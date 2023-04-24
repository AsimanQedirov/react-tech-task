import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";
import {StatusEnum} from "../../../app/types/common";
import {ICustomer} from "../types/common";
import CustomerBuilderService from "./customerBuilder.service";

export interface ICustomerState {
    loading: StatusEnum.idle;
    response: {
        data: Array<ICustomer>;
        message: string;
    }
}

const initialState = {
    loading: StatusEnum.idle,
    response: {
        data: [],
        message: ""
    }
} as ICustomerState

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducer: {
        /*action features*/
    },
    extraReducers: (builder: ActionReducerMapBuilder<ICustomerState>) => {
        CustomerBuilderService.getCustomers(builder); /*customer get list builder*/
    }
})
export default customerSlice.reducer;
