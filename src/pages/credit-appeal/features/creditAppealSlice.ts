import {createSlice} from "@reduxjs/toolkit";
import {IAboutCredit, IPersonDetail} from "../types/common";
import {ICustomer} from "../../customer/types/common";

export interface ICreditAppealState {
    personDetail: IPersonDetail;
    aboutCredit: IAboutCredit;
    guarantors: Array<ICustomer>;
    creditCalculator: {
        sumOfPercentAmount: number
    }
}

const initialState = {
    personDetail: {
        activitySector: "",
        monthlySalary: '',
        experienceYear: '',
        experienceMonth: '',
        region: '',
        businessAddress: "",
    },
    aboutCredit: {
        amount: '',
        currency: '',
        percent: '',
        period: '',
        purposeOfCredit: ''
    },
    guarantors: [],
    creditCalculator: {
        sumOfPercentAmount: 0
    }


} as ICreditAppealState

const creditAppealSlice = createSlice({
    name: 'creditAppeal',
    initialState,
    reducers: {
        updatePersonDetail: (state, action) => {
            state.personDetail = {...action.payload};
        },
        updateAboutCredit: (state, action) => {
            state.aboutCredit = {...action.payload};
        },
        updateGuarantors: (state, action) => {
            state.guarantors = [...action.payload]
        },
        updateCreditCalculator: (state, action) => {
            state.creditCalculator.sumOfPercentAmount = action.payload;
        },
        resetState: (state) => initialState
    }
});

export default creditAppealSlice.reducer;

export const CreditAppealActions = creditAppealSlice.actions;
