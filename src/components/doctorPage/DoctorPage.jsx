import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VideoDoctor from "./VideoDoctor";
import { useDispatch, useSelector } from "react-redux";
import { getDoctor } from "../../store/doctors";
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons";

const DoctorPage = () => {
  const { i18n } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { doctor, status, error } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getDoctor());
  }, [dispatch]);

  if (status === "loading")
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );

  if (status === "failed") return <p className="text-center text-red-500 my-5">Xatolik: {error}</p>;

  const selectedDoctor = doctor.find((doc) => doc.id === Number(id));

  if (!selectedDoctor) return <div className="text-center">Doctor not found</div>;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center py-20 px-5">
        <div className="w-[50%] md:w-[50%] lg:w-[40%]">
          <h1 className="text-[20px] md:text-[25px] lg:text-[40px]">
            {selectedDoctor.fullname}
          </h1>
          <p className="my-5 md:leading-7 lg:leading-10 text-[10px] md:text-[18px]">
            {
              i18n.language === "uz"
              ? selectedDoctor.body_uz
              : i18n.language === "ru"
              ? selectedDoctor.body_ru
              : selectedDoctor.body_en
            }
          </p>
        </div>
        <div className="w-[45%] md:w-[40%] lg:w-[25%]">
          <img src={selectedDoctor.picture} alt="" className="w-full rounded-xl" />
        </div>
      </div>
      {/* <h1 className="text-center text-[16px] md:text-[25px] lg:text-[30px]">
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
      </div> */}
      <div className="lgxx:my-[100px] py-10">
        <VideoDoctor videoUrl={"https://www.youtube.com/watch?v=KZyLUphyz0o"} />
      </div>
    </div>
  );
};

export default DoctorPage;