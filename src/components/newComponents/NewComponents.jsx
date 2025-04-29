import AboutVideo from "../About.components/AboutVideo";
import { useDispatch, useSelector } from "react-redux";
import { getAchievement } from "../../store/achievements";
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Discounts from "../discounts";

const NewComponents = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { achievements, status, error } = useSelector((state) => state.achievement);

  useEffect(() => {   
    dispatch(getAchievement());
  }, [dispatch]);

  if (status === "loading") return 
  <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  </div>
  if (status === "failed") return <p>Xatolik: {error}</p>;

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-center my-5 md:my-10 lg:my-20 text-[30px] md:text-[40px] lg:text-[50px]">
          {t("news.new")}
        </h1>
        <div className="flex justify-center items-center flex-wrap gap-5 md:gap-10 lg:gap-12 py-5">
          {achievements?.map((item, index) => (
            <div
              key={index}
              className="w-[380px] max-sm:w-full border rounded-lg hover:translate-y-[-20px] transition-all overflow-hidden"
            >
              <img 
                src={item.picture} 
                className="w-full cursor-pointer" 
                alt={
                  i18n.language === "uz"
                  ? item.title_uz
                  : i18n.language === "ru"
                  ? item.title_ru
                  : item.title_en
                } 
              />
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto border-y">
        <h1 className="text-center text-[40px] my-12">{t("news.discount")}</h1>
        <div>
          <Discounts />
        </div>
        <div>
          <AboutVideo
            videoUrl={"https://www.youtube.com/watch?v=DttV5GCdEMc"}
          />
        </div>
      </div>
    </>
  );
};

export default NewComponents;
