import { useNavigate } from "react-router-dom";

type MangaCardProps = {
  id: number;
  title: string;
  image: string;
  chapter: string;
  rating: number;
};

const MangaCard = ({
  id,
  title,
  image,
  chapter,
  rating,
}: MangaCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/manga/${id}`)}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#e4e9ef] bg-white shadow-[0_8px_24px_rgba(31,49,66,0.06)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_30px_rgba(31,49,66,0.13)]">
        <img
          alt={title}
          src={image}
          className="h-[250px] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#16202a]/45 opacity-0 transition group-hover:opacity-100">
          <span className="rounded-xl bg-[#e05252] px-4 py-2 text-sm font-semibold text-white shadow-lg">
            Đọc ngay
          </span>
        </div>

        {/* chapter */}
        <span className="absolute bottom-2 left-2 rounded-lg bg-[#16202a]/85 px-2 py-1 text-xs text-white">
          {chapter}
        </span>

        {/* rating */}
        <span className="absolute right-2 top-2 rounded-lg bg-[#fff1bf] px-2 py-1 text-xs font-semibold text-[#795d00]">
          ⭐ {rating}
        </span>
      </div>

      <p className="mt-3 line-clamp-1 text-sm font-bold text-[#263440]">{title}</p>
    </div>
  );
};

export default MangaCard;