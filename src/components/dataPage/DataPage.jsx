import { useParams } from "react-router-dom";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPills } from "../../store/pills_id";
import { Spin, Modal, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
const { TextArea } = Input;

// HTML entity ni oddiy matnga aylantiruvchi funksiya
const decodeHTML = (html) => {
  const parser = new DOMParser();
  const decoded = parser.parseFromString(html, "text/html");
  return decoded.body.textContent || "";
};

const DataPage = () => {
  const { i18n } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pill, status, error } = useSelector((state) => state.pills);

  const uzbFlag = "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026022/flag_vdivbv.jpg";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [phone, setPhone] = useState("+998");

  useEffect(() => {
    if (id) {
      dispatch(getPills(id));
    }
  }, [dispatch, id]);

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

  console.log(pill);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
      </div>
    );
  }

  if (status === "failed") {
    return <p className="text-center text-red-500 my-10">{error}</p>;
  }

  if (!pill) {
    return <p className="text-center my-10">
      {error ? error : "No data found"}
    </p>;
  }

  return (
    <>
    <div className="container mx-auto my-20">
      <div className="flex justify-between items-center py-10 px-5">
        <div className="w-[50%] md:w-[50%] lg:w-[40%]">
          <h1 className="font-semibold text-[20px] md:text-[25px] lg:text-[40px]">
            {
              i18n.language === "uz"
              ? pill.name_uz
              : i18n.language === "ru"
              ? pill.name_ru
              : pill.name_en
            }
          </h1>
          <p className="my-5 md:leading-7 lg:leading-10 text-[10px] md:text-[18px]">
            {decodeHTML(
              i18n.language === "uz"
              ? pill.body_uz
              : i18n.language === "ru"
              ? pill.body_ru
              : pill.body_en
            )}
          </p>
          <p className="font-medium text-[18px] md:text-[20px] lg:text-[30px] my-3">
            {pill.price} {t("product.sena")}
          </p>
          <button
            className="btn text-[14px] md:text-[16px] lg:text-[17px]"
            onClick={() => showModal(pill)}
          >
            {t("purchase.purchase")}
          </button>
        </div>
        <div className="w-[50%] md:w-[40%] lg:w-[25%]">
          <img src={pill.picture} alt="" />
        </div>
      </div>
      <div className="flex items-center justify-between my-10 md:my-8 lg:my-10 border-t py-5 px-4">
        <div className="text-center">
          <h1 className="text-[16px] md:text-[25px] lg:text-[30px]">{t("Global.type")}</h1>
          <h1 className="text-[16px] md:text-[25px] lg:text-[30px]">
            {
              i18n.language === "uz"
              ? pill.type_uz
              : i18n.language === "ru"
              ? pill.type_ru
              : pill.type_en
            }
          </h1>
        </div>
        <div className="text-center">
          <h1 className="text-[16px] md:text-[25px] lg:text-[30px] capitalize">{t("Global.rating")}</h1>
          <Rater
            className="text-[16px] md:text-[27px] lg:text-[40px] flex"
            total={5}
            rating={pill.rank}
            interactive={false}
          />
        </div>
      </div>
    </div>
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
    </>
  );
};

export default DataPage;