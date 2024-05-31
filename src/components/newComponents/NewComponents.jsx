import { useContext } from "react";
import { dataContext } from "../../useContext/DataContext";
import SwiperHome from "../Home.components/SwiperHome";
import AboutVideo from "../About.components/AboutVideo";
const NewComponents = () => {
  const { yutuqlar } = useContext(dataContext);
  return (
    <>
      <div className="container mx-auto  ">
        <h1 className="text-center my-5 md:my-10 lg:my-20 text-[30px] md:text-[40px] lg:text-[50px]">
          Yutuqlar
        </h1>
        <div className="flex justify-center items-center flex-wrap gap-5 md:gap-20  lg:gap-24">
          {yutuqlar?.map((item, index) => (
            <div
              key={index}
              className="w-[40%] lg:w-[20%] border rounded-lg hover:translate-y-[-20px] transition-all"
            >
              <img src={item.pic} alt="" className="w-full" />
              <div className="p-5">
                <h1 className="md:text-[20px] lg:text-[25px]">{item.name}</h1>
                <p className="block md:block lg:hidden">{item.text.slice(0, 100)}</p>
                <p className="hidden md:hidden lg:block">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto border-y">
        <h1 className="text-center text-[40px] my-12">Chegirmalar</h1>
        <div>
          <SwiperHome />
        </div>
        <div>
          <AboutVideo
            videoUrl={"https://www.youtube.com/watch?v=DttV5GCdEMc"}
          />
        </div>
      </div>
    </>
  );
};

export default NewComponents;
