import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/product";
import { useTranslation } from "react-i18next";
import "react-rater/lib/react-rater.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
// import DataVideo from "./DataVideo";
// import Rater from "react-rater";

const ProductPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  if (status === "loading") return (
    <div className="min-h-[70vh]">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    </div>
  );

  if (status === "failed") return <p>Xatolik: {error}</p>;

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return <div>Mahsulot topilmadi</div>;
  }

  return (
    <div className="container mx-auto min-h-[60vh]">
      <div className="flex justify-between items-center py-10 px-5">
        <div className="w-[50%] md:w-[50%] lg:w-[40%]">
          <h1 className="text-[20px] md:text-[25px] lg:text-[40px]">
          {  
            i18n.language === "uz"
            ? product.name_uz
            : i18n.language === "ru"
            ? product.name_ru
            : product.name_en
          }
          </h1>
          {/* <p className="my-5 md:leading-7 lg:leading-10 text-[10px] md:text-[18px]">
            {product.body}
          </p> */}
          {/* <p className="font-bold text-[18px] md:text-[20px] lg:text-[30px] my-3">
            {product.sum} sum
          </p> */}
          <button className="btn text-[14px] md:text-[16px] lg:text-[17px] cursor-pointer">
            {t("purchase.purchase")}
          </button>
        </div>
        <div className="w-[45%] md:w-[40%] lg:w-[25%]">
          <img src={product.picture} alt={product.name} className="w-full" />
        </div>
      </div>
      {/* <div className="flex items-center justify-between my-5 md:my-8 lg:my-10 border-t py-5 px-4">
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
        <div>
          <DataVideo videoUrl={product.videoUrl} />
        </div>
      </div> */}
    </div>
  );
};

export default ProductPage;