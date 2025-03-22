import { useContext } from "react";
import { dataContext } from "../../useContext/DataContext";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Feedback = () => {
  const { videos } = useContext(dataContext);
  const { t } = useTranslation();

  const getEmbedUrl = (url) => {
    if (url.includes("shorts")) {
      const videoId = url.split("/shorts/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (!url.includes("embed")) {
      return url.replace("watch?v=", "embed/");
    }
    return url;
  };
  
  return (
    <div className="my-10">
      <h1 className="text-center text-[28px] md:text-[30px] lg:text-[40px] font-[500] pb-5">
        {t("feedback.title")}
      </h1>
      <div className="container max-lg:w-[90vw] mx-auto grid max-sm:grid-cols-1 max-md:grid-cols-2 max-2xl:grid-cols-3 grid-cols-4 gap-20 max-lg:gap-10">
        {videos?.map((item, index) => (
          <iframe
            key={index}
            src={getEmbedUrl(item.video)}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-[400px] border rounded-lg"
          ></iframe>
        ))}
      </div>
      <div className="w-full flex justify-center mt-5">
        <NavLink to={"/feedback"} className={"text-center btn btn-card"}>{t("Global.more")}</NavLink>
      </div>
    </div>
  );
};

export default Feedback;