import { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { dataContext } from "../../useContext/DataContext";
import { useTranslation } from "react-i18next";
import VideoDoctor from "./VideoDoctor";

const DoctorPage = () => {
  const { t } = useTranslation();
  const { id } = useParams(); // Retrieve the dynamic ID from the route
  const { doctors, products } = useContext(dataContext); // Assuming doctors and products are available in the context
  const doctor = doctors.find((doc) => doc.id === Number(id)); // Find the specific doctor based on ID

  if (!doctor) {
    return <div>Doctor not found</div>; // Handling case where no doctor matches the ID
  }

  // Filter products where product.tavsiya matches doctor.name2
  const recommendedProducts = doctor.name2
    ? products.filter((product) => product.tavsiya === doctor.name2)
    : [];

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center py-10 px-5">
        <div className="w-[50%] md:w-[50%] lg:w-[40%]">
          <h1 className="text-[20px] md:text-[25px] lg:text-[40px]">
            {doctor.name}
          </h1>
          <p className="my-5 md:leading-7 lg:leading-10 text-[10px] md:text-[18px]">
            {doctor.body}
          </p>
        </div>
        <div className="w-[45%] md:w-[40%] lg:w-[25%]">
          <img src={doctor.picture} alt={doctor.name} className="w-full" />
        </div>
      </div>
      <h1 className="text-center text-[16px] md:text-[25px] lg:text-[30px]">
        Tavsiya kilgan dorilar
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 lg:gap-10 p-2 my-[20px] md:my-[30px] lg:my-[40px] ">
        {recommendedProducts.length > 0 ? (
          recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="border p-5 rounded-md border-stone-300 flex justify-center items-center flex-col"
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
                to={`/datapage/${product.id}`}
                className="btn px-10 py-2 text-[15px] rounded-md"
              >
                {t("Global.button")}
              </NavLink>
            </div>
          ))
        ) : (
          <p>
            {` No recommended medications found that match the doctor's
            recommendation.`}
          </p>
        )}
      </div>
      <div className="lgxx:my-[100px]">
        <VideoDoctor videoUrl={"https://www.youtube.com/watch?v=KZyLUphyz0o"} />
      </div>
    </div>
  );
};

export default DoctorPage;
