import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Crown, Globe, Search, Shield, Sparkles, TrendingUp, UserCheck, Users } from "lucide-react";
import { useLang } from "@/lib/em-i18n";
import logo from "@/assets/elite-mercato-logo.png";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { t, lang } = useLang();
  const stats = [
    { val: "500+", label: t.stat1, Icon: Users },
    { val: "15", label: t.stat2, Icon: Building2 },
    { val: "1,200+", label: t.stat3, Icon: TrendingUp },
    { val: "80+", label: t.stat4, Icon: UserCheck },
  ];
  const features = [
    { Icon: Search, title: t.feat1Title, desc: t.feat1Desc },
    { Icon: Shield, title: t.feat2Title, desc: t.feat2Desc },
    { Icon: Globe, title: t.feat3Title, desc: t.feat3Desc },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover -z-20"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-background/25" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 -z-10 bg-gradient-to-t from-background/70 to-transparent" />
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl -z-10" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-semibold mb-8">
            <Sparkles size={14} /> {t.heroBadge}
          </div>

          <img src={logo} alt="Elite Mercato" className="h-28 w-28 object-contain mx-auto mb-6 drop-shadow-[0_0_30px_rgba(0,132,61,0.4)]" />

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            <span className="bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-transparent">
              {t.tagline}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
            {t.subtagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/dashboard"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-primary-foreground bg-gradient-to-r from-primary to-accent hover:scale-[1.03] transition-transform shadow-[var(--shadow-elite)]">
              {t.heroBtn} <ArrowRight size={18} className={lang === "ar" ? "rotate-180" : ""} />
            </Link>
            <Link to="/pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold border border-gold/40 text-gold bg-gold/5 hover:bg-gold/10 transition-all">
              <Crown size={18} /> {t.heroBtn2}
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 rounded-2xl border border-border bg-card/80 backdrop-blur p-2">
          {stats.map(({ val, label, Icon }) => (
            <div key={label} className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition">
              <div className="h-11 w-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-2xl font-extrabold">{val}</div>
                <div className="text-xs text-muted-foreground truncate">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-5">
          {features.map(({ Icon, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-[var(--shadow-elite)] transition-all">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon size={22} />
              </div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
