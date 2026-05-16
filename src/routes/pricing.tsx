import { createFileRoute } from "@tanstack/react-router";
import { Check, Crown, Shield, Star } from "lucide-react";
import { formatDZD, PLANS, type Plan } from "@/lib/em-data";
import { useLang } from "@/lib/em-i18n";

const ICONS = { bronze: Shield, silver: Star, gold: Crown };

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Elite Mercato Club Plans" },
      { name: "description", content: "Bronze, Silver and Elite Gold subscription plans for Algerian professional clubs." },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  const { t, lang } = useLang();
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold">{t.pricingTitle}</h1>
        <p className="text-muted-foreground mt-2">{t.pricingSubtext}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {PLANS.map(plan => <PlanCard key={plan.key} plan={plan} />)}
      </div>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const { t, lang } = useLang();
  const Icon = ICONS[plan.key];
  const name = lang === "ar" ? plan.name : lang === "fr" ? plan.nameFr : plan.nameEn;
  const features = plan.features[lang];

  return (
    <div className={`relative rounded-3xl border bg-card p-7 flex flex-col ${plan.featured ? "border-gold/50 shadow-[var(--shadow-gold)] md:scale-[1.03]" : "border-border"}`}>
      {plan.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-gold to-amber-500 text-gold-foreground text-[11px] font-bold uppercase tracking-wider">
          {t.mostPop}
        </div>
      )}

      <div className="flex items-center gap-3 mb-5">
        <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: `${plan.color}22`, color: plan.color }}>
          <Icon size={22} />
        </div>
        <div>
          <div className="text-xl font-extrabold">{name}</div>
          <div className="text-[11px] uppercase tracking-widest" style={{ color: plan.color }}>{plan.key}</div>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold">{formatDZD(plan.price)}</span>
          <span className="text-sm text-muted-foreground">{t.dzd}{t.perMonth}</span>
        </div>
      </div>

      <ul className="space-y-2.5 mb-7 flex-1">
        {features.map(f => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check size={16} className={`mt-0.5 shrink-0 ${plan.featured ? "text-gold" : "text-primary"}`} />
            <span className="text-muted-foreground">{f}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-3 rounded-xl font-bold transition-all hover:opacity-90 ${plan.featured
        ? "bg-gradient-to-r from-gold to-amber-500 text-gold-foreground shadow-[var(--shadow-gold)]"
        : "bg-gradient-to-r from-primary to-accent text-primary-foreground"}`}>
        {t.subscribe}
      </button>
    </div>
  );
}
