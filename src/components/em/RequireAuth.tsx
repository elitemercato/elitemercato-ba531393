import { useEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const [state, setState] = useState<"checking" | "ok" | "no">("checking");

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (data.session) setState("ok");
      else {
        setState("no");
        navigate({ to: "/login", search: { redirect: location.pathname } as never });
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!mounted) return;
      if (!session) {
        setState("no");
        navigate({ to: "/login" });
      } else {
        setState("ok");
      }
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  if (state !== "ok") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-muted-foreground">
        …
      </div>
    );
  }
  return <>{children}</>;
}
