import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {ICustomerState} from "./customerSlice";
import CustomerThunkService from "./customerThunk.service";
import {StatusEnum} from "../../../app/types/common";

class CustomerBuilderService {
    static getCustomers = (builder: ActionReducerMapBuilder<ICustomerState>) => {
        /*Case : pending*/
        builder.addCase(CustomerThunkService.getCustomers.pending, (state) => {
            state.loading = StatusEnum.pending;
        });
        /*Case : fulfilled*/
        builder.addCase(CustomerThunkService.getCustomers.fulfilled, (state, action) => {
            state.loading = StatusEnum.fulfilled;
            state.response.data = action.payload;
            state.response.message = "Fulfilled";
        });
        /*Case : rejected*/
        builder.addCase(CustomerThunkService.getCustomers.rejected, (state) => {
            state.loading = StatusEnum.rejected;

        });
    }
}
export default CustomerBuilderService
