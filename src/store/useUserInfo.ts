import { create } from "zustand";

type User = {
  id: number;
  username: string;
  name: string;
};

// ✅ hàm lấy user an toàn
const getUserFromStorage = (): User | null => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

type State = {
  user: User | null;
  setUserInfo: (user: User) => void;
  logout: () => void;
};

export const useUserInfo = create<State>((set) => ({
  // ✅ init chuẩn
  user: getUserFromStorage(),

  // ✅ set user
  setUserInfo: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  // ✅ logout chuẩn
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null });
  },
}));