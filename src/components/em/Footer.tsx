import { useLang } from "@/lib/em-i18n";
import logo from "@/assets/elite-mercato-logo.png";

export function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="mt-24 border-t border-border bg-background/60">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-8 w-8 object-contain" />
          <div className="leading-tight">
            <div className="font-bold text-primary">{t.brand}</div>
            <div className="text-[10px] tracking-widest text-gold">BECOME A PRO</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Elite Mercato · {lang === "ar" ? "صُنع في الجزائر" : lang === "fr" ? "Fait en Algérie" : "Made in Algeria"} 🇩🇿
        </p>
      </div>
    </footer>
  );
}
