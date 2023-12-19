import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "../feature/homeSlice";

export const store = configureStore({
    reducer : homeSlice,
})

