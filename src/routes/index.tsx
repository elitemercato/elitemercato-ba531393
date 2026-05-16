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
        <div className="absolute inset-0 -z-10 bg-background/40 sm:bg-background/30" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 -z-10 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl -z-10" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-24 pb-16 sm:pb-24 text-center flex flex-col items-center">
          <img
            src={logo}
            alt="Elite Mercato"
            className="h-28 w-28 sm:h-44 sm:w-44 md:h-56 md:w-56 object-contain mb-5 sm:mb-8 drop-shadow-[0_0_40px_rgba(0,132,61,0.65)]"
          />

          <div className="relative inline-block font-black uppercase leading-none mb-8 sm:mb-12 md:mb-16 text-sm sm:text-lg md:text-2xl tracking-[0.25em] sm:tracking-[0.35em] [text-shadow:0_2px_4px_rgba(0,0,0,0.95),0_0_22px_rgba(0,0,0,0.85),0_0_38px_rgba(212,175,55,0.45)]">
            <span className="em-shimmer">
              Become a PRO
            </span>
            <span className="block mx-auto mt-3 h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
          </div>

          <h1 dir="rtl" className="font-extrabold tracking-tight max-w-4xl leading-[1.2] text-2xl sm:text-4xl md:text-6xl lg:text-7xl [text-shadow:0_2px_4px_rgba(0,0,0,0.95),0_4px_24px_rgba(0,0,0,0.9)]">
            <span className="bg-gradient-to-r from-[#ff8b8b] via-[#fca5a5] to-[#4ade80] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">كن محترفا.</span>{" "}
            <span className="text-white">وإستثمر في مجالك الرياضي.</span>
          </h1>

          <p dir="rtl" className="mt-5 sm:mt-8 max-w-2xl text-sm sm:text-base md:text-lg text-white leading-[2] sm:leading-loose font-medium [text-shadow:0_2px_4px_rgba(0,0,0,1),0_2px_16px_rgba(0,0,0,0.95)]">
            اكتشف فرصك، طوّر أداءك واحمِ حقوقك. أول منصة رياضية جزائرية تدمج ذكاء البيانات بالخبرة الميدانية لبناء مسار إحترافي.
          </p>
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
