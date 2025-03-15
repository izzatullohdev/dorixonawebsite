import { useState } from "react";
import { Input } from "antd";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const Register = () => {
  const uzbFlag = "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026022/flag_vdivbv.jpg";
  const { t } = useTranslation();
  const [phone, setPhone] = useState("+998");

  const handlePhoneChange = (e) => {
    if (e.target.value.startsWith("+998")) {
      setPhone(e.target.value);
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-center text-[28px] md:text-[30px] lg:text-[40px] font-[500] pb-5">
        {t("register.title")}
      </h1>
      <div className="container mx-auto flex items-center justify-center rounded-lg">
        <form className="w-[600px] max-md:w-[90vw] flex flex-col items-center gap-3">
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
  );
};

export default Register;