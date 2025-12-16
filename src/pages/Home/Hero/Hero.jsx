import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Banner = () => {
  const axiosSecure = useAxiosSecure();
  const currentStatus = "approved";
  const { data: banerData = {}, isLoading } = useQuery({
    queryKey: ["banerData", currentStatus],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/recent-clubs?status=${currentStatus}`
      );
      return result.data;
    },
  });

  console.log(banerData);

  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative md:w-full mx-auto rounded-xl overflow-hidden my-6"
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
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        pagination={{ clickable: true }}
        loop={true}
        grabCursor={true}
        spaceBetween={0}
      >
        {banerData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[350px] md:h-[600px]">
              <img
                src={slide.bannerImage}
                className="w-full h-full object-cover"
                alt={slide.clubName}
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center md:items-start justify-center text-center px-4">
                <h2 className="text-white text-2xl md:text-7xl font-bold drop-shadow-lg md:ml-20">
                  {slide.clubName}
                </h2>

                <p className="text-white text-sm md:text-2xl font-medium mt-3 drop-shadow md:ml-20">
                  {slide.description}
                </p>

                <div className="mt-5 flex gap-2">
                  <Link
                    to={`/clubs/${slide._id}`}
                    className="btn md:w-3/6 text-white rounded bg-blue-800 hover:bg-pink-800 transition-colors duration-300 border-none md:ml-20 text-xl"
                  >
                    Join Club
                  </Link>
                  <Link
                    to={``}
                    className="btn text-white rounded btn-outline border hover:bg-pink-800 transition-colors duration-300 hover:border-none text-xl md:w-3/6"
                  >
                    Create Club
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
