import SwiperHome from "../../components/Home.components/SwiperHome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../store/product";
import { createOrder } from "../../store/order"; // ✅ buyurtma
import { useTranslation } from "react-i18next";
import AboutVideo from "../../components/About.components/AboutVideo";
import { MdAddShoppingCart } from "react-icons/md";
import { Spin, Modal, Input, message as AntMessage } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const Products = () => {
  const uzbFlag = "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026022/flag_vdivbv.jpg";

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("+998");
  const [userMessage, setUserMessage] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const videoUrl = "https://www.youtube.com/watch?v=DttV5GCdEMc";

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.startsWith("+998") && value.length <= 13) {
      setPhone(value);
    }
  };

  const handleCart = (id) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.includes(id)
        ? prevCartItems.filter((itemId) => itemId !== id)
        : [...prevCartItems, id];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!fullname || !phone || !userMessage) {
      AntMessage.error("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    setBtnLoading(true);

    try {
      await dispatch(
        createOrder({
          fullname,
          phone_number: phone,
          message: userMessage,
          pill_id: selectedProduct?.id,
        })
      ).unwrap();

      AntMessage.success("Buyurtma muvaffaqiyatli yuborildi!");
      setIsModalVisible(false);
      setFullname("");
      setPhone("+998");
      setUserMessage("");
    } catch (err) {
      AntMessage.error("Buyurtma yuborishda xatolik yuz berdi!");
    } finally {
      setBtnLoading(false);
    }
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
    <>
      <SwiperHome />
      <div className="container max-md:w-[90vw] mx-auto my-5">
        <div className="grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 gap-5 md:gap-10 lg:gap-10 p-2">
          {products.map((product) => (
            <div key={product.id}>
              <div className="border p-5 rounded-md flex justify-center items-center flex-col">
                <img src={product.picture} className="w-[150px] h-[100px]" alt={product.name} />
                <h1 className="text-xl my-2 font-semibold">
                  {i18n.language === "uz"
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
                <div className="flex items-center gap-3 mt-2">
                  <button className="btn px-10 py-2 text-[15px] rounded-md" onClick={() => showModal(product)}>
                    {t("purchase.purchase")}
                  </button>
                  <button
                    className={`bg-[#354f52] rounded-md px-2 py-2 ${cartItems.includes(product.id) ? "hidden" : ""}`}
                    onClick={() => handleCart(product.id)}
                  >
                    <MdAddShoppingCart className="text-[22px] text-[#f2ce9a]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={900}
          centered
        >
          <div className="flex max-md:flex-col items-center justify-center gap-10 p-10">
            {selectedProduct && (
              <div className="w-[450px] max-md:w-[80vw] flex flex-col items-center justify-center">
                <img src={selectedProduct.picture} alt={selectedProduct.name} className="w-[60%] object-cover" />
                <h1 className="mt-3 text-[20px] font-[500]">
                  {i18n.language === "uz"
                    ? selectedProduct.name_uz
                    : i18n.language === "ru"
                    ? selectedProduct.name_ru
                    : selectedProduct.name_en
                  }
                </h1>
                <p className="py-2"><strong>Narxi:</strong> {selectedProduct.price} {t("product.productSena")}</p>
                <p className="w-[90%]">
                {
                  i18n.language === "uz"
                  ? selectedProduct.information_uz.slice(0, 100)
                  : i18n.language === "ru"
                  ? selectedProduct.information_ru.slice(0, 100)
                  : selectedProduct.information_en.slice(0, 100)
                }...
              </p>
              </div>
            )}
            <div className="w-[500px] max-md:w-[80vw] flex flex-col items-center justify-center rounded-lg">
              <h1 className="text-center font-medium text-[25px] mb-3">{t('purchase.purchase')}</h1>
              <form className="w-full flex flex-col items-center gap-3" onSubmit={handleOrderSubmit}>
                <Input
                  type="text"
                  placeholder={t("register.name")}
                  className="text-[17px]"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder={t("register.phone")}
                  value={phone}
                  onChange={handlePhoneChange}
                  className="text-[17px]"
                  prefix={<img src={uzbFlag} alt="UZB" className="w-7 h-5 rounded-sm" />}
                />
                <TextArea
                  placeholder={t("register.message")}
                  rows={4}
                  className="text-[17px]"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full text-[#EECB98] font-medium bg-[#354f52] rounded-md px-12 mt-2 py-2 flex items-center justify-center"
                  disabled={btnLoading}
                >
                  {btnLoading ? <LoadingOutlined spin /> : t("register.button")}
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