import { configureStore } from "@reduxjs/toolkit";
import achievementReducer from "../store/achievements";
import doctorReducer from "../store/doctors";
import swiperReducer from "../store/swiper_pills";
import partnerReducer from "../store/partners";
import productReducer from "../store/product";
import discountReducer from "../store/discount";
import commentReducer from "../store/commentaries";
import pillsReducer from "../store/pills_id";

export const store = configureStore({
    reducer: {
        achievement: achievementReducer,
        doctor: doctorReducer,
        swiper: swiperReducer,
        partner: partnerReducer,
        products: productReducer,
        discount: discountReducer,
        commentaries: commentReducer,
        pills: pillsReducer,
    }
})