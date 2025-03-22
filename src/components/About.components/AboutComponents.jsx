import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { useDispatch, useSelector } from "react-redux";
import { getPartner } from "../../store/partners";
import { useState, useEffect } from "react";
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const AboutComponents = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { partner, status, error } = useSelector((state) => state.partner);
  const [state, setState] = useState(false);

  useEffect(() => {   
    dispatch(getPartner());
  },[dispatch]);
  
  if (status === "loading") return 
  <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  </div>

  if (status === "failed") return <p>Xatolik: {error}</p>;

  return (
    <>
      <div className="AboutComponents">
        <div className="container mx-auto">
          <div className="p-4 w-[50%] md:w-[40%] lg:w-[25vw] flex flex-col items-center justify-center gap-6  h-[50vh] md:h-[70vh] lg:h-[70vh] text-[#002940]">
            <h1 className="text-[25px] md:text-[50px] lg:text-[64px] font-bold  md:leading-[56  px] lg:leading-[80px]">
              {t("AboutComponents.title")}
            </h1>
            <p className="text-[16px] md:text-[18px] lg:text-[18px]">
              {t("AboutComponents.description")}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex justify-between items-center gap-10 my-10 flex-wrap">
          <div className="w-[100%] md:w-[100%] text-center ">
            <h1 className="text-[28px] md:text-[32px] lg:text-[42px]">
              {t("AboutComponents.main_title")}
            </h1>
          </div>
          <div className="w-[90%] mx-auto  md:w-[100%] lg:w-[100%] text-justify">
            <p className="text-[16px] md:text-[18px] lg:text-[20px]">
              {t("AboutComponents.main_description")}
            </p>
          </div>
        </div>
        <ScrollTrigger
          onEnter={() => setState(true)}
          onExit={() => setState(false)}
        >
          <div className="flex justify-between flex-col md:flex-row lg:flex-row item-center gap-10 py-[60px] border-t border-b">
            <div className="text-center text-[#2F3E46] ">
              <h1>{t("AboutComponents.number_title")}</h1>
              <h1 className="text-[50px] font-bold ">
                {state && <CountUp start={0} end={7} />}{" "}
                <span className="text-[#F2CE9A]">+</span>
              </h1>
            </div>
            <div className=" text-center text-[#2F3E46]">
              <h1>{t("AboutComponents.number_title1")}</h1>
              <h1 className="text-[50px] font-bold ">
                {state && <CountUp start={0} end={4000} />}{" "}
                <span className="text-[#F2CE9A]">+</span>
              </h1>
            </div>
            <div className="text-center text-[#2F3E46]">
              <h1>{t("AboutComponents.number_title2")}</h1>
              <h1 className="text-[50px] font-bold">
                {state && <CountUp start={0} end={350} />}
                <span className="text-[#F2CE9A]">+</span>
              </h1>
            </div>
          </div>
        </ScrollTrigger>
        <div className="my-[10px] md:my-[50px] lg:my-[100px]">
          <h1 className="text-center md:my-[20px] text-[25px] md:text-[30px] lg:text-[50px] text-[#2F3E46] my-[20px]">
            {t("AboutComponents.hamkorlar")}
          </h1>
          <div className="flex justify-between items-center my-10 p-5">
            {partner?.map((item) => (
              <div key={item.id} className="w-[80px] md:w-[90px] lg:w-[180px]">
                <img src={item.picture} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutComponents;
