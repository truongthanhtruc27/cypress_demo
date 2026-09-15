import manga1 from "../../assets/imgs/manga1.jpg";
import manga2 from "../../assets/imgs/manga2.png";
import manga3 from "../../assets/imgs/manga3.jpg";
import manga4 from "../../assets/imgs/manga4.jpg";
import manga5 from "../../assets/imgs/manga5.jpg";
import manga6 from "../../assets/imgs/manga6.png";

// Danh sách thể loại dùng cho dữ liệu mẫu.
export const genreOptions = [
  { id: 1, label: "Action", value: "action" },
  { id: 2, label: "Romance", value: "romance" },
  { id: 3, label: "Fantasy", value: "fantasy" },
  { id: 4, label: "School", value: "school" },
];

// 👉 gom ảnh
const images = [manga1, manga2, manga3, manga4, manga5, manga6];

// 👉 danh sách truyện
export const mangaListFull = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Manga ${i + 1}`,
  image: images[i % images.length], // dùng lại ảnh local
  chapter: `Chap ${i + 1}`,
  rating: 4.5,
  genre: genreOptions[i % genreOptions.length].value,
}));