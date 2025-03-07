import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import logo from "../assets/logo.png";
// icons
import { RxPinTop } from "react-icons/rx";
import { FaTelegram, FaInstagram, FaFacebook } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import MediaNavbar from "../components/navbar/MediaNavbar";

const RouterLayout = () => {
  return (
    <>
      <header>
        <div className="hidden lg:block">
          <Navbar />
        </div>
        <div className="lg:hidden">
          <MediaNavbar />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="bg-[#2F3E46] py-10">
        <div className="container mx-auto flex items-center flex-col  lg:flex-row gap-10 justify-between">
          <div className="flex items-center gap-10">
            <img src={logo} alt="" />
            <p className="text-[#fff]">
              Lorem, ipsum dolor sit amet consectetur <br /> adipisicing elit.
              Iure, odio! <br /> Quaerat a placeat accusantium distinctio <br />
              ducimus odit, sit atque harum.
            </p>
          </div>
          <a
            href="#navbar"
            className=" text-[20px] p-4 border text-[#fff] rounded-full"
          >
            <RxPinTop />
          </a>
          <ul className="flex justify-between items-center flex-wrap gap-7 text-[#fff]">
            <li>
              <a href="" className="text-[20px]">
                <FaTelegram />
              </a>
            </li>
            <li>
              <a href="" className="text-[20px]">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="" className="text-[20px]">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="" className="text-[20px] flex items-center gap-2">
                <IoCall /> +998 90 000 00 00
              </a>
            </li>
          </ul>
        </div>
        <div className="container mx-auto border-t-2 my-5">
          <p className="text-center text-[#fff] pt-[50px]">
            © 2022 alximik.uz Barcha huquqlar himoyalangan!
          </p>
        </div>
      </footer>
    </>
  );
};

export default RouterLayout;
