import{ useEffect } from "react"; // Import useEffect
import PropTypes from "prop-types";
import ReactPlayer from "react-player/youtube"; // Optimized for YouTube only

const DataVideo = ({ videoUrl }) => {
  // Scroll to the top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto my-20 h-[40vh] md:h-[30vh] lg:h-[60vh]">
      <h1 className="text-[20px] md:text-[35px] lg:text-[40px] text-center my-5">
        Foydalanish tartibi
      </h1>
      <div className="mx-auto h-full flex justify-center items-center">
        <ReactPlayer
          url={videoUrl}
          controls={true}
          playing={false}
          width="95%"
          height="100%"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

DataVideo.propTypes = {
  videoUrl: PropTypes.string.isRequired, // videoUrl must be a string and is required
};

export default DataVideo;
