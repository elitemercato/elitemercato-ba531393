import { createFileRoute } from "@tanstack/react-router";
import { Check, Building2, User, Sparkles } from "lucide-react";

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
  return (
    <div dir="rtl" className="font-tajawal min-h-screen bg-[#F3F4F6] text-[#0F172A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <header className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] text-xs font-bold mb-4">
            <Sparkles size={14} /> باقات الاشتراك
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E3A8A] leading-tight">
            اختر الباقة المناسبة لمسارك الرياضي
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            باقات مصممة خصيصاً للأندية الجزائرية والرياضيين المحترفين، بأسعار تنافسية وميزات احترافية.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const Icon = plan.icon;
  const isFeatured = plan.featured;

  return (
    <article
      className={`relative text-right rounded-3xl p-7 sm:p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 ${
        isFeatured
          ? "bg-gradient-to-br from-[#1E3A8A] to-[#0F2766] text-white shadow-2xl shadow-[#1E3A8A]/30 ring-2 ring-[#4ADE80] hover:shadow-[#1E3A8A]/50"
          : "bg-white text-[#0F172A] border border-slate-200 shadow-md hover:shadow-xl hover:ring-2 hover:ring-[#00BCD4]/40"
      }`}
    >
      {isFeatured && (
        <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#4ADE80] text-[#0F172A] text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
          الأكثر طلباً
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div
          className={`h-14 w-14 rounded-2xl flex items-center justify-center ${
            isFeatured ? "bg-[#4ADE80]/20 text-[#4ADE80]" : "bg-[#1E3A8A]/10 text-[#1E3A8A]"
          }`}
        >
          <Icon size={26} />
        </div>
        <div className="text-right">
          <div className={`text-[11px] font-bold uppercase tracking-wider ${isFeatured ? "text-[#4ADE80]" : "text-[#00BCD4]"}`}>
            {plan.subtitle}
          </div>
        </div>
      </div>

      <h3 className={`text-2xl font-extrabold mb-2 ${isFeatured ? "text-white" : "text-[#1E3A8A]"}`}>
        {plan.title}
      </h3>

      <div className="mb-6 pb-6 border-b border-dashed border-current/20">
        <div className="flex items-baseline gap-2 flex-row-reverse justify-end">
          <span className="text-4xl sm:text-5xl font-extrabold">{plan.price}</span>
          <span className={`text-sm ${isFeatured ? "text-white/70" : "text-slate-500"}`}>{plan.period}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 flex-row-reverse text-right">
            <span
              className={`mt-0.5 shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                isFeatured ? "bg-[#4ADE80] text-[#0F172A]" : "bg-[#4ADE80]/15 text-[#16a34a]"
              }`}
            >
              <Check size={12} strokeWidth={3} />
            </span>
            <span className={`text-sm leading-relaxed ${isFeatured ? "text-white/90" : "text-slate-700"}`}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3.5 rounded-xl font-extrabold transition-all text-sm sm:text-base ${
          isFeatured
            ? "bg-[#4ADE80] text-[#0F172A] hover:bg-[#22c55e] shadow-lg hover:shadow-xl"
            : "bg-[#1E3A8A] text-white hover:bg-[#0F2766] shadow-md hover:shadow-lg"
        }`}
      >
        {plan.cta}
      </button>
    </article>
  );
}
