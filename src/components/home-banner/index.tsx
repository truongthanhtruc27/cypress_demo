import React from "react";
import { Carousel } from "antd";

import banner2 from "../../assets/imgs/Hinh2.jpg";
// import banner1 from "../../assets/imgs/Hinh1.jpg";
// import banner3 from "../../assets/imgs/Hinh3.jpg";
// import banner4 from "../../assets/imgs/Hinh4.jpg";
// import banner5 from "../../assets/imgs/Hinh5.jpg";
// import banner6 from "../../assets/imgs/Hinh6.jpg";

const HomeBanner = () => {
  return (
    <div className="h-[500px] w-full">
      <Carousel autoplay arrows>

        {/* Banner 1 */}
        <div className="h-[500px] w-full relative overflow-hidden">
          <img
            src={banner2}
            className="w-full h-[500px] object-cover object-center brightness-110 contrast-110"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-lg text-white">
                <h2 className="text-4xl font-bold mb-4">Solo Leveling</h2>
                <p className="text-lg mb-6">
                  Thợ săn yếu nhất bỗng trở thành người mạnh nhất.
                </p>
                <div className="flex gap-4">
                  <button className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full">
                    Đọc ngay
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="h-[500px] w-full relative overflow-hidden">
          <img
            src={banner2}
            className="w-full h-[500px] object-cover object-center brightness-110 contrast-110"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-lg text-white">
                <h2 className="text-4xl font-bold mb-4">One Piece</h2>
                <p className="text-lg mb-6">
                  Hành trình trở thành Vua Hải Tặc.
                </p>
                <div className="flex gap-4">
                  <button className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full">
                    Đọc ngay
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner 3 */}
        <div className="h-[500px] w-full relative overflow-hidden">
          <img
            src={banner2}
            className="w-full h-[500px] object-cover object-center brightness-110 contrast-110"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-lg text-white">
                <h2 className="text-4xl font-bold mb-4">Jujutsu Kaisen</h2>
                <p className="text-lg mb-6">
                  Cuộc chiến giữa chú thuật sư và lời nguyền.
                </p>
                <div className="flex gap-4">
                  <button className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full">
                    Đọc ngay
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Carousel>
    </div>
  );
};

export default HomeBanner;