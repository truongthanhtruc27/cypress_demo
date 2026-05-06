import { useEffect, useState } from "react";
import HomeBanner from "../../components/home-banner";
import MangaCard from "../../components/manga-card";
import HomeTypeProducts from "../../components/home-type-products";

const Home = () => {
  const [mangas, setMangas] = useState<any[]>([]);

  const getMangas = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/manga");
      const result = await res.json();

      console.log("HOME API:", result);

      // ✅ FIX MẠNH (không bao giờ undefined)
      if (Array.isArray(result)) {
        setMangas(result);
      } else if (Array.isArray(result?.data)) {
        setMangas(result.data);
      } else {
        setMangas([]);
      }

    } catch (err) {
      console.log(err);
      setMangas([]); // ✅ fallback luôn
    }
  };

  useEffect(() => {
    getMangas();
  }, []);

  return (
    <div className="bg-white min-h-screen text-green-800 ">

      <HomeBanner />

      <div className="py-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-xl font-bold mb-6">
            🔥 Truyện mới cập nhật
          </h2>

          {/* ✅ FIX .map crash */}
          <div className="flex gap-5 overflow-x-auto">

            {(mangas || []).map((item) => (
              <div key={item.id} className="min-w-[180px] flex-shrink-0">
                <MangaCard {...item} />
              </div>
            ))}

          </div>

        </div>
      </div>

      <HomeTypeProducts />

    </div>
  );
};

export default Home;