import { useEffect, useState } from "react";
import HomeBanner from "../../components/home-banner";
import MangaCard from "../../components/manga-card";
import HomeTypeProducts from "../../components/home-type-products";
import { mangaList } from "../../components/manga-card/fakeData";

const Home = () => {
  const [mangas, setMangas] = useState<any[]>([]);

  const getMangas = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/manga");
      const result = await res.json();

      if (Array.isArray(result)) {
        setMangas(result);
      } else if (Array.isArray(result?.data)) {
        setMangas(result.data);
      } else {
        setMangas([]);
      }

    } catch (err) {
      console.log(err);
      setMangas(mangaList);
    }
  };

  useEffect(() => {
    getMangas();
  }, []);

  return (
    <div className="min-h-screen text-[#16202a]">

      <HomeBanner />

      <section className="border-b border-[#e4e9ef] py-12">
        <div className="section-wrap">

          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#e05252]">Tủ sách mới</p>
              <h2 className="section-heading text-2xl font-bold">Truyện mới cập nhật</h2>
            </div>
            <span className="text-sm text-[#66727f]">{mangas.length} tựa truyện</span>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4">
            {mangas.length > 0 ? mangas.map((item, index) => (
              <div key={item.id ?? index} className="min-w-[180px] flex-shrink-0 sm:min-w-[200px]">
                <MangaCard {...item} />
              </div>
            )) : (
              <p className="rounded-xl border border-dashed border-[#ccd6df] px-5 py-8 text-sm text-[#66727f]">Chưa có truyện mới.</p>
            )}
          </div>
        </div>
      </section>

      <HomeTypeProducts />

    </div>
  );
};

export default Home;