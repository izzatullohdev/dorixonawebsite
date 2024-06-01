import { useParams } from "react-router-dom";
import { useContext } from "react";
import PropTypes from "prop-types";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import DataVideo from "./DataVideo";
import { dataContext } from "../../useContext/DataContext"; // Ensure correct path to DataContext

const ProductPage = () => {
  const { id } = useParams(); // Retrieve the dynamic ID from the route

  const { headerData } = useContext(dataContext); // Assuming products is available in the context and contains all required data
  const datapage = headerData.find((product) => product.id === Number(id));

  if (!datapage) {
    return <div>Product not found</div>; // Handling case where no product matches the ID
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center py-10 px-5">
        <div className="w-[50%] md:w-[50%] lg:w-[40%]">
          <h1 className="text-[20px] md:text-[25px] lg:text-[40px]">
            {datapage.name}
          </h1>
          <p className="my-5 md:leading-7 lg:leading-10 text-[10px] md:text-[18px] ">
            {datapage.body}
          </p>
          <p className="font-bold text-[18px] md:text-[20px] lg:text-[30px] my-3">
            {datapage.sum} sum
          </p>
          <button className="btn text-[14px] md:text-[16px] lg:text-[17px]">
            Sotib Olish
          </button>
        </div>
        <div className="w-[45%] md:w-[40%] lg:w-[25%]">
          <img src={datapage.picture} alt={datapage.name} className="w-full" />
        </div>
      </div>
      <div className="flex items-center justify-between my-5 md:my-8 lg:my-10 border-t py-5 px-4">
        <div className="text-center">
          <h1 className="text-[16px] md:text-[25px] lg:text-[30px]">Turi</h1>
          <h1 className="text-[16px] md:text-[27px] lg:text-[40px]">
            {datapage.turi}
          </h1>
        </div>
        <div className="text-center">
          <h1 className="text-[16px] md:text-[25px] lg:text-[30px]">
            Yaroqlilik muddati
          </h1>
          <h1 className="text-[16px] md:text-[27px] lg:text-[40px]">
            {datapage.data}
          </h1>
        </div>
        <div className="text-center">
          <h1 className="text-[16px] md:text-[25px] lg:text-[30px]">Reyting</h1>
          <Rater
            className="text-[16px] md:text-[27px] lg:text-[40px] flex"
            total={5}
            rating={datapage.start}
            interactive={false}
          />
        </div>
      </div>
      <div className="container mx-auto my-5 md:my-10 lg:my-20 p-3">
        <h1 className="text-center text-[20px] md:text-[25px] lg:text-[30px] my-2 md:my-3 lg:my-5">
          Tarkibi
        </h1>
        <p className="text-[14px] md:text-[16px] lg:text-[18px] text-justify leading-5 md:leading-7 lg:leading-10">
          {datapage.tarkibi}
        </p>
        <div>
          {/* Assuming DataVideo handles the video rendering based on the passed URL */}
          <DataVideo videoUrl={datapage.videoUrl} />
        </div>
      </div>
    </div>
  );
};

ProductPage.propTypes = {
  // Define propTypes for the expected structure of 'datapage', ensure this matches how data is structured in your context
  datapage: PropTypes.shape({
    id: PropTypes.string.isRequired, // Ensure there's an ID if it's used for routing
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    sum: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
    turi: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    tarkibi: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired, // Ensure all props are correctly typed
  }).isRequired,
};

export default ProductPage;
