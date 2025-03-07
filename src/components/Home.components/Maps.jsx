import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const YandexMap = () => {
  return (
    <YMaps>
      <div className="container mx-auto my-10 py-10">
        <h1 className="font-semibold text-[25px] text-center mb-5">Manzilimiz</h1>
        <div className="w-full max-md:w-[90vw] mx-auto h-[450px] max-md:h-[300px] border overflow-hidden">
          <Map
            defaultState={{ center: [41.2995, 69.2401], zoom: 12 }}
            width="100%"
            height="100%"
          >
            <Placemark geometry={[41.2995, 69.2401]} />
          </Map>
        </div>
      </div>
    </YMaps>
  );
};

export default YandexMap;