import { combineReducers } from "@reduxjs/toolkit";
import customerSlice from "../../pages/customer/features/customerSlice";
import creditAppealSlice from "../../pages/credit-appeal/features/creditAppealSlice";
export const reducers = combineReducers({
    customerSlice,
    creditAppealSlice
});


