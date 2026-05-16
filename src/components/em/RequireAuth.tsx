import { useEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { isAuthed } from "@/lib/em-auth";
import { useLang } from "@/lib/em-i18n";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const { t } = useLang();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (isAuthed()) {
      setOk(true);
    } else {
      navigate({ to: "/login", search: { redirect: location.pathname } as never });
    }
  }, [navigate, location.pathname]);

  if (!ok) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-muted-foreground">
        {t.signinSub ?? "..."}
      </div>
    );
  }
  return <>{children}</>;
}
