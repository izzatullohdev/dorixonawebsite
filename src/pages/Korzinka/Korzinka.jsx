import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Input, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/product";
const { TextArea } = Input;

const Korzinka = () => {
  const uzbFlag = "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026022/flag_vdivbv.jpg";
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [cartProducts, setCartProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [phone, setPhone] = useState("+998");

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const filteredProducts = products?.filter((product) => cart.includes(product.id));
    setCartProducts(filteredProducts);
  }, [products]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.startsWith("+998") && value.length <= 13) {
      setPhone(value);
    }
  };

  // ✅ Mahsulotni savatdan olib tashlash
  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.filter((itemId) => itemId !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartProducts(cartProducts.filter((product) => product.id !== id));
  };

  // ✅ Modalni ochish va mahsulotni tanlash
  const handlePurchase = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (status === "loading") {
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (status === "failed") {
    return <p className="text-center text-red-500">{t("error")}: {error}</p>;
  }

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
              className="border p-5 rounded-md border-stone-300 flex justify-center items-center flex-col gap-2"
            >
              <img
                src={product.picture}
                className="w-[70px] md:w-[100px] lg:w-[150px]"
                alt={product.name}
              />
              <h1 className="mt-2 font-[500] text-[18px] md:text-[20px] lg:text-[20px]">
                {
                  i18n.language === "uz"
                  ? product.name_uz
                  : i18n.language === "ru"
                  ? product.name_ru
                  : product.name_en
                }
              </h1>
              <p>
                <span className="font-medium">{t("product.price")}: </span>
                <span>{product.price} </span>
                <span>{t("product.sena")}</span>
              </p>
              <div className="flex items-center gap-3">
                <button className="btn px-10 py-2 text-[15px] rounded-md" onClick={() => handlePurchase(product)}>
                  {t("purchase.purchase")}
                </button>
                <button
                  className="bg-[#354f52] rounded-md px-2 py-2"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  <MdOutlineRemoveShoppingCart className="text-[22px] text-[#f2ce9a]"/>
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

      {/* ✅ Modal (Mahsulot ma'lumotlari chiqishi) */}
      <Modal open={isModalVisible} onCancel={handleCancel} footer={null} width={900} centered>
        <div className="flex max-md:flex-col items-center justify-center gap-10 p-10">
          {selectedProduct && (
            <div className="w-[450px] max-md:w-[80vw] flex flex-col items-center justify-center">
              <img src={selectedProduct.picture} alt={selectedProduct.name} className="w-[60%] object-cover" />
              <h1 className="mt-3 text-[20px] font-[500]">
                {
                  i18n.language === "uz"
                  ? selectedProduct.name_uz
                  : i18n.language === "ru"
                  ? selectedProduct.name_ru
                  : selectedProduct.name_en
                }
              </h1>
              <p className="py-2"><strong>Narxi:</strong> {selectedProduct.price} {t("product.productSena")}</p>
            </div>
          )}
          <div className="w-[500px] max-md:w-[80vw] flex flex-col items-center justify-center rounded-lg">
            <h1 className="text-center font-medium text-[25px] mb-3">Register form</h1>
            <form className="w-full flex flex-col items-center gap-3">
              <Input placeholder={t("register.name")} className="text-[17px]" />
              <Input value={phone} onChange={handlePhoneChange} className="text-[17px]" prefix={<img src={uzbFlag} alt="UZB" className="w-7 h-5 rounded-sm" />} />
              <TextArea placeholder={t("register.message")} rows={4} className="text-[17px]" />
              <button className="w-full bg-[#354f52] text-[#EECB98] font-medium rounded-md px-12 mt-2 py-2">{t("register.button")}</button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Korzinka;