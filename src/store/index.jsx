import { configureStore } from "@reduxjs/toolkit";
import achievementReducer from "../store/achievements";
import doctorReducer from "../store/doctors";
import swiperReducer from "../store/swiper_pills";
import partnerSlice from "../store/partners";
import productSlice from "../store/product";

export const store = configureStore({
    reducer: {
        achievement: achievementReducer,
        doctor: doctorReducer,
        swiper: swiperReducer,
        partner: partnerSlice,
        products: productSlice,
    }
})