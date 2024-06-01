import doc from "../../assets/Doc.svg";
import { useContext } from "react";
import { dataContext } from "../../useContext/DataContext";
import { useTranslation } from "react-i18next";
import AboutVideo from "../../components/About.components/AboutVideo";
import { NavLink } from "react-router-dom";
const AllDoctors = () => {
  const { doctors } = useContext(dataContext);
  const { t } = useTranslation();
  return (
    <>
      <div className="container mx-auto my-28">
        <div className="flex justify-between item-center flex-col-reverse md:flex-col-reverse lg:flex-row">
          <div className="w-[100%] md:w-[100%] lg:w-[50%] p-3">
            <h1 className="text-[20px] md:text-[35px] lg:text-[40px] text-center md:text-center lg:text-left">
              Bizning shifokorlarimiz yuqori darajada kvalifikalisyaga ega!
            </h1>
            <p className="my-10 text-justify md:text-justify lg:text-left">
              Lorem ipsum dolor sit amet consectetur. Sed molestie eu
              suspendisse odio pulvinar quam aliquet ullamcorper. Diam
              adipiscing nulla venenatis sit pharetra egestas pellentesque.
              Pellentesque eget cursus mollis tempor natoque ultricies mattis
              venenatis fusce. Sed nulla a ut habitasse gravida. Orci quisque
              tortor enim posuere mi sem. Duis volutpat malesuada aliquam eget
              dictum id amet non. Congue bibendum nunc pharetra sed volutpat
              consequat fames. Ornare ante et mi sagittis ut adipiscing
              consequat ut facilisis. Tortor nisi nibh lobortis purus sociis sem
              massa. Ac morbi in arcu.
            </p>
            <p className="text-justify md:text-justify lg:text-left">
              Lorem ipsum dolor sit amet consectetur. Sed molestie eu
              suspendisse odio pulvinar quam aliquet ullamcorper. Diam
              adipiscing nulla venenatis sit pharetra egestas pellentesque.
              Pellentesque eget cursus mollis tempor natoque ultricies mattis
              venenatis fusce. Sed nulla a ut habitasse gravida. Orci quisque
              tortor enim posuere mi sem. Duis volutpat malesuada aliquam eget
              dictum id amet non. Congue bibendum nunc pharetra sed volutpat
              consequat fames. Ornare ante et mi sagittis ut adipiscing
              consequat ut facilisis. Tortor nisi nibh lobortis purus sociis sem
              massa. Ac morbi in arcu.
            </p>
          </div>
          <div>
            <img src={doc} alt="" />
          </div>
        </div>
        <h1 className="text-center my-20 text-[40px]">Doktorlar</h1>
        <div className="flex justify-center text-center flex-wrap gap-5 lg:gap-20 my-20">
          {doctors?.map((item) => (
            <div
              className="flex items-center flex-col p-5 border rounded-md w-[80%] md:w-[45%] lg:w-[25%]"
              key={item.id}
            >
              <img src={item.picture} alt="" />
              <h3 className="text-[27px] my-3">{item.name}</h3>
              <div>
                <h3 className="">
                  <span className="font-[600]">{t("doctors.direction")}: </span>
                  {item.direction}
                </h3>
                <a href={item.call}>
                  <span className="font-[600] my-3">{t("doctors.call")}: </span>
                  {item.call}
                </a>
                <p>
                  <span className="font-[600]">{t("doctors.info")}: </span>
                  {item.body}
                </p>
                <NavLink to={`/doctorpage/${item.id}`} className="btn btn_card">
                  {t("Global.button")}
                </NavLink>
              </div>
            </div>
          ))}
        </div>
        <AboutVideo videoUrl={"https://www.youtube.com/watch?v=B7jnwCfcBLE"} />
      </div>
    </>
  );
};

export default AllDoctors;
