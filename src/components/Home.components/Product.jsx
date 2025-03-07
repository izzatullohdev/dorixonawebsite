import React, { useContext, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { dataContext } from "../../useContext/DataContext";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { MdAddShoppingCart } from "react-icons/md";
import { Modal, Input } from "antd";
const { TextArea } = Input;

const Product = () => {
  const { t } = useTranslation();
  const { products, setDataPage } = useContext(dataContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterType, setFilterType] = useState("global");
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (filterType === "global") {
      setFilteredProducts(products.filter((product) => product.start > 3));
    } else {
      setFilteredProducts(products.filter((product) => product.start <= 5));
    }
  }, [filterType, products]);

  const handleCart = (id) => {
    let updatedCart;
    if (cartItems.includes(id)) {
      updatedCart = cartItems.filter((itemId) => itemId !== id);
    } else {
      updatedCart = [...cartItems, id];
    }
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
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
              <div className="flex items-center gap-3 mt-2">
                <button 
                  className="btn px-10 py-2 text-[15px] rounded-md"
                  onClick={() => showModal(product)}
                >
                  {t("Global.button")}
                </button>
                <button
                  className={`bg-[#354f52] rounded-md px-2 py-2 ${
                    cartItems.includes(product.id) ? "hidden" : ""
                  }`}
                  onClick={() => handleCart(product.id)}
                >
                  <MdAddShoppingCart className="text-[22px] text-[#f2ce9a]" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Ant Design Modal */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={900}
        centered
      >
        <div className="flex max-md:flex-col items-center justify-center gap-10 p-10">
        {selectedProduct && (
          <div className="w-[450px] max-md:w-[80vw] flex flex-col items-center justify-center">
            <img
              src={selectedProduct.picture}
              alt={selectedProduct.name}
              className="w-[60%] object-cover"
            />
            <h1 className="mt-3 text-[20px] font-[500]">
              {selectedProduct.name}
            </h1>
            <p className="py-2">
              <strong>Narxi:</strong> {selectedProduct.sum}{" "}
              {t("product.productSena")}
            </p>
            <p>
              <strong>Qo'shimcha ma'lumot:</strong> 
              {selectedProduct.body.slice(0, 120)}...
            </p>
          </div>
        )}
        <div className="w-[500px] max-md:w-[80vw] flex flex-col items-center justify-center rounded-lg">
          <h1 className="text-center font-medium text-[25px] mb-3">Register form</h1>
          <form action="" className="w-full flex flex-col items-center gap-3">
            <Input type="text" placeholder="Name" className="text-[17px]"/>
            <Input type="email" placeholder="Email" className="text-[17px]"/>
            <TextArea placeholder="Your message..." rows={4} className="text-[17px]"/>
            <button className="w-full text-[#EECB98] font-medium bg-[#354f52] rounded-md px-12 mt-2 py-2">Submit</button>
          </form>
        </div>
        </div>
      </Modal>
    </div>
  );
};

export default Product;