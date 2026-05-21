import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, LogIn } from "lucide-react";
import { useLang } from "@/lib/em-i18n";
import { getRole, redirectForRole, setRemember, type Role } from "@/lib/em-auth";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/elite-mercato-logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Elite Mercato" },
      { name: "description", content: "Sign in to your Elite Mercato account." },
    ],
  }),
  component: Login,
});

function Login() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRememberState] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        const role = getRole() ?? "player";
        redirectForRole(role, navigate);
      }
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      setRemember(remember);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) throw error;
      // Determine role from user_roles
      let role: Role = (getRole() ?? "player") as Role;
      if (data.user) {
        const { data: roleRow } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .maybeSingle();
        const r = roleRow?.role as string | undefined;
        if (r === "player" || r === "club" || r === "coach" || r === "technician") role = r;
      }
      localStorage.setItem("em-role", role);
      redirectForRole(role, navigate);
    } catch (e: any) {
      setErr(e?.message ?? (lang === "ar" ? "فشل تسجيل الدخول" : "Sign-in failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-12 px-4 flex items-center">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl -z-10" />

      <div className="w-full max-w-md mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft size={14} className={lang === "ar" ? "rotate-180" : ""} /> {t.backHome}
        </Link>

        <div className="text-center mb-8">
          <img src={logo} alt="Elite Mercato" className="h-14 w-14 object-contain mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold mb-1">{t.signinTitle}</h1>
          <p className="text-sm text-muted-foreground">{t.signinSub}</p>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card/80 backdrop-blur p-6 md:p-8 space-y-4">
          {err && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {err}
            </div>
          )}

          <label className="block">
            <span className="block text-sm font-medium mb-1.5">{t.email}</span>
            <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1.5">{t.password}</span>
            <input type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
          </label>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRememberState(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <span>{t.rememberMe}</span>
            </label>
            <Link to="/forgot-password" className="text-xs text-gold hover:underline">{t.forgotPwd}</Link>
          </div>

          <button type="submit" disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-primary-foreground bg-gradient-to-r from-primary to-accent hover:scale-[1.02] transition-transform shadow-[var(--shadow-elite)] disabled:opacity-60 disabled:cursor-not-allowed">
            <LogIn size={16} /> {loading ? "…" : t.signin}
          </button>

          <p className="text-center text-sm text-muted-foreground pt-2">
            {t.noAccount}{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">{t.navJoin}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
