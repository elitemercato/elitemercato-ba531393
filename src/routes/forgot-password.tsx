import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { useLang } from "@/lib/em-i18n";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/elite-mercato-logo.png";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot Password — Elite Mercato" },
      { name: "description", content: "Reset your Elite Mercato account password." },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const { t, lang } = useLang();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
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
          <h1 className="text-3xl font-extrabold mb-1">{t.forgotTitle}</h1>
          <p className="text-sm text-muted-foreground">{t.forgotSub}</p>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-primary/40 bg-primary/10 p-6 text-center space-y-2">
            <Mail className="mx-auto text-primary" />
            <p className="font-bold">{t.resetEmailSent}</p>
            <p className="text-sm text-muted-foreground">{t.resetEmailSentDesc}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card/80 backdrop-blur p-6 md:p-8 space-y-4">
            {err && (
              <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {err}
              </div>
            )}
            <label className="block">
              <span className="block text-sm font-medium mb-1.5">{t.email}</span>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
            </label>
            <button type="submit" disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-primary-foreground bg-gradient-to-r from-primary to-accent hover:scale-[1.02] transition-transform shadow-[var(--shadow-elite)] disabled:opacity-60 disabled:cursor-not-allowed">
              <Mail size={16} /> {loading ? "…" : t.sendResetLink}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
