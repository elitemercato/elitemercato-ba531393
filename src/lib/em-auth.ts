import type { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export type Role = "player" | "club" | "coach" | "technician";

const ROLE_KEY = "em-role";
const REMEMBER_KEY = "em-remember";

export const setRole = (r: Role) => {
  if (typeof window !== "undefined") localStorage.setItem(ROLE_KEY, r);
};

export const getRole = (): Role | null => {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(ROLE_KEY);
  return v === "player" || v === "club" || v === "coach" || v === "technician" ? v : null;
};

export const clearRole = () => {
  if (typeof window !== "undefined") localStorage.removeItem(ROLE_KEY);
};

export const setRemember = (v: boolean) => {
  if (typeof window === "undefined") return;
  if (v) localStorage.setItem(REMEMBER_KEY, "1");
  else localStorage.setItem(REMEMBER_KEY, "0");
};

export const getRemember = (): boolean => {
  if (typeof window === "undefined") return true;
  // default to true if never set
  return localStorage.getItem(REMEMBER_KEY) !== "0";
};

export const signOut = async () => {
  try {
    await supabase.auth.signOut();
  } catch {
    /* noop */
  }
  if (typeof window !== "undefined") {
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  }
};

type Nav = ReturnType<typeof useNavigate>;

export const redirectForRole = (role: Role, navigate: Nav) => {
  switch (role) {
    case "player":
      return navigate({ to: "/player/$id", params: { id: "1" } });
    case "club":
      return navigate({ to: "/dashboard" });
    case "coach":
    case "technician":
      return navigate({ to: "/marketplace" });
  }
};
