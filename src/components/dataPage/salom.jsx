// pages/DataPage.jsx
import { useParams } from "react-router-dom";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPills } from "../../store/pills_id";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const DataPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pill, status, error } = useSelector((state) => state.pills);

  useEffect(() => {
    if (id) {
      dispatch(getPills(id));
    }
  }, [dispatch, id]);

  console.log(pill);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
      </div>
    );
  }

  if (status === "failed") {
    return <p className="text-center text-red-500 my-10">{error}</p>;
  }

  if (!pill) {
    return <p className="text-center my-10">
      {error ? error : "No data found"}
    </p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="md:w-[50%]">
          <h1 className="text-2xl md:text-4xl font-bold">{pill.name}</h1>
          <p className="my-4 text-[16px] md:text-[18px] leading-relaxed">
            {pill.body}
          </p>
          <p className="font-semibold text-xl my-2">{pill.sum}</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Sotib olish
          </button>
        </div>
        <div className="md:w-[40%]">
          <img
            src={pill.image}
            alt={pill.name}
            className="w-full h-auto rounded-lg shadow"
          />
          <div className="mt-4">
            <Rater total={5} rating={pill.rating || 0} interactive={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPage;