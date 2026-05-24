import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HeartPulse, Video, Scale, LineChart, ShieldCheck, Sparkles, Crown } from "lucide-react";
import { RequireAuth } from "@/components/em/RequireAuth";
import { CheckoutModal, type CheckoutItem } from "@/components/em/CheckoutModal";


export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "متجر Elite Mercato" },
      { name: "description", content: "متجر الخدمات الرياضية الاحترافية: طبية، إعلامية، قانونية، وتقنية." },
    ],
  }),
  component: () => <RequireAuth><Marketplace /></RequireAuth>,
});

type Service = {
  category: string;
  title: string;
  desc: string;
  price: number;
  icon: React.ElementType;
};

const SERVICES: Service[] = [
  {
    category: "Elite Clinic · الخدمات الطبية",
    title: "فحص طبي رياضي شامل",
    desc: "تقييم طبي دقيق للإصابات وتأهيل اللاعبين قبل الانتداب.",
    price: 15000,
    icon: HeartPulse,
  },
  {
    category: "Elite Media · الخدمات الإعلامية",
    title: 'مونتاج فيديو "أبرز اللقطات"',
    desc: "تصميم فيديو احترافي يستعرض أفضل مهاراتك لتسويق ملفك الرياضي.",
    price: 8000,
    icon: Video,
  },
  {
    category: "Elite Legal · الاستشارات القانونية",
    title: "مراجعة وتوثيق العقود الرياضية",
    desc: "حماية حقوقك عبر استشارة محامين مختصين في النزاعات الكروية ولوائح الفيفا.",
    price: 12000,
    icon: Scale,
  },
  {
    category: "Elite Technical · الخدمات الفنية والتقنية",
    title: "تحليل فني وإحصائي للأداء",
    desc: "تقرير فني شامل حول مردود اللاعب باستخدام تقنيات التحليل الحديثة.",
    price: 5000,
    icon: LineChart,
  },
];

function Marketplace() {
  const [checkout, setCheckout] = useState<CheckoutItem | null>(null);

  return (
    <div dir="rtl" className="font-tajawal min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        <header className="text-right">
          <div className="flex flex-wrap items-center gap-2 mb-3 justify-end">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-bold border border-primary/30">
              <Crown size={14} /> باقة الأندية مفعّلة · 149,000 دج / سنوياً
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 text-gold text-xs font-bold border border-gold/30">
              <Sparkles size={14} /> متجر Elite Mercato
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">
            خدمات احترافية لتطوير مسارك الرياضي
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl">
            اختر من بين أفضل الخدمات الطبية، الإعلامية، القانونية، والتقنية المقدمة من كفاءات معتمدة.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.title}
              s={s}
              index={i}
              onBook={() => setCheckout({ title: s.title, subtitle: s.category, price: s.price })}
            />
          ))}
        </div>
      </div>

      <CheckoutModal
        open={!!checkout}
        item={checkout}
        onClose={() => setCheckout(null)}
        successDescription={checkout ? `سيتم التواصل معك قريباً بخصوص: ${checkout.title}` : undefined}
      />
    </div>
  );
}

function ServiceCard({ s, index, onBook }: { s: Service; index: number; onBook: () => void }) {

  const Icon = s.icon;
  return (
    <article
      className="group bg-card rounded-2xl border border-border shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-gold/50 flex flex-col animate-fade-in"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
    >
      <div
        className="p-5 flex items-center justify-between text-primary-foreground"
        style={{ background: "var(--gradient-primary)" }}
      >
        <span className="text-[11px] font-bold uppercase tracking-wider opacity-95 text-right">
          {s.category}
        </span>
        <div className="h-12 w-12 rounded-xl bg-gold/20 backdrop-blur flex items-center justify-center text-gold group-hover:scale-110 group-hover:rotate-3 transition-transform">
          <Icon size={22} />
        </div>
      </div>

      <div className="p-5 space-y-3 flex-1 flex flex-col text-right">
        <div className="inline-flex self-end items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-[10px] font-bold border border-primary/30">
          <ShieldCheck size={11} /> شامل عمولة المنصة
        </div>

        <h3 className="font-extrabold text-lg leading-snug text-foreground">{s.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>

        <div className="pt-4 border-t border-border space-y-3">
          <div className="text-right">
            <div className="text-2xl font-extrabold text-gold">
              {s.price.toLocaleString("fr-DZ")} <span className="text-sm font-bold">دج</span>
            </div>
          </div>
          <button
            onClick={onBook}
            className="w-full px-4 py-2.5 rounded-xl text-primary-foreground text-sm font-extrabold transition-all hover:brightness-110 active:scale-95"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elite)" }}
          >
            طلب الخدمة
          </button>

        </div>
      </div>
    </article>
  );
}
