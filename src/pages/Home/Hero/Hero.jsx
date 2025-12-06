import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";

const Banner = () => {
  const data = [
    {
      id: 1,
      title: "Discover Exotic Plants",
      description:
        "Bring life to your home with our unique collection of exotic plants.",
      image:
        "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      _id: "plant1",
    },
    {
      id: 2,
      title: "Indoor Gardening Made Easy",
      description: "Transform your indoor space with greenery and style.",
      image:
        "https://images.unsplash.com/photo-1587502536263-3b69d76a5e20?auto=format&fit=crop&w=800&q=80",
      _id: "plant2",
    },
    {
      id: 3,
      title: "Healthy Plants, Happy Home",
      description: "Choose plants that purify your air and bring positivity.",
      image:
        "https://images.unsplash.com/photo-1615394299053-0a7ee302f48b?auto=format&fit=crop&w=800&q=80",
      _id: "plant3",
    },
    {
      id: 4,
      title: "Decorate Your Garden",
      description:
        "Make your garden stand out with our beautiful plant selection.",
      image:
        "https://images.unsplash.com/photo-1622495896033-6d9e485f4a76?auto=format&fit=crop&w=800&q=80",
      _id: "plant4",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-11/12 md:w-full mx-auto rounded-xl overflow-hidden my-6"
    >
      {/* Button */}
      <div className="swiper-button-prev custom-prev">
        <img
          width="78"
          height="78"
          src="https://img.icons8.com/external-filled-color-icons-papa-vector/78/external-Left-Arrow-interface-filled-color-icons-papa-vector.png"
          alt="external-Left-Arrow-interface-filled-color-icons-papa-vector"
        />
      </div>
      <div className="swiper-button-next custom-next">
        <img
          width="78"
          height="78"
          src="https://img.icons8.com/external-filled-color-icons-papa-vector/78/external-Right-Arrow-interface-filled-color-icons-papa-vector.png"
          alt="external-Right-Arrow-interface-filled-color-icons-papa-vector"
        />
      </div>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        pagination={{ clickable: true }}
        loop={true}
        grabCursor={true}
        spaceBetween={0}
      >
        {data.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[350px] md:h-[500px]">
              <img
                src={slide.image}
                className="w-full h-full object-cover"
                alt="banner"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg">
                  {slide.title}
                </h2>

                <p className="text-white/80 text-sm md:text-lg font-medium mt-3 drop-shadow">
                  {slide.description}
                </p>

                <div className="flex justify-center items-center mx-auto mt-5">
                  <Link
                    to={`/bill-details/${slide._id}`}
                    className="btn text-white rounded bg-linear-to-r from-blue-700 to-pink-700 hover:from-blue-800 hover:to-pink-800 transition-colors duration-300 border-none"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Banner;
