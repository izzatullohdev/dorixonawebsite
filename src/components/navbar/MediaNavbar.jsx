import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Hamburger from "hamburger-react";
import { CiSearch } from "react-icons/ci";
import logo from "../../assets/logo.png";
import { useContext } from "react";
import { dataContext } from "../../useContext/DataContext";
const MediaNavbar = () => {
  const [lang] = useState("uz");
  const [isOpen, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  }, [lang, i18n]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { products, setDataPage } = useContext(dataContext);
  // Function to handle input changes
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
  const routes = [
    { path: "/", name: t("navbar.main") },
    { path: "/about", name: t("navbar.about") },
    { path: "/product", name: t("navbar.product") },
    { path: "/news", name: t("navbar.news") },
    { path: "/alldoctors", name: t("navbar.doc") },
    { path: "/cart", name: t("navbar.cart") },
  ];
  const handlePage = (page) => {
    setDataPage(page);
    setFilteredData([]);
    setSearchQuery("");
    setOpen(false);
  };

  return (
    <div>
      <nav className="bg-[#354F52] p-5">
        <div className="container mx-auto flex justify-between items-center">
          <img src={logo} alt="Logo" className="w-[80px]" />
          <div className="flex-1 px-4">
            <div className="search bg-white flex items-center gap-4 px-4 py-1 rounded-md">
              <input
                type="text"
                className="outline-none w-full"
                placeholder={t("search")}
                value={searchQuery}
                onChange={handleInputChange}
              />
              <CiSearch />
            </div>
          </div>
          <div className="flex items-center text-[#fff]">
            <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
          </div>
        </div>
        <div
          className={`transition-transform duration-300 ease-out ${
            isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
          }`}
        >
          <ul className="flex flex-col items-center py-4 bg-[#354F52]">
            {routes.map((route) => (
              <li key={route.path} className="my-2">
                <NavLink
                  to={route.path}
                  onClick={() => setOpen(false)}
                  className="text-white text-lg"
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 lg:gap-10 p-2">
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
      </nav>
    </div>
  );
};

export default MediaNavbar;
