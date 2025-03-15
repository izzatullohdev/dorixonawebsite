import { useContext, useState, useEffect } from "react";
import { dataContext } from "../../useContext/DataContext";
import { useTranslation } from "react-i18next";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const Korzinka = () => {
  const { products } = useContext(dataContext);
  const { t } = useTranslation();
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // LocalStorage dan cart idlarini olish
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Cart ichidagi idlarga mos kelgan productlarni topish
    const filteredProducts = products?.filter((product) =>
      cart.includes(product.id)
    );
    setCartProducts(filteredProducts);
  }, [products]);

  const handleCart = (id) => {
    // LocalStorage dan cart ma'lumotlarini olish
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ID ni filter yordamida olib tashlash
    const updatedCart = cart.filter((itemId) => itemId !== id);

    // Yangilangan cart ni localStorage ga qayta yozish
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // State ni yangilash (UI dan ham olib tashlaymiz)
    setCartProducts(cartProducts.filter((product) => product.id !== id));
  };

  return (
    <div className="container min-h-[50vh] mx-auto my-10">
      <h1 className="text-[25px] font-semibold text-center mb-5">
        Siz tanlagan mahsulotlar
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 lg:gap-10 p-2">
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => (
            <div
              key={product.id}
              className="border p-5 rounded-md border-stone-300 flex justify-center items-center flex-col"
            >
              <img
                src={product.picture}
                className="w-[70px] md:w-[100px] lg:w-[150px]"
                alt={product.name}
              />
              <h1 className="mt-2 font-[500] text-[18px] md:text-[20px] lg:text-[20px]">
                {product.name}
              </h1>
              <p className="text-[16px] md:text-[18px] lg:text-[20px] my-1">
                {product.sum} {t("product.productSena")}
              </p>
              <div className="flex items-center gap-3">
                <button className="btn px-10 py-2 text-[15px] rounded-md">
                  {t("Global.button")}
                </button>
                <button
                  className="bg-[#354f52] rounded-md px-2 py-2"
                  onClick={() => handleCart(product.id)}
                >
                  <MdOutlineRemoveShoppingCart className="text-[22px] text-[#f2ce9a]" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-500">
            Savatcha bo‘sh!
          </p>
        )}
      </div>
    </div>
  );
};

export default Korzinka;