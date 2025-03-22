// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
// data
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSwiper } from "../../store/swiper_pills";
import { useEffect } from "react";
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons";

const SwiperHome = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { swiper, status, error } = useSelector((state) => state.swiper);

  useEffect(() => {   
      dispatch(getSwiper());
    }, [dispatch]);

    if (status === "loading") return 
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
    if (status === "failed") return <p>Xatolik: {error}</p>;

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
        {swiper?.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex justify-between items-center p-2"
          >
            <div className="w-[50%] ">
              <h1 className="text-[20px] md:text-[32px] lg:text-[72px] leading-[35px] md:leading-[45px] lg:leading-[72px]">
                {
                  i18n.language === "uz"
                  ? item.name_uz
                  : i18n.language === "ru"
                  ? item.name_ru
                  : item.name_en
                }
              </h1>
              <div
                className="py-5 text-[18px] md:text-[18px] leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html:
                    i18n.language === "uz"
                      ? item.body_uz
                      : i18n.language === "ru"
                      ? item.body_ru
                      : item.body_en,
                }}
              />
              <NavLink
                to={`/productpage/${item.id}`}
                onClick={() => handlePage(item)}
                className="btn mt-20"
              >
                {t("Global.button")}
              </NavLink>
            </div>
            <div className="w-[35%] md:w-[40%] overflow-hidden rounded-xl">
              <img src={item.picture} alt="" className="w-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperHome;