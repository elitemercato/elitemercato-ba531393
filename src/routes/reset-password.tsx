import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KeyRound, ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/em-i18n";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/elite-mercato-logo.png";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Elite Mercato" },
      { name: "description", content: "Set a new password for your Elite Mercato account." },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [ready, setReady] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Supabase places a recovery session on URL hash; the client picks it up automatically.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (pwd.length < 6) {
      setErr(lang === "ar" ? "كلمة المرور قصيرة جداً (6 أحرف على الأقل)" : "Password too short (min 6 chars)");
      return;
    }
    if (pwd !== confirm) {
      setErr(lang === "ar" ? "كلمتا المرور غير متطابقتين" : "Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: pwd });
      if (error) throw error;
      setDone(true);
      setTimeout(() => navigate({ to: "/login" }), 1500);
    } catch (e: any) {
      setErr(e?.message ?? "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-12 px-4 flex items-center">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="w-full max-w-md mx-auto">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft size={14} className={lang === "ar" ? "rotate-180" : ""} /> {t.signinTitle}
        </Link>

        <div className="text-center mb-8">
          <img src={logo} alt="Elite Mercato" className="h-14 w-14 object-contain mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold mb-1">{t.resetTitle}</h1>
          <p className="text-sm text-muted-foreground">{t.resetSub}</p>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card/80 backdrop-blur p-6 md:p-8 space-y-4">
          {!ready && (
            <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
              {lang === "ar" ? "جاري التحقق من رابط الاستعادة..." : "Validating recovery link..."}
            </div>
          )}
          {err && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</div>
          )}
          {done && (
            <div className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary">
              {t.passwordUpdated}
            </div>
          )}
          <label className="block">
            <span className="block text-sm font-medium mb-1.5">{t.newPassword}</span>
            <input type="password" required value={pwd} onChange={e => setPwd(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1.5">{t.confirmPwd}</span>
            <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
          </label>
          <button type="submit" disabled={loading || !ready || done}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-primary-foreground bg-gradient-to-r from-primary to-accent hover:scale-[1.02] transition-transform shadow-[var(--shadow-elite)] disabled:opacity-60 disabled:cursor-not-allowed">
            <KeyRound size={16} /> {loading ? "…" : t.updatePassword}
          </button>
        </form>
      </div>
    </div>
  );
}
