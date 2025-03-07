import { useContext } from "react";
import { dataContext } from "../../useContext/DataContext";

const Feedback = () => {
  const { videos } = useContext(dataContext);

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

  console.log(videos);
  return (
    <div className="my-10">
      <h1 className="text-center font-medium text-[28px] pb-5">Feedback</h1>
      <div className="container max-lg:w-[90vw] mx-auto grid max-sm:grid-cols-1 max-md:grid-cols-2 max-xl:grid-cols-3 grid-cols-4 gap-8 max-lg:gap-5">
        {videos?.map((item, index) => (
          <iframe
            key={index}
            src={getEmbedUrl(item.video)}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-[500px] border rounded-lg"
          ></iframe>
        ))}
      </div>
    </div>
  );
};

export default Feedback;