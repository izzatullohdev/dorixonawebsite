import SwiperHome from "../../components/Home.components/SwiperHome";
import { useContext, useEffect, useState } from "react";
import { dataContext } from "../../useContext/DataContext";
import { useTranslation } from "react-i18next";
import AboutVideo from "../../components/About.components/AboutVideo";
import { MdAddShoppingCart } from "react-icons/md";
import { Modal, Input } from "antd";
const { TextArea } = Input;

const Products = () => {
  const uzbFlag = "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026022/flag_vdivbv.jpg";
  const { t } = useTranslation();
  const { products } = useContext(dataContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("imunitet");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [phone, setPhone] = useState("+998");
  
    const handlePhoneChange = (e) => {
      if (e.target.value.startsWith("+998")) {
        setPhone(e.target.value);
      }
    };
  const videoUrl = "https://www.youtube.com/watch?v=DttV5GCdEMc";

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          Array.isArray(product.int) && product.int.includes(category)
      )
    );
  }, [category, products]);

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

  // Modalni ochish funksiyasi
  const showModal = (product) => {
    setSelectedProduct(product); // Tanlangan mahsulotni saqlash
    setIsModalVisible(true); // Modalni ochish
  };

  // Modalni yopish funksiyasi
  const handleCancel = () => {
    setIsModalVisible(false); // Modalni yopish
  };

  return (
    <>
      <SwiperHome />
      <div className="container mx-auto my-5">
        <div className="flex items-center gap-5 md:gap-7 lg:gap-10 m-5 mg:my-10 lg:my-10">
          {["imunitet", "erkaklar", "ayollar", "bolalar", "keksalar"].map(
            (cat) => (
              <button
                key={cat}
                className={`text-[15px] md:text-[20px] lg:text-[25px] ${
                  category === cat
                    ? "border-b border-[#354F52]"
                    : "text-[#354F52]"
                }`}
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
              <div className="flex items-center gap-3">
                <button 
                  className="btn px-10 py-2 text-[15px] rounded-md"
                  onClick={() => showModal(product)} // Modalni ochish
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
          ))}
        </div>
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
              <form className="w-full flex flex-col items-center gap-3">
                <Input type="text" placeholder={t("register.name")} className="text-[17px]" />
                 <Input
                   type="text"
                   placeholder={t("register.phone")}
                   value={phone}
                  onChange={handlePhoneChange}
                   className="text-[17px]"
                   prefix={<img src={uzbFlag} alt="UZB" className="w-7 h-5 rounded-sm" />}
                />
                 <TextArea placeholder={t("register.message")} rows={4} className="text-[17px]" />
                 <button className="w-full text-[#EECB98] font-medium bg-[#354f52] rounded-md px-12 mt-2 py-2">
                  {t("register.button")}
                </button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
      <AboutVideo videoUrl={videoUrl} />
    </>
  );
};

export default Products;