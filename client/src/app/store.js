import { configureStore } from "@reduxjs/toolkit";
import { stepsReducer } from "../features/steps/stepsSlice";

export default configureStore({
  reducer: {
    steps: stepsReducer,
  },
});
