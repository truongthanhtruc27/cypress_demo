import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MangaCard from "../../components/manga-card";

const tabs = [
  { key: "hot", label: "🔥 Nổi bật" },
  { key: "action", label: "⚔️ Nhiệt huyết" },
  { key: "adventure", label: "🧭 Du hành" },
  { key: "fantasy", label: "✨ Kỳ ảo" },
];

const HomeTypeProducts = () => {
  const [data, setData] = useState<any>({});
  const [tab, setTab] = useState("hot");

  const navigate = useNavigate(); // ✅ thêm dòng này

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/manga/home_type_products");
        if (!res.ok) throw new Error("Unable to load categories");
        const result = await res.json();
        setData(result && typeof result === "object" ? result : {});
      } catch {
        setData({});
      }
    };

    fetchData();
  }, []);

  const list = data[tab] || [];

  return (
    <section className="py-12 text-[#16202a]">
      <div className="section-wrap">

        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#168f91]">Khám phá thêm</p>
        <h2 className="section-heading mb-6 text-2xl font-bold">Truyện theo thể loại</h2>

        {/* TAB */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 rounded-2xl border border-[#e4e9ef] bg-white p-2 shadow-sm">
            {tabs.map((item) => (
              <div
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  tab === item.key
                    ? "bg-[#16202a] text-white shadow-md"
                    : "text-[#66727f] hover:bg-[#f6f8fb] hover:text-[#16202a]"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {list.map((item: any) => (
            <MangaCard key={item.id} {...item} />
          ))}
          {list.length === 0 && <p className="col-span-full rounded-2xl border border-dashed border-[#ccd6df] px-5 py-10 text-center text-sm text-[#66727f]">Danh sách đang được cập nhật.</p>}
        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={() => navigate("/products")} // ✅ chuyển trang
        className="mx-auto mb-6 mt-8 block rounded-xl border border-[#168f91] bg-white px-5 py-3 text-sm font-bold text-[#168f91] transition hover:-translate-y-0.5 hover:bg-[#edfafa]"
      >
        Xem thêm truyện <span aria-hidden="true">→</span>
      </button>
    </section>
  );
};

export default HomeTypeProducts;