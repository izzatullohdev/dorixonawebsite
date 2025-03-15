import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { dataContext } from "../../useContext/DataContext";
// icons
import { AiOutlineGlobal } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const logo = "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026078/logo_zqcq7u.png";
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
    <nav id="navbar" className="bg-[#2F3E46]">
      <div className="container mx-auto py-3 flex justify-between items-center">
        <NavLink to={"/"}>
          <img src={logo} alt="" className="w-[130px] md:w-[130px] lg:w-[150px]" />
        </NavLink>
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
        <ul className="text-[#fff] flex items-center gap-5">
          <li className="flex items-center justify-center">
            <NavLink to="/cart">
              <IoCartOutline className="text-2xl"/>
            </NavLink>
            {cartLength > 0 && (
              <div className="w-[16px] h-[20px] rounded-[50%] flex items-center justify-center bg-[#333] shadow shadow-[#333] text-sm">
                {cartLength}
              </div>
            )}
          </li>
          <li className="flex items-center">
            <AiOutlineGlobal size={21} />
            <select
              name="language"
              id="language"
              className="bg-inherit text-xl max-md:text-lg outline-none cursor-pointer"
              onChange={handleLanguageChange}
            >
              <option value="uz" className="text-black">uz</option>
              <option value="ru" className="text-black">ru</option>
              <option value="en" className="text-black">en</option>
            </select>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;