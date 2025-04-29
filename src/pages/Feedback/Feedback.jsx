import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getCommentaries } from "../../store/commentaries";
import { useEffect } from "react";

const Feedback = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { commentaries, status, error } = useSelector((state) => state.commentaries);

  useEffect(() => {
    dispatch(getCommentaries());
  }, [dispatch]);

  const getEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("shorts")) {
      const videoId = url.split("/shorts/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (!url.includes("embed")) {
      return url.replace("watch?v=", "embed/");
    }

    return url;
  };

  if ((status === "succeeded" || status === "idle") && commentaries.length === 0) {
    return <div className="min-h-[60vh] text-gray-500 flex items-center justify-center">
              <h1>Hech qanday shifokor topilmadi!</h1>
           </div>
  }

  if (status === "loading") {
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (status === "failed") {
    return <p className="text-center text-red-500">{t("error")}: {error}</p>;
  }
  return (
    <div className="container min-h-[45h] mx-auto my-10">
      <h1 className="text-[25px] font-semibold text-center mb-5">
        {t("feedback.title")}
      </h1>
      <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 max-2xl:grid-cols-3 grid-cols-4 gap-20 max-lg:gap-5 p-2">
        {commentaries.map((item, index) => (
          <iframe
          key={index}
          src={getEmbedUrl(item.body)}
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