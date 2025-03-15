import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { dataContext } from "../../useContext/DataContext"

const Feedback = () => {
  const { t } = useTranslation()
  const { videos } = useContext(dataContext)
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
    <div className="container min-h-[40vh] mx-auto my-10">
      <h1 className="text-[25px] font-semibold text-center mb-5">
        {t("feedback.title")}
      </h1>
      <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 max-2xl:grid-cols-3 grid-cols-4 gap-20 max-lg:gap-5 p-2">
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
    </div>
  )
}

export default Feedback