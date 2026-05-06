export interface IProduct {
  id: number;
  title: string;
  image: string;
  chapter: string;
  rating: number;
  category: string;
  views?: number;
  status?: "ongoing" | "completed" | "dropped";
  isHot?: boolean;
  isNew?: boolean;
  updatedAt?: string;
  author?: string;
  description?: string;
}

export interface Props {
  item: IProduct;
}

// 🔥 FILTER categories
export const categories = [
  { id: "all", name: "Tất cả", value: "", icon: "📚" },
  { id: "ACTION", name: "Action", value: "ACTION", icon: "⚔️" },
  { id: "ADVENTURE", name: "Adventure", value: "ADVENTURE", icon: "🗺️" },
  { id: "FANTASY", name: "Fantasy", value: "FANTASY", icon: "🔮" },
  { id: "ROMANCE", name: "Romance", value: "ROMANCE", icon: "💕" },
  { id: "COMEDY", name: "Comedy", value: "COMEDY", icon: "😄" },
  { id: "HORROR", name: "Horror", value: "HORROR", icon: "👻" },
  { id: "SCIFI", name: "Sci-Fi", value: "SCIFI", icon: "🚀" },
];

// 🔥 SORT options
export const sorting = [
  { value: "newest", label: "🕐 Mới nhất" },
  { value: "rating-desc", label: "⭐ Rating cao nhất" },
  { value: "rating-asc", label: "Rating thấp nhất" },
  { value: "views-desc", label: "🔥 Xem nhiều nhất" },
  { value: "title-asc", label: "🔤 Tên A→Z" },
];

// STATUS labels
export const statusLabel: Record<string, { text: string; color: string }> = {
  ongoing: { text: "Đang ra", color: "#22c55e" },
  completed: { text: "Hoàn thành", color: "#3b82f6" },
  dropped: { text: "Tạm dừng", color: "#f59e0b" },
};