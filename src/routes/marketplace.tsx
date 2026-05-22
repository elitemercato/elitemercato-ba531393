import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse, Video, Scale, LineChart, ShieldCheck, Sparkles } from "lucide-react";
import { RequireAuth } from "@/components/em/RequireAuth";

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
  gradient: string;
  accent: string;
};

const SERVICES: Service[] = [
  {
    category: "Elite Clinic · الخدمات الطبية",
    title: "فحص طبي رياضي شامل",
    desc: "تقييم طبي دقيق للإصابات وتأهيل اللاعبين قبل الانتداب.",
    price: 15000,
    icon: HeartPulse,
    gradient: "from-rose-500 to-rose-600",
    accent: "hover:ring-rose-300",
  },
  {
    category: "Elite Media · الخدمات الإعلامية",
    title: 'مونتاج فيديو "أبرز اللقطات"',
    desc: "تصميم فيديو احترافي يستعرض أفضل مهاراتك لتسويق ملفك الرياضي.",
    price: 8000,
    icon: Video,
    gradient: "from-[#00BCD4] to-cyan-600",
    accent: "hover:ring-cyan-300",
  },
  {
    category: "Elite Legal · الاستشارات القانونية",
    title: "مراجعة وتوثيق العقود الرياضية",
    desc: "حماية حقوقك عبر استشارة محامين مختصين في النزاعات الكروية ولوائح الفيفا.",
    price: 12000,
    icon: Scale,
    gradient: "from-[#1E3A8A] to-indigo-700",
    accent: "hover:ring-indigo-300",
  },
  {
    category: "Elite Technical · الخدمات الفنية والتقنية",
    title: "تحليل فني وإحصائي للأداء",
    desc: "تقرير فني شامل حول مردود اللاعب باستخدام تقنيات التحليل الحديثة.",
    price: 5000,
    icon: LineChart,
    gradient: "from-[#4ADE80] to-green-600",
    accent: "hover:ring-green-300",
  },
];

function Marketplace() {
  return (
    <div dir="rtl" className="font-tajawal min-h-screen bg-[#F3F4F6] text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        <header className="text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] text-xs font-bold mb-3">
            <Sparkles size={14} /> متجر Elite Mercato
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A]">
            خدمات احترافية لتطوير مسارك الرياضي
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
            اختر من بين أفضل الخدمات الطبية، الإعلامية، القانونية، والتقنية المقدمة من كفاءات معتمدة.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} s={s} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ s, index }: { s: Service; index: number }) {
  const Icon = s.icon;
  return (
    <article
      className={`group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-4 ${s.accent} flex flex-col animate-fade-in`}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
    >
      <div className={`bg-gradient-to-l ${s.gradient} p-5 flex items-center justify-between text-white`}>
        <span className="text-[11px] font-bold uppercase tracking-wider opacity-95 text-right">
          {s.category}
        </span>
        <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform">
          <Icon size={22} />
        </div>
      </div>

      <div className="p-5 space-y-3 flex-1 flex flex-col text-right">
        <div className="inline-flex self-end items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4ADE80]/15 text-[#16a34a] text-[10px] font-bold">
          <ShieldCheck size={11} /> شامل عمولة المنصة
        </div>

        <h3 className="font-extrabold text-lg leading-snug text-[#0F172A]">{s.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed flex-1">{s.desc}</p>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="text-right">
            <div className="text-2xl font-extrabold text-[#1E3A8A]">
              {s.price.toLocaleString("fr-DZ")} <span className="text-sm font-bold">دج</span>
            </div>
          </div>
          <button className="w-full px-4 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-[#0F2766] text-white text-sm font-extrabold transition-all shadow-md hover:shadow-lg active:scale-95">
            طلب الخدمة
          </button>
        </div>
      </div>
    </article>
  );
}
