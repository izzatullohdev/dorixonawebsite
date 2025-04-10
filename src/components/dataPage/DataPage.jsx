import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/product";
import { useEffect } from "react";
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons";

const DataPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.produts);
  
  useEffect(() => {   
    dispatch(getProduct());
  }, [dispatch]);
  
  if (status === "loading") return 
  <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  </div>

  if (status === "failed") return <p className="text-red-500 text-center my-5">Xatolik: {error}</p>;

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center py-10 px-5">
        <div className="w-[50%] md:w-[50%] lg:w-[40%]">
          <h1 className="text-[20px] md:text-[25px] lg:text-[40px]">
            {product.name}
          </h1>
          <p className="my-5 md:leading-7 lg:leading-10 text-[10px] md:text-[18px] ">
            {product.body}
          </p>
          <p className="font-bold text-[18px] md:text-[20px] lg:text-[30px] my-3">
            {product.sum} sum
          </p>
          <button className="btn text-[14px] md:text-[16px] lg:text-[17px]">
            Sotib Olish
          </button>
        </div>
        <div className="w-[45%] md:w-[40%] lg:w-[25%]">
          <img src={product.picture} alt={product.name} className="w-full" />
        </div>
      </div>
      <div className="flex items-center justify-between my-5 md:my-8 lg:my-10 border-t py-5 px-4">
        <div className="text-center">
          <h1 className="text-[16px] md:text-[25px] lg:text-[30px]">Turi</h1>
          <h1 className="text-[16px] md:text-[27px] lg:text-[40px]">
            {product.turi}
          </h1>
        </div>
        <div className="text-center">
          <h1 className="text-[16px] md:text-[25px] lg:text-[30px]">
            Yaroqlilik muddati
          </h1>
          <h1 className="text-[16px] md:text-[27px] lg:text-[40px]">
            {product.data}
          </h1>
        </div>
        <div className="text-center">
          <h1 className="text-[16px] md:text-[25px] lg:text-[30px]">Reyting</h1>
          <Rater
            className="text-[16px] md:text-[27px] lg:text-[40px] flex"
            total={5}
            rating={product.start}
            interactive={false}
          />
        </div>
      </div>
      <div className="container mx-auto my-5 md:my-10 lg:my-20 p-3">
        <h1 className="text-center text-[20px] md:text-[25px] lg:text-[30px] my-2 md:my-3 lg:my-5">
          Tarkibi
        </h1>
        <p className="text-[14px] md:text-[16px] lg:text-[18px] text-justify leading-5 md:leading-7 lg:leading-10">
          {product.tarkibi}
        </p>
      </div>
    </div>
  );
};

DataPage.propTypes = {
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

export default DataPage;
