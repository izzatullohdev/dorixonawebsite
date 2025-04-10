import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getSwiper } from "../../store/swiper_pills";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Modal, Input } from "antd";

const { TextArea } = Input;

// HTML entity ni oddiy matnga aylantiruvchi funksiya
const decodeHTML = (html) => {
  const parser = new DOMParser();
  const decoded = parser.parseFromString(html, "text/html");
  return decoded.body.textContent || "";
};

const SwiperHome = () => {
  const uzbFlag = "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026022/flag_vdivbv.jpg";
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { swiper, status, error } = useSelector((state) => state.swiper);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [phone, setPhone] = useState("+998");

  useEffect(() => {
    dispatch(getSwiper());
  }, [dispatch]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.startsWith("+998") && value.length <= 13) {
      setPhone(value);
    }
  };

  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (status === "loading")
    return (
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );

  if (status === "failed") return <p className="text-red-500 text-center my-5">Xatolik: {error}</p>;

  return (
    <>
      <Swiper
        pagination={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="container mx-auto h-[70vh] min-h-[70vh] md:h-[60vh] lg:h-[70vh]"
      >
        {swiper?.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex justify-between items-center max-md:flex-col-reverse p-2"
          >
            <div className="w-[50%] max-md:w-full">
              <h1 className="text-[20px] md:text-[32px] lg:text-[72px] leading-[35px] md:leading-[45px] lg:leading-[72px]">
                {
                  i18n.language === "uz"
                    ? item.name_uz
                    : i18n.language === "ru"
                    ? item.name_ru
                    : item.name_en
                }
              </h1>
              <p className="py-5 text-[14px] md:text-[18px] leading-relaxed">
                {decodeHTML(
                  i18n.language === "uz"
                    ? item.body_uz
                    : i18n.language === "ru"
                    ? item.body_ru
                    : item.body_en
                )}
              </p>
              <button
                className="btn cursor-pointer"
                onClick={() => showModal(item)}
              >
                {t("purchase.purchase")}
              </button>
            </div>
            <div className="w-[55%] md:w-[40%] overflow-hidden rounded-xl">
              <img src={item.picture} alt="" className="w-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
              <p className="py-2">
                {decodeHTML(
                  i18n.language === "uz"
                    ? selectedProduct.body_uz.slice(0, 125)
                    : i18n.language === "ru"
                    ? selectedProduct.body_ru.slice(0, 125)
                    : selectedProduct.body_en.slice(0, 125)
                )}...
              </p>
            </div>
          )}

          <div className="w-[500px] max-md:w-[80vw] flex flex-col items-center justify-center rounded-lg">
            <h1 className="text-center font-medium text-[25px] mb-3">Register form</h1>
            <form className="w-full flex flex-col items-center gap-3">
              <Input placeholder={t("register.name")} className="text-[17px]" />
              <Input
                value={phone}
                onChange={handlePhoneChange}
                className="text-[17px]"
                prefix={<img src={uzbFlag} alt="UZB" className="w-7 h-5 rounded-sm" />}
              />
              <TextArea placeholder={t("register.message")} rows={4} className="text-[17px]" />
              <button className="w-full bg-[#354f52] text-[#EECB98] font-medium rounded-md px-12 mt-2 py-2">
                {t("register.button")}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SwiperHome;