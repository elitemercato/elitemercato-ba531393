import type { useNavigate } from "@tanstack/react-router";

export type Role = "player" | "club" | "coach" | "technician";

const KEY = "em-role";

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
