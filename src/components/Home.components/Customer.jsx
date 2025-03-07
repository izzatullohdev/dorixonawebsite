import { FaRegUser } from "react-icons/fa";
import { useContext } from "react";
import { dataContext } from "../../useContext/DataContext";
import { useTranslation } from "react-i18next";
const Customer = () => {
  const { customerCard } = useContext(dataContext);
  const { t } = useTranslation();
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-[25px] md:text-[25px] lg:text-[32px] my-10">
        {t("customer.name")}
      </h1>
      <div className="cards flex justify-between items-center flex-wrap">
        {customerCard?.map((item) => (
          <div
            key={item.id}
            className="w-[100%] md:w-[300px] lg:w-[350px] p-5 border m-5"
          >
            <div className="flex justify-start items-center">
              <span className="text-[30px] p-3 bg-[#354F52] rounded-lg text-[#fff]">
                <FaRegUser />
              </span>
              <div className="m-3">
                <h1>{item.name}</h1>
                <p>{item.who}</p>
              </div>
            </div>
            <div>
              <p>{item.body}</p>
              <p className="my-5">{item.data}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;
