export interface IPersonDetail{
    activitySector : string;
    monthlySalary : string;
    experienceYear : string;
    experienceMonth : string;
    region : string;
    businessAddress : string;
}
export interface IAboutCredit{
    currency : string;
    purposeOfCredit : string;
    amount : string;
    period : string;
    percent : string;
}

export interface ICreditTable{
    month : number;
    principalAmount : number;
    monthlyPercent : number;
    sum : number;
}

export interface IGuarantor{
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
}

