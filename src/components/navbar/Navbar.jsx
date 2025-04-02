import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// icons
import { useTranslation } from "react-i18next";
import { IoCartOutline } from "react-icons/io5";
import Translation from "../translation";

const Navbar = () => {
  const logo = "https://res.cloudinary.com/dmgcfv5f4/image/upload/v1742026078/logo_zqcq7u.png";
  const { t } = useTranslation();
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLength(cart.length);
  }, []);

  return (
    <nav id="navbar" className="bg-[#354F52]">
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
          <Translation />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;