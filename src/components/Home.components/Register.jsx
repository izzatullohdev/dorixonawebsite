import { useState, useEffect } from "react";
import { Input, Spin, Alert } from "antd";
import { useTranslation } from "react-i18next";
import { message as antdMessage } from "antd";
import { useDispatch } from "react-redux";
import { sendOffer } from "../../store/offer"; // Redux'dan import

const { TextArea } = Input;

const Register = () => {
  const uzbFlag = "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026022/flag_vdivbv.jpg";
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("+998");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.startsWith("+998")) {
      setPhone(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname || !phone || !message || phone.length < 13) {
      antdMessage.error("Iltimos, barcha maydonlarni to‘ldiring.");
      setAlertType("error");
      return;
    }

    if (!/^\+998\d{9}$/.test(phone)) {
      setAlertMessage(
        "Telefon raqam +998 bilan boshlanishi va 9 ta raqamdan iborat bo‘lishi kerak."
      );
      setAlertType("error");
      return;
    }

    // Redux orqali action yuborish
    setLoading(true);

    const data = {
      fullname,
      phone_number: phone,
      message,
    };

    try {
      const response = await dispatch(sendOffer(data)); // sendOffer Redux action'ini chaqirish

      if (response.meta.requestStatus === "fulfilled") {
        antdMessage.success("Xabar muvaffaqiyatli yuborildi!");
        setAlertType("success");

        // Reset form fields
        setFullname("");
        setPhone("+998");
        setMessage("");
      } else {
        antdMessage.error("Xabar yuborishda xatolik yuz berdi.");
        setAlertType("error");
      }
    } catch (error) {
      antdMessage.error("Xabar yuborishda xatolik yuz berdi.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-center text-[28px] md:text-[30px] lg:text-[40px] font-[500] pb-5">
        {t("register.title") || "Ro‘yxatdan o‘tish"}
      </h1>

      {alertMessage && (
        <div className="w-[600px] max-md:w-[90vw] mx-auto my-5">
          <Alert message={alertMessage} type={alertType} showIcon />
        </div>
      )}

      <div className="container mx-auto flex items-center justify-center rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="w-[600px] max-md:w-[90vw] flex flex-col items-center gap-3"
        >
          <Input
            type="text"
            placeholder={t("register.name") || "Ism Familiya"}
            className="text-[17px]"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <Input
            type="text"
            placeholder={t("register.phone") || "Telefon raqam"}
            value={phone}
            onChange={handlePhoneChange}
            className="text-[17px]"
            prefix={
              <img
                src={uzbFlag}
                alt="UZB"
                className="w-7 h-5 rounded-sm"
              />
            }
          />
          <TextArea
            placeholder={t("register.message") || "Xabaringiz"}
            rows={4}
            className="text-[17px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="w-full text-[#EECB98] font-medium bg-[#354f52] rounded-md px-12 mt-2 py-2 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <Spin size="small" className="text-[#EECB98]" />
            ) : (
              t("register.button") || "Yuborish"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;