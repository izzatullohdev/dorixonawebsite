// picture
import logo from "../../assets/logo.png";
// icons
import { FaMapLocationDot } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { dataContext } from "../../useContext/DataContext";
const Navbar = () => {
  const [lang, setLang] = useState("uz");
  const { t, i18n } = useTranslation();
  useEffect(() => {
    localStorage.setItem("language", lang);
  });
  const handleLanguageChange = (e) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { products, setDataPage } = useContext(dataContext);
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
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 lg:gap-10">
            {filteredData.map((product) => (
              <div
                key={product.id}
                className="border p-5 rounded-md border-stone-300 flex justify-center items-center flex-col bg-[#fff]"
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
                <NavLink
                  to="/datapage"
                  onClick={() => handlePage(product)}
                  className="btn px-10 py-2 text-[15px] rounded-md"
                >
                  {t("Global.button")}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
