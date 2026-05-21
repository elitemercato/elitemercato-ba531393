import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse, Video, Scale, Dumbbell, ShieldCheck } from "lucide-react";
import { RequireAuth } from "@/components/em/RequireAuth";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "متجر Elite Mercato" },
      { name: "description", content: "متجر الخدمات الرياضية الاحترافية: طبية، إعلامية، قانونية، وكفاءات." },
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
  color: string;
  ring: string;
};

const SERVICES: Service[] = [
  {
    category: "Elite Clinic · الخدمات الطبية",
    title: "فحص طبي شامل للانتدابات",
    desc: "تقييم بدني وقلبي متكامل قبل توقيع العقد، يشمل تحاليل وتقرير طبي معتمد.",
    price: 15000,
    icon: HeartPulse,
    color: "from-rose-500 to-rose-600",
    ring: "ring-rose-200",
  },
  {
    category: "Elite Media · الخدمات الإعلامية",
    title: "مونتاج فيديو احترافي لأبرز اللقطات",
    desc: "مونتاج Highlight Reel بجودة HD، تصحيح ألوان، وعنونة احترافية للاعب.",
    price: 8000,
    icon: Video,
    color: "from-[#00BCD4] to-cyan-600",
    ring: "ring-cyan-200",
  },
  {
    category: "Elite Legal · الاستشارات القانونية",
    title: "مراجعة وتوثيق عقود اللاعبين",
    desc: "تدقيق بنود العقد من طرف محامٍ مختص في القانون الرياضي وتوثيقه رسمياً.",
    price: 12000,
    icon: Scale,
    color: "from-[#1E3A8A] to-indigo-700",
    ring: "ring-indigo-200",
  },
  {
    category: "Elite Staff · الكفاءات الرياضية",
    title: "جلسات تدريب لياقة فردية مكثفة",
    desc: "برنامج لياقة شخصي مع مدرب معتمد، جلسة فردية مكثفة لرفع المردود البدني.",
    price: 3000,
    icon: Dumbbell,
    color: "from-[#4ADE80] to-green-600",
    ring: "ring-green-200",
  },
];

function Marketplace() {
  return (
    <div dir="rtl" className="font-tajawal min-h-screen bg-[#F3F4F6] text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <header>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A]">متجر Elite Mercato</h1>
          <p className="text-sm text-slate-500 mt-1">خدمات احترافية موثوقة لتطوير مسار الرياضي</p>
        </header>

        <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-5">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ s }: { s: Service }) {
  const Icon = s.icon;
  return (
    <article
      className={`group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-4 ${s.ring}`}
    >
      <div className={`bg-gradient-to-l ${s.color} p-5 flex items-center justify-between text-white`}>
        <span className="text-[11px] font-bold uppercase tracking-wider opacity-95">{s.category}</span>
        <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition">
          <Icon size={22} />
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-extrabold text-lg leading-snug">{s.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>

        <div className="flex items-end justify-between pt-3 border-t border-slate-100">
          <div>
            <div className="text-2xl font-extrabold text-[#1E3A8A]">
              {s.price.toLocaleString("fr-DZ")} <span className="text-sm">دج</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
              <ShieldCheck size={12} className="text-[#4ADE80]" /> شامل عمولة المنصة
            </div>
          </div>
          <button className="px-4 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-[#0F2766] text-white text-sm font-extrabold transition shadow-md hover:shadow-lg">
            طلب الخدمة الآن
          </button>
        </div>
      </div>
    </article>
  );
}
