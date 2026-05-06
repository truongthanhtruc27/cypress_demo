import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MangaCard from "../../components/manga-card";

const tabs = [
  { key: "hot", label: "🔥 Hot" },
  { key: "action", label: "⚔️ Action" },
  { key: "adventure", label: "🧭 Adventure" },
  { key: "fantasy", label: "✨ Fantasy" },
];

const HomeTypeProducts = () => {
  const [data, setData] = useState<any>({});
  const [tab, setTab] = useState("hot");

  const navigate = useNavigate(); // ✅ thêm dòng này

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:5000/api/manga/home_type_products"
      );
      const result = await res.json();

      setData(result);
    };

    fetchData();
  }, []);

  const list = data[tab] || [];

  return (
    <div className="bg-white text-green-800 ">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-2xl font-bold mb-6">
          📚 Truyện theo thể loại
        </h2>

        {/* TAB */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-3 bg-[#1e293b] text-gray-200 p-2 rounded-full">
            {tabs.map((item) => (
              <div
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`px-4 py-2 rounded-full cursor-pointer ${
                  tab === item.key
                    ? "bg-red-500"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {list.map((item: any) => (
            <MangaCard key={item.id} {...item} />
          ))}
        </div>

      </div>

      {/* BUTTON */}
      <div
        onClick={() => navigate("/products")} // ✅ chuyển trang
        className="m-auto mb-6 px-6 py-2 bg-white hover:bg-blue-100 border-blue-600 cursor-pointer border rounded-full text-blue-600 w-fit"
      >
        Xem thêm sản phẩm
      </div>
    </div>
  );
};

export default HomeTypeProducts;