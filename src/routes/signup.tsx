import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Briefcase, Building2, GraduationCap, Stethoscope, User } from "lucide-react";
import { useLang } from "@/lib/em-i18n";
import { redirectForRole, setAuthed, setRole as persistRole, type Role } from "@/lib/em-auth";
import logo from "@/assets/elite-mercato-logo.png";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Join Us — Elite Mercato" },
      { name: "description", content: "Create your Elite Mercato account: player, club, coach, or technician." },
    ],
  }),
  component: Signup,
});



function Signup() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [submitted, setSubmitted] = useState(false);

  const roles: { id: Role; label: string; desc: string; Icon: typeof User; color: string }[] = [
    { id: "player", label: t.roleLaeb, desc: t.roleLaebDesc, Icon: User, color: "from-primary/30 to-primary/10 text-primary" },
    { id: "club", label: t.roleNadi, desc: t.roleNadiDesc, Icon: Building2, color: "from-gold/30 to-gold/10 text-gold" },
    { id: "coach", label: t.roleModarib, desc: t.roleModaribDesc, Icon: GraduationCap, color: "from-accent/30 to-accent/10 text-accent" },
    { id: "technician", label: t.roleTaqani, desc: t.roleTaqaniDesc, Icon: Stethoscope, color: "from-primary/30 to-primary/10 text-primary" },
  ];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    persistRole(role);
    setAuthed(true);
    setSubmitted(true);
    setTimeout(() => redirectForRole(role, navigate), 900);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft size={14} className={lang === "ar" ? "rotate-180" : ""} /> {t.backHome}
        </Link>

        <div className="text-center mb-10">
          <img src={logo} alt="Elite Mercato" className="h-16 w-16 object-contain mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{t.joinTitle}</h1>
          <p className="text-muted-foreground">{t.joinSub}</p>
        </div>

        {!role ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {roles.map(({ id, label, desc, Icon, color }) => (
              <button key={id} onClick={() => setRole(id)}
                className="group text-left rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-[var(--shadow-elite)] transition-all">
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={26} />
                </div>
                <h3 className="font-bold text-xl mb-1">{label}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </button>
            ))}
          </div>
        ) : submitted ? (
          <div className="rounded-2xl border border-primary/40 bg-primary/10 p-8 text-center">
            <div className="text-primary font-bold text-lg">✓ {t.createAccount}</div>
            <p className="text-sm text-muted-foreground mt-2">{t.fullName}: {form.name}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold">
                <Briefcase size={12} /> {roles.find(r => r.id === role)?.label}
              </div>
              <button type="button" onClick={() => setRole(null)} className="text-xs text-muted-foreground hover:text-foreground">
                ← {t.selectRole}
              </button>
            </div>

            <Field label={t.fullName} value={form.name} onChange={v => setForm({ ...form, name: v })} required />
            <Field label={t.email} type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} required />
            <Field label={t.phone} type="tel" value={form.phone} onChange={v => setForm({ ...form, phone: v })} />
            <Field label={t.password} type="password" value={form.password} onChange={v => setForm({ ...form, password: v })} required />
            <Field label={t.confirmPwd} type="password" value={form.confirm} onChange={v => setForm({ ...form, confirm: v })} required />

            <button type="submit"
              className="w-full px-6 py-3 rounded-xl font-bold text-primary-foreground bg-gradient-to-r from-primary to-accent hover:scale-[1.02] transition-transform shadow-[var(--shadow-elite)]">
              {t.createAccount}
            </button>

            <p className="text-center text-sm text-muted-foreground">
              {t.haveAccount}{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">{t.signin}</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1.5">{label}{required && <span className="text-destructive"> *</span>}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} required={required}
        className="w-full h-11 px-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
    </label>
  );
}
