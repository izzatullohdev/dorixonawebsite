// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { dataContext } from "../../useContext/DataContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const Doctors = () => {
  const { t } = useTranslation();
  const { doctors } = useContext(dataContext);

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-center text-[28px] md:text-[32px] lg:text-[32px] font-[500] my-6">
        {t("doctors.mainInfo")}
      </h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="h-[50vh] md:h-[60vh] lg:h-[60vh]"
        breakpoints={{
          // when window width is >= 640px
          0: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {doctors?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex items-center flex-col p-5 border rounded-md">
              <img src={item.picture} alt="" />
              <h3 className="text-[18px] md:text-[20px] lg:text-[25px] my-3">
                {item.name}
              </h3>
              <div>
                <h3 className="text-[12px] md:text-[18px] lg:text-[18px]">
                  <span className="font-[600]">{t("doctors.direction")}: </span>
                  {item.direction}
                </h3>
                <a
                  href={`tel:${item.call}`}
                  className="text-[12px] md:text-[18px] lg:text-[18px]"
                >
                  <span className="font-[600] my-3">{t("doctors.call")}: </span>
                  {item.call}
                </a>
                <p className="text-[12px] md:text-[18px] lg:text-[18px] lg:hidden">
                  <span className="font-[600]">{t("doctors.info")}: </span>
                  {item.body.slice(0, 20)}...
                </p>
                <p className="text-[12px] md:text-[18px] lg:text-[18px]  hidden lg:block">
                  <span className="font-[600]">{t("doctors.info")}: </span>
                  {item.body}
                </p>
                <button className="btn btn_card">{t("Global.button")}</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Doctors;
