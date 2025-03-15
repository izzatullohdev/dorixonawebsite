// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
// data
import { dataContext } from "../../useContext/DataContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
const SwiperHome = () => {
  const { t } = useTranslation();
  const { headerData, setDataPage } = useContext(dataContext);
  const handlePage = (page) => {
    setDataPage(page);
  };
  return (
    <>
      <Swiper
        pagination={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="container mx-auto h-[50vh] md:h-[60vh] lg:h-[70vh]"
      >
        {headerData?.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex justify-between items-center p-2"
          >
            <div className="w-[50%] ">
              <h1 className="text-[20px] md:text-[32px] lg:text-[72px] leading-[35px] md:leading-[45px] lg:leading-[72px] ">
                {item.name}
              </h1>
              <p className="my-2 md:my-5 text-[18px] max-md:text-[13px] md:block lg:hidden">
                {item.body.slice(0, 100)}...
              </p>
              <p className="my-2 md:my-5 text-[18px] max-md:text-[13px] hidden md:hidden lg:block">
                {item.body}
              </p>

              <NavLink
                to={`/productpage/${item.id}`}
                onClick={() => handlePage(item)}
                className="btn my-5"
              >
                {t("Global.button")}
              </NavLink>
            </div>
            <div className="w-[40%] md:w-[50%] lg:w-[400px]">
              <img src={item.picture} alt="" className="w-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperHome;
