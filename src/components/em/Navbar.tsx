import { Link, useRouterState } from "@tanstack/react-router";
import { LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/em-i18n";
import type { Lang } from "@/lib/em-data";
import logo from "@/assets/elite-mercato-logo.png";

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const { location } = useRouterState();
  const [open, setOpen] = useState(false);

  const items = [
    { to: "/", label: t.navHome },
    { to: "/dashboard", label: t.navDashboard },
    { to: "/marketplace", label: t.navMarket },
    { to: "/pricing", label: t.navPricing },
    { to: "/signup", label: t.navJoin },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={logo} alt="Elite Mercato" className="h-10 w-10 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-base text-primary">{t.brand}</span>
            <span className="text-[10px] tracking-widest text-gold font-semibold">BECOME A PRO</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {items.map(n => {
            const active = location.pathname === n.to;
            return (
              <Link key={n.to} to={n.to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}>
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-white/5 border border-border rounded-lg p-0.5">
            {(["AR", "FR", "EN"] as const).map(l => {
              const v = l.toLowerCase() as Lang;
              const active = lang === v;
              return (
                <button key={l} onClick={() => setLang(v)}
                  className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {l}
                </button>
              );
            })}
          </div>
          <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border border-gold/40 text-gold hover:bg-gold/10 transition-all">
            <LogIn size={14} /> {t.login}
          </button>
          <button className="md:hidden p-2 rounded-lg hover:bg-white/5" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 px-4 py-3 space-y-1">
          {items.map(n => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-white/5">
              {n.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            {(["AR", "FR", "EN"] as const).map(l => {
              const v = l.toLowerCase() as Lang;
              return (
                <button key={l} onClick={() => setLang(v)}
                  className={`flex-1 px-2 py-1.5 rounded-md text-xs font-bold ${lang === v ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                  {l}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
