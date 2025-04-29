import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getSwiper } from "../../store/swiper_pills";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { NavLink } from "react-router-dom";


const decodeHTML = (html) => {
  const parser = new DOMParser();
  const decoded = parser.parseFromString(html, "text/html");
  return decoded.body.textContent || "";
};

const SwiperHome = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { swiper, status, error } = useSelector((state) => state.swiper);

  useEffect(() => {
    dispatch(getSwiper());
  }, [dispatch]);

  if (status === "loading")
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );

  if (status === "failed") return <p className="text-red-500 text-center my-5">Xatolik: {error}</p>;

  if ((status === "succeeded" || status === "idle") && swiper.length === 0) {
    return null;
  }  

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
        className="container mx-auto h-[70vh] min-h-[70vh] md:h-[60vh] lg:h-[70vh]"
      >
        {swiper?.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex justify-between items-center max-md:flex-col-reverse p-2"
          >
            <div className="w-[50%] max-md:w-full">
              <h1 className="text-[20px] md:text-[32px] lg:text-[72px] leading-[35px] md:leading-[45px] lg:leading-[72px]">
                {
                  i18n.language === "uz"
                    ? item.name_uz
                    : i18n.language === "ru"
                    ? item.name_ru
                    : item.name_en
                }
              </h1>
              <p className="py-5 text-[14px] md:text-[18px] leading-relaxed">
                {decodeHTML(
                  i18n.language === "uz"
                    ? item.body_uz
                    : i18n.language === "ru"
                    ? item.body_ru
                    : item.body_en
                )}
              </p>
              <NavLink to={`/datapage/${item.id}`}>
                <button className="btn">{t("Global.button")}</button>
              </NavLink>
            </div>
            <div className="w-[55%] md:w-[40%] overflow-hidden rounded-xl">
              <img src={item.picture} alt="" className="lg:max-h-[650px] w-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperHome;