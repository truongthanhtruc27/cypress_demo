import React from "react";
import { Carousel } from "antd";

import banner2 from "../../assets/imgs/Hinh2.jpg";
import banner1 from "../../assets/imgs/Hinh1.jpg";
import banner3 from "../../assets/imgs/Hinh3.jpg";
import banner4 from "../../assets/imgs/Hinh4.jpg";
import { useNavigate } from "react-router-dom";

const slides = [
  { image: banner1, title: "Solo Leveling", description: "Thợ săn yếu nhất bỗng trở thành người mạnh nhất.", id: 1 },
  { image: banner2, title: "Kimetsu no Yaiba", description: "Bước vào hành trình diệt quỷ đầy cảm xúc.", id: 2 },
  { image: banner3, title: "One Punch Man", description: "Một cú đấm. Một huyền thoại. Vô số trận chiến.", id: 3 },
  { image: banner4, title: "Thế giới manga", description: "Những câu chuyện mới đang chờ bạn khám phá.", id: 4 },
];

const HomeBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="home-banner overflow-hidden border-b border-[#e4e9ef]">
      <Carousel autoplay arrows dots>
        {slides.map((slide) => (
          <div key={slide.title} className="relative h-[360px] overflow-hidden sm:h-[470px]">
            <img src={slide.image} alt={slide.title} className="h-full w-full object-cover object-center brightness-[0.78]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#101820]/85 via-[#101820]/35 to-transparent" />
            <div className="absolute inset-0 mx-auto flex max-w-[1180px] items-center px-6 sm:px-8">
              <div className="animate-rise max-w-xl text-white">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#ffb19f]">Gợi ý hôm nay</p>
                <h2 className="mb-3 font-['Space_Grotesk'] text-3xl font-bold sm:text-5xl">{slide.title}</h2>
                <p className="mb-6 max-w-md text-base text-white/80 sm:text-lg">{slide.description}</p>
                <button onClick={() => navigate(`/manga/${slide.id}`)} className="rounded-xl bg-[#e05252] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#c43d48]">Đọc ngay <span aria-hidden="true">→</span></button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeBanner;