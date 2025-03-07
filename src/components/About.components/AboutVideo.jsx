import PropTypes from "prop-types";
import ReactPlayer from "react-player/youtube"; // Optimized for YouTube only

const AboutVideo = ({ videoUrl }) => {
  return (
    <div className="container mx-auto my-20 h-[40vh] mdLh-[30vh] lg:h-[60vh]">
      <h1 className="text-[25px] md:text-[35px] lg:text-[40px] text-center my-5">
        Mahsulot tayyorlanishidan lavhalar
      </h1>
      <div className="mx-auto h-[100%] md:h-[100%] lg:h-[95%] flex justify-center items-center">
        <ReactPlayer
          url={videoUrl}
          controls={true}
          playing={false}
          width="95%" // Set width to 100% and control it with the parent container
          height="100%"
          className="w-full h-full" // Ensure full width and height in the parent container
          // Maximum width to prevent the video from becoming too large on wider screens
        />
      </div>
    </div>
  );
};

AboutVideo.propTypes = {
  videoUrl: PropTypes.string.isRequired, // videoUrl must be a string and is required
};

export default AboutVideo;
