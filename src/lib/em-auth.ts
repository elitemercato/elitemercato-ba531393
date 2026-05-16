import type { useNavigate } from "@tanstack/react-router";

export type Role = "player" | "club" | "coach" | "technician";

const KEY = "em-role";
const AUTH_KEY = "em-authed";

export const setRole = (r: Role) => {
  if (typeof window !== "undefined") localStorage.setItem(KEY, r);
};

export const getRole = (): Role | null => {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(KEY);
  return v === "player" || v === "club" || v === "coach" || v === "technician" ? v : null;
};

export const clearRole = () => {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
};

export const setAuthed = (v: boolean) => {
  if (typeof window === "undefined") return;
  if (v) localStorage.setItem(AUTH_KEY, "1");
  else localStorage.removeItem(AUTH_KEY);
};

export const isAuthed = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "1";
};

export const signOut = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(KEY);
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
