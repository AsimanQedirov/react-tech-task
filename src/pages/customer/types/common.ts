import {IAboutCredit, IGuarantor, IPersonDetail} from "../../credit-appeal/types/common";


export interface ICustomer {
    id?: number;
    name: string;
    surname: string;
    patronymic: string;
    birthDate: string;
    pin: string;
    serialNumber: string;
    mobilePhone: string;
    homePhone: string;
    currentAddress: string;
    registrationAddress: string;
    cancellationMessage: Array<{
        cancellationDate: string;
        message: string;
    }>;
    creditAppeals: Array<{
        personDetail: IPersonDetail;
        guarantors: Array<IGuarantor>;
        aboutCredit: IAboutCredit;
    }>
}
