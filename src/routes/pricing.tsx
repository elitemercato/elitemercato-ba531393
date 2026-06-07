import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Building2, User, Sparkles } from "lucide-react";
import { CheckoutModal, type CheckoutItem } from "@/components/em/CheckoutModal";


export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "باقات الاشتراك — Elite Mercato" },
      { name: "description", content: "باقات اشتراك Elite Mercato للأندية والرياضيين في الجزائر." },
    ],
  }),
  component: Pricing,
});

type Plan = {
  id: "club" | "athlete";
  title: string;
  subtitle: string;
  price: string;
  priceNumber: number;

  period: string;
  features: string[];
  cta: string;
  icon: React.ElementType;
  featured: boolean;
};

const PLANS: Plan[] = [
  {
    id: "club",
    title: "باقة الأندية الرياضية",
    subtitle: "B2B · للأندية والمؤسسات الرياضية",
    price: "149,000",
    priceNumber: 149000,

    period: "دج / سنوياً",
    features: [
      "وصول كامل لمحرك الكشافة الرقمي",
      "إدارة انتدابات الفريق بصورة احترافية",
      "طلب خدمات المتجر بمركزية",
      "لوحة تحكم متقدمة لإدارة اللاعبين",
      "دعم فني مخصص على مدار الساعة",
    ],
    cta: "تفعيل حساب النادي",
    icon: Building2,
    featured: true,
  },
  {
    id: "athlete",
    title: "باقة الرياضيين واللاعبين",
    subtitle: "B2C · للاعبين المحترفين والهواة",
    price: "9,900",
    priceNumber: 9900,

    period: "دج / سنوياً",
    features: [
      "إنشاء حقيبة رياضية احترافية",
      "رفع الفيديوهات والإحصائيات",
      "ظهور مباشر لمسيري الأندية",
      "تقارير أداء شهرية",
      "تواصل مباشر مع الكفاءات الفنية",
    ],
    cta: "اشترك كلاعب الآن",
    icon: User,
    featured: false,
  },
];

function Pricing() {
  const [checkout, setCheckout] = useState<CheckoutItem | null>(null);

  return (
    <div dir="rtl" className="font-tajawal min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <header className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 text-gold text-xs font-bold mb-4 border border-gold/30">
            <Sparkles size={14} /> باقات الاشتراك
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary leading-tight">
            اختر الباقة المناسبة لمسارك الرياضي
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            باقات مصممة خصيصاً للأندية الجزائرية والرياضيين المحترفين، بأسعار تنافسية وميزات احترافية.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSubscribe={() =>
                setCheckout({ title: plan.title, subtitle: plan.subtitle, price: plan.priceNumber })
              }
            />
          ))}
        </div>
      </div>

      <CheckoutModal
        open={!!checkout}
        item={checkout}
        onClose={() => setCheckout(null)}
        notifyEventType="plan_subscription"
        successDescription={checkout ? `تم تفعيل: ${checkout.title}` : undefined}
      />
    </div>
  );
}


function PlanCard({ plan, onSubscribe }: { plan: Plan; onSubscribe: () => void }) {
  const Icon = plan.icon;
  const isFeatured = plan.featured;

  return (
    <article
      className={`relative text-right rounded-3xl p-7 sm:p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 ${
        isFeatured
          ? "text-primary-foreground ring-2 ring-gold"
          : "bg-card text-foreground border border-border hover:border-gold/40"
      }`}
      style={
        isFeatured
          ? { background: "var(--gradient-primary)", boxShadow: "var(--shadow-elite)" }
          : undefined
      }
    >
      {isFeatured && (
        <div className="absolute -top-3 right-6 px-3 py-1 rounded-full text-gold-foreground text-[11px] font-extrabold uppercase tracking-wider shadow-lg"
          style={{ background: "var(--gradient-gold)" }}>
          الأكثر طلباً
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div
          className={`h-14 w-14 rounded-2xl flex items-center justify-center ${
            isFeatured ? "bg-gold/20 text-gold" : "bg-primary/15 text-primary"
          }`}
        >
          <Icon size={26} />
        </div>
        <div className="text-right">
          <div className={`text-[11px] font-bold uppercase tracking-wider ${isFeatured ? "text-gold" : "text-muted-foreground"}`}>
            {plan.subtitle}
          </div>
        </div>
      </div>

      <h3 className={`text-2xl font-extrabold mb-2 ${isFeatured ? "text-primary-foreground" : "text-primary"}`}>
        {plan.title}
      </h3>

      <div className="mb-6 pb-6 border-b border-dashed border-current/20">
        <div className="flex items-baseline gap-2 flex-row-reverse justify-end">
          <span className={`text-4xl sm:text-5xl font-extrabold ${isFeatured ? "text-gold" : "text-gold"}`}>{plan.price}</span>
          <span className={`text-sm ${isFeatured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.period}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 flex-row-reverse text-right">
            <span
              className={`mt-0.5 shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                isFeatured ? "bg-gold text-gold-foreground" : "bg-primary/15 text-primary"
              }`}
            >
              <Check size={12} strokeWidth={3} />
            </span>
            <span className={`text-sm leading-relaxed ${isFeatured ? "text-primary-foreground/90" : "text-foreground/80"}`}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSubscribe}
        className={`w-full py-3.5 rounded-xl font-extrabold transition-all text-sm sm:text-base hover:brightness-110 ${
          isFeatured ? "text-gold-foreground" : "text-primary-foreground"
        }`}
        style={
          isFeatured
            ? { background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }
            : { background: "var(--gradient-primary)", boxShadow: "var(--shadow-elite)" }
        }
      >
        {plan.cta}
      </button>
    </article>
  );
}
