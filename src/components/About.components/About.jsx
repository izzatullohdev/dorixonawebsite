import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="text-center text-[28px] md:text-[30px] lg:text-[40px] font-[500] mt-12 my-6">
        {t("AboutComponents.heading")}
      </h1>
      <div className="AboutComponents">
        <div className="container mx-auto">
          <div className="p-4 w-[50%] md:w-[40%] lg:w-[25vw] flex flex-col items-start justify-center gap-6  h-[50vh] md:h-[70vh] lg:h-[70vh] text-[#002940]">
            <h1 className="text-[25px] md:text-[50px] lg:text-[64px] font-bold  md:leading-[56  px] lg:leading-[80px]">
              {t("AboutComponents.title")}
            </h1>
            <p className="text-[16px] md:text-[18px] lg:text-[18px]">
              {t("AboutComponents.description")}
            </p>
            <NavLink to={"/about"} className="btn">{t("Global.button")}</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default About