import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useTranslation } from "react-i18next";

const YandexMap = () => {
  const { t } = useTranslation();
  return (
    <YMaps>
      <div className="container mx-auto my-10 py-10">
        <h1 className="text-center text-[28px] md:text-[30px] lg:text-[40px] font-[500] mb-5">
          {t("adress.title")}
        </h1>
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