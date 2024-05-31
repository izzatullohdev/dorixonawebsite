// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// data
import { useContext, useState, useEffect } from "react";
import { dataContext } from "../../useContext/DataContext";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Product = () => {
  const { t } = useTranslation();
  const { products, setDataPage } = useContext(dataContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterType, setFilterType] = useState("global");

  useEffect(() => {
    if (filterType === "global") {
      setFilteredProducts(products.filter((product) => product.start > 3)); // Adjust the condition as per your requirements
    } else {
      setFilteredProducts(products.filter((product) => product.start <= 5)); // Adjust the condition as per your requirements
    }
  }, [filterType, products]);
  const handlePage = (page) => {
    setDataPage(page);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center my-3">
        <h1 className="text-[28px] md:text-[30px] lg:text-[40px] font-[500]">
          {t("product.name")}
        </h1>
        <p className="my-2 text-[18px] md:text-[20px] lg:text-[20px] ">
          <b>100 000 {t("product.sena")}</b>
          {t("product.body")}
        </p>
        <div className="btns flex item-center justify-center gap-10">
          <button
            className={`text-[16px] md:text-[20px] lg:text-[20px] px-12 py-4 border-b ${
              filterType === "global" ? "border-cyan-600" : ""
            }`}
            onClick={() => setFilterType("global")}
          >
            {t("product.reacting")}
          </button>
          <button
            className={`text-[16px] md:text-[20px] lg:text-[20px] px-12 py-4 border-b ${
              filterType === "reacting" ? "border-cyan-600" : ""
            }`}
            onClick={() => setFilterType("reacting")}
          >
            {t("product.global")}
          </button>
        </div>
      </div>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          // when window width is >= 640px
          0: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
          },
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="h-[40vh]"
      >
        {filteredProducts?.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="w-[80%] border p-5 rounded-md flex justify-center items-center flex-col">
              <img src={product.picture} className="w-[150px]" alt="" />
              <h1 className="my-2 font-[500]">{product.name}</h1>
              <p>
                {product.sum} {t("product.productSena")}
              </p>
              <NavLink
                to="/datapage"
                className="btn px-10 py-2 text-[15px] rounded-md"
                onClick={() => handlePage(product)}
              >
                {t("Global.button")}
              </NavLink>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Product;
