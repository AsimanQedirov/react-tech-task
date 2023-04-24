import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosInstance} from "../../../app/interceptor";
import {IRequestParams} from "../types/request";

class CustomerThunkService {
    static getCustomers = createAsyncThunk("customer/get", async (params: Partial<IRequestParams>, thunkAPI) => {
        try {
            const response = await axiosInstance(`customers`, {params});
            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    })
}

export default CustomerThunkService
