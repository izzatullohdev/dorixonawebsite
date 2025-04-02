import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Hamburger from "hamburger-react";
// react icons 
import { IoCartOutline } from "react-icons/io5";
import Translation from "../translation";

const MediaNavbar = () => {
  const logo = "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026078/logo_zqcq7u.png";
  const [lang] = useState("uz");
  const [isOpen, setOpen] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  }, [lang, i18n]);
  const routes = [
    { path: "/", name: t("navbar.main") },
    { path: "/about", name: t("navbar.about") },
    { path: "/product", name: t("navbar.product") },
    { path: "/feedback", name: t("navbar.feedback") },
    { path: "/news", name: t("navbar.news") },
    { path: "/alldoctors", name: t("navbar.doc") }
  ];

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLength(cart.length);
  }, []);

  return (
    <div>
      <nav className="bg-[#354F52] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink to={"/"}>
            <img src={logo} alt="Logo" className="max-sm:w-[110px] w-[125px]" />
          </NavLink>
          <div className="flex-1 px-4">
          </div>
          <div className="flex items-center max-md:gap-1 text-[#fff]">
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
            <Hamburger toggled={isOpen} toggle={setOpen} size={21} />
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
            <Translation />
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default MediaNavbar;
