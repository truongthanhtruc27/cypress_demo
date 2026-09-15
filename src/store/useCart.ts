import { create } from "zustand";

export interface ICartItem {
  id: number;
  title: string;
  image: string;
  category: string;
  quantity: number;
}

type CartState = {
  items: ICartItem[];
  addToCart: (item: Omit<ICartItem, "quantity">) => void;
  decreaseQty: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalItems: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],

  addToCart: (item) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    });
  },

  decreaseQty: (id) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === id);
      if (!existing) return state;
      if (existing.quantity <= 1) {
        return { items: state.items.filter((i) => i.id !== id) };
      }
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    });
  },

  removeFromCart: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }));
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
