import SwiperHome from "../../components/Home.components/SwiperHome";
import { useContext, useEffect, useState } from "react";
import { dataContext } from "../../useContext/DataContext";
import { useTranslation } from "react-i18next";
import AboutVideo from "../../components/About.components/AboutVideo";
import { NavLink } from "react-router-dom";

const Products = () => {
  const { t } = useTranslation();
  const { products } = useContext(dataContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("imunitet");
  const videoUrl = "https://www.youtube.com/watch?v=DttV5GCdEMc"; // YouTube video URL

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          Array.isArray(product.int) && product.int.includes(category)
      )
    );
  }, [category, products]);

  const getButtonStyle = (buttonCategory) => {
    return category === buttonCategory
      ? "text-[15px] md:text-[20px] lg:text-[25px] border-b border-[#354F52]"
      : "text-[15px] md:text-[20px] lg:text-[25px] text-[#354F52]";
  };

  return (
    <>
      <SwiperHome />
      <div className="container mx-auto my-5">
        <div className="flex items-center gap-5 md:gap-7  lg:gap-10 m-5 mg:my-10 lg:my-10">
          {["imunitet", "erkaklar", "ayollar", "bolalar", "keksalar"].map(
            (cat) => (
              <button
                key={cat}
                className={getButtonStyle(cat)}
                onClick={() => setCategory(cat)}
              >
                {t(`category.${cat}`)}
              </button>
            )
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 lg:gap-10 p-2">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-5 rounded-md border-stone-300 flex justify-center items-center flex-col"
            >
              <img
                src={product.picture}
                className="w-[70px] md:w-[100px] lg:w-[150px]"
                alt=""
              />
              <h1 className="mt-2 font-[500] text-[18px] md:text-[20px] lg:text-[20px]">
                {product.name}
              </h1>
              <p className="text-[16px] md:text-[18px] lg:text-[20px] my-1">
                {product.sum} {t("product.productSena")}
              </p>
              <NavLink
                to={`/datapage/${product.id}`}
                className="btn px-10 py-2 text-[15px] rounded-md"
              >
                {t("Global.button")}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <AboutVideo videoUrl={videoUrl} />
    </>
  );
};

export default Products;
