import React from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import {
  kingFusionBurger,
  paneerWrap,
  royalSandwich,
  vegWrap,
  liteBurger,
  hazelnutShake,
} from "../constants";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Swiper modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const ProductCarousel = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/menu");
  };

  // ✅ Structured categories
  const categories = [
    {
      title: "King Fusion Burger",
      desc: "Crunchy and delicious",
      img: kingFusionBurger,
      btn: "Burgers",
    },
    {
      title: "Paneer Wrap",
      desc: "Delightful Indian twist",
      img: paneerWrap,
      btn: "Wraps",
    },
    {
      title: "Shakes",
      desc: "Light, tasty, and guilt-free",
      img: hazelnutShake,
      btn: "Shakes",
    },
    {
      title: "Royal Sandwich",
      desc: "Burgers with royal touch",
      img: royalSandwich,
      btn: "Sandwiches",
    },
    {
      title: "Veg Wrap",
      desc: "Veggies packed in a soft wrap",
      img: vegWrap,
      btn: "Wraps",
    },
  ];

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 2500 }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        slidesPerView={2}
        pagination={{ clickable: true }}
        breakpoints={{
          440: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="w-full h-auto overflow-visible [&_.swiper-pagination-bullet-active]:!bg-brand [&_.swiper-pagination]:!relative [&_.swiper-pagination]:!bottom-[-6px]"
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center text-center min-h-[360px]">
              {/* Image */}
              <div className="w-full h-48">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="para font-semibold text-ink">
                  {cat.title}
                </h2>
                <p className=" text-muted para mb-2">{cat.desc}</p>
                <button
                  onClick={handleNavigate}
                  className="bg-brand text-white py-2 px-5 rounded-full hover:bg-brand-light transition"
                >
                  {cat.btn}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Pagination bullets */}
        <div className="swiper-pagination"></div>
      </Swiper>

      {/* Custom navigation buttons */}
      <button className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 bg-brand text-white p-3 rounded-full shadow-lg z-10">
        <MoveLeft />
      </button>
      <button className="custom-next absolute right-2 top-1/2 -translate-y-1/2 bg-brand text-white p-3 rounded-full shadow-lg z-10">
        <MoveRight />
      </button>
    </div>
  );
};

export default ProductCarousel;
