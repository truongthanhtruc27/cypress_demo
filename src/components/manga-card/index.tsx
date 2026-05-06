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
      className="cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={image}
          className="w-full h-[250px] object-cover group-hover:scale-110 transition duration-300"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <span className="bg-red-500 px-4 py-1 rounded-full text-sm">
            Đọc ngay
          </span>
        </div>

        {/* chapter */}
        <span className="absolute bottom-2 left-2 bg-green-700 text-gray-200 text-xs px-2 py-1 rounded">
          {chapter}
        </span>

        {/* rating */}
        <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
          ⭐ {rating}
        </span>
      </div>

      <p className="text-white mt-2 text-sm font-semibold">{title}</p>
    </div>
  );
};

export default MangaCard;