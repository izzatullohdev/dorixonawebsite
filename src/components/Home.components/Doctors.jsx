// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDoctor } from "../../store/doctors";
import { useEffect } from "react";
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons";

const Doctors = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { doctor, status, error } = useSelector((state) => state.doctor);

  useEffect(() => {   
      dispatch(getDoctor());
    }, [dispatch]);

    if (status === "loading") return 
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
    if (status === "failed") return <p>Xatolik: {error}</p>;

    if (!doctor || doctor.length === 0) return null;  

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-center text-[28px] md:text-[30px] lg:text-[40px] font-[500] my-6">
        {t("doctors.mainInfo")}
      </h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className=""
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
          1440: {
            slidesPerView: 4,
          }
        }}
      >
        {doctor?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex items-center flex-col border p-3 rounded-lg overflow-hidden">
              <img src={item.picture} alt="" className="rounded-t-lg"/>
              <h3 className="text-[18px] md:text-[20px] lg:text-[25px] my-3">
                {item.fullname}
              </h3>
              <div>
                <h3 className="text-[12px] md:text-[18px] lg:text-[18px]">
                  <span className="font-[600]">{t("doctors.direction")}: </span>
                  {
                    i18n.language === "uz"
                    ? item.direction_uz
                    : i18n.language === "ru"
                    ? item.direction_ru
                    : item.direction_en
                  }
                </h3>
                <a
                  href={`tel:${item.call}`}
                  className="text-[12px] md:text-[18px] lg:text-[18px]"
                >
                  <span className="font-[600] my-3">{t("doctors.call")}: </span>
                  {item.call}
                </a>
                <p className="text-[12px] md:text-[18px] lg:text-[18px]  hidden lg:block">
                  <span className="font-[600]">{t("doctors.info")}: </span>
                  {
                    i18n.language === "uz"
                    ? item.body_uz
                    : i18n.language === "ru"
                    ? item.body_ru
                    : item.body_en
                  }
                </p>
                <NavLink to={`/doctorpage/${item.id}`} className="btn btn_card mt-2">
                  {t("Global.button")}
                </NavLink>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full flex justify-center mt-1">
        <NavLink to={"/alldoctors"} className={"text-center btn btn-card"}>{t("Global.more")}</NavLink>
      </div>
    </div>
  );
};

export default Doctors;