import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { DownOutlined } from "@ant-design/icons";

const languages = [
  { code: "uz", fullLabel: "UZB", shortLabel: "UZB", flag: "🇺🇿" },
  { code: "ru", fullLabel: "RUS", shortLabel: "RUS", flag: "🇷🇺" },
  { code: "en", fullLabel: "ENG", shortLabel: "ENG", flag: "🇬🇧" },
];

const Translation = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("uz");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleChange = (selectedLang) => {
    setLang(selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center justify-center p-2" style={{ backgroundColor: "#354F52" }}>
      <Select
        value={lang}
        onChange={handleChange}
        className="custom-select"
        popupClassName="custom-dropdown"
        style={{
          backgroundColor: "#354F52",
          color: "white",
          border: "none",
          width: "95px",
        }}
        dropdownStyle={{
          backgroundColor: "#354F52",
          color: "white",
        }}
        options={languages.map(({ code, fullLabel, shortLabel, flag }) => ({
          value: code,
          label: (
            <div className="flex items-center gap-2 text-white">
              <span>{flag}</span>
              <span>{isMobile ? shortLabel : fullLabel}</span>
            </div>
          ),
          style: {
            backgroundColor: "#354F52",
            color: "white",
          },
        }))}
        suffixIcon={<DownOutlined style={{ color: "white" }} />}
      />
    </div>
  );
};

export default Translation;