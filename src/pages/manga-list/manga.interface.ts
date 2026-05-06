export interface IManga {
  id: number;
  title: string;
  image: string;
  chapter: string;
  rating: number;
  category: string;       // dùng category thay genre (khớp với API)
  genre?: string;         // backward compat
  views?: number;
  author?: string;
  description?: string;
  status?: "ongoing" | "completed" | "dropped";
  isHot?: boolean;
  isNew?: boolean;
  updatedAt?: string;
  tags?: string[];
}

export interface Props {
  item: IManga;
  viewMode?: "grid" | "list";
}

// ─── Genre list ───
export const genres = [
  { id: "all",       name: "Tất cả",    value: "",          icon: "📚" },
  { id: "ACTION",    name: "Action",    value: "ACTION",    icon: "⚔️" },
  { id: "ADVENTURE", name: "Adventure", value: "ADVENTURE", icon: "🗺️" },
  { id: "FANTASY",   name: "Fantasy",   value: "FANTASY",   icon: "🔮" },
  { id: "ROMANCE",   name: "Romance",   value: "ROMANCE",   icon: "💕" },
  { id: "COMEDY",    name: "Comedy",    value: "COMEDY",    icon: "😄" },
  { id: "HORROR",    name: "Horror",    value: "HORROR",    icon: "👻" },
  { id: "SCIFI",     name: "Sci-Fi",    value: "SCIFI",     icon: "🚀" },
  { id: "SPORTS",    name: "Sports",    value: "SPORTS",    icon: "🏆" },
  { id: "SLICE",     name: "Slice of Life", value: "SLICE", icon: "🌸" },
];

// ─── Sort options ───
export const sorting = [
  { value: "newest",      label: "🕐 Mới nhất" },
  { value: "rating-desc", label: "⭐ Rating cao" },
  { value: "rating-asc",  label: "Rating thấp" },
  { value: "views-desc",  label: "🔥 Xem nhiều" },
  { value: "title-asc",   label: "🔤 A → Z" },
];

// ─── Status meta ───
export const statusMeta: Record<string, { label: string; color: string; bg: string }> = {
  ongoing:   { label: "Đang ra",    color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  completed: { label: "Hoàn thành", color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  dropped:   { label: "Tạm dừng",   color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
};

// ─── Category colors ───
export const catColors: Record<string, string> = {
  ACTION:    "#ef4444",
  ADVENTURE: "#f59e0b",
  FANTASY:   "#8b5cf6",
  ROMANCE:   "#ec4899",
  COMEDY:    "#22c55e",
  HORROR:    "#6b7280",
  SCIFI:     "#3b82f6",
  SPORTS:    "#f97316",
  SLICE:     "#14b8a6",
};