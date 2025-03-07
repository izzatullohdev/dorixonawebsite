// import Customer from "./Customer";
import Doctors from "./Doctors";
import Feedback from "./Feedback";
import YandexMap from "./Maps";
import Product from "./Product";
import Register from "./Register";
import SwiperHome from "./SwiperHome";
import About from "../About.components/About"

const HomeComponents = () => {
  return (
    <>
      <SwiperHome />
      <About />
      <Product />
      <Feedback />
      <Doctors />
      <Register />
      <YandexMap />
      {/* <Customer /> */}
    </>
  );
};

export default HomeComponents;
