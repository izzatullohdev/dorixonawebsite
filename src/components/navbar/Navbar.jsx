import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { dataContext } from "../../useContext/DataContext";
// picture
import logo from "../../assets/logo.png";
// icons
import { FaMapLocationDot } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [lang, setLang] = useState("uz");
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { products, setDataPage } = useContext(dataContext);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    localStorage.setItem("language", lang);
  }, [lang]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLength(cart.length);
  }, []);

  const handleLanguageChange = (e) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const handlePage = (page) => {
    setDataPage(page);
    setFilteredData([]);
    setSearchQuery("");
  };

  return (
    <nav id="navbar">
      <div className="bg-[#354F52]">
        <div className="container mx-auto py-3 flex justify-between items-center">
          <img src={logo} alt="" className="w-[100px] md:w-[100px] lg:w-[130px]" />
          <ul className="text-[#fff] flex items-center gap-10">
            <li>
              <a href="" className="flex items-center gap-2 text-[14px]">
                <FaMapLocationDot /> {t("tnav.address")}
              </a>
            </li>
            <li>
              <a href="" className="flex items-center gap-2 text-[14px]">
                <FaTelegramPlane /> {t("tnav.quiz")}
              </a>
            </li>
            <li>
              <a href="" className="text-[14px]">
                {t("tnav.call")}:{" "}
                <span className="text-[#F2CE9A]">+998 73 240 00 33</span>
              </a>
            </li>
            <li className="flex items-center gap-1">
              <IoLanguage />
              <select
                name="language"
                id="language"
                className="bg-inherit"
                onChange={handleLanguageChange}
              >
                <option value="uz">uz</option>
                <option value="ru">ru</option>
                <option value="en">en</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-[#2F3E46]">
        <div className="container mx-auto py-5 flex justify-between items-center">
          <div className="max-xl:hidden"></div>
          <div className="max-xl:hidden"></div>
          <ul className="flex items-center gap-5 text-white">
            <li>
              <NavLink to="/">{t("navbar.main")}</NavLink>
            </li>
            <li>
              <NavLink to="/about">{t("navbar.about")}</NavLink>
            </li>
            <li>
              <NavLink to="/product">{t("navbar.product")}</NavLink>
            </li>
            <li>
              <NavLink to="/alldoctors">{t("navbar.doc")}</NavLink>
            </li>
            <li>
              <NavLink to="/news">{t("navbar.news")}</NavLink>
            </li>
            <li className="flex items-center justify-center gap-[3px]">
              <NavLink to="/cart">{t("navbar.cart")}</NavLink>
              {cartLength > 0 && (
                <div className="w-[16px] h-[20px] rounded-[50%] flex items-center justify-center bg-[#333] shadow shadow-[#333] text-sm">
                  {cartLength}
                </div>
              )}
            </li>
          </ul>
          <div className="search bg-white flex items-center gap-4 px-4 py-1 rounded-md">
            <input
              type="text"
              className="outline-none w-[300px]"
              placeholder="Bu yerdan qidiring..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <CiSearch />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;