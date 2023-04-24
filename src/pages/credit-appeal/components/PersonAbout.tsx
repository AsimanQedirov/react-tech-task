import React, {FC} from 'react';
import {useAppSelector} from "../../../app/store/store";
import styles from '../CreditAppeal.module.scss';
import {useForm} from "react-hook-form";
import {IPersonDetail} from "../types/common";
import {InputAdornment, TextField} from "@mui/material";

interface IProps {
    personRef: any,

    submitted(key: string, data: IPersonDetail): void;
}

const PersonAbout: FC<IProps> = ({personRef, submitted}) => {
    const {
        activitySector,
        monthlySalary,
        experienceYear,
        experienceMonth,
        region,
        businessAddress
    } = useAppSelector(store => store.creditAppealSlice.personDetail);

    const {register, handleSubmit, formState: {errors}, watch, control} = useForm({
        defaultValues: {
            activitySector,
            monthlySalary,
            experienceYear,
            experienceMonth,
            region,
            businessAddress
        }
    });

    const onSubmit = (data) => {
        submitted('personDetail', data);
    }

    return (
        <form
            ref={personRef}
            onSubmit={handleSubmit(onSubmit)}
            className={styles.creditAppeal__content__personDetail}>
            <TextField
                label="Fəaliyyət sektoru"
                variant="outlined"
                {...register("activitySector", {required: true})}
                error={!!errors.activitySector}
            />
            <TextField
                label="Aylıq gəlir"
                variant="outlined"
                type="number"
                InputProps={{
                    inputProps: {min: 0, step: 0, type: "number"},
                    endAdornment: <InputAdornment position="end">$</InputAdornment>,
                }}
                {...register("monthlySalary", {required: true})}
                error={!!errors.monthlySalary}
            />
            <TextField
                label="Region"
                variant="outlined"
                {...register("region", {required: true})}
                error={!!errors.region}
            />
            <TextField
                label="Biznes ünvanı"
                variant="outlined"
                {...register("businessAddress", {required: true})}
                error={!!errors.businessAddress}
            />
            <TextField
                label="İş təcrübəsi (il)"
                variant="outlined"
                type="number"
                InputProps={{
                    inputProps: {min: 0, type: "number"},
                }}
                {...register("experienceYear", {required: true})}
                error={!!errors.experienceYear}
            />
            <TextField
                label="İş təcrübəsi (ay)"
                variant="outlined"
                type="number"
                InputProps={{
                    inputProps: {min: 0, type: "number"},
                }}
                {...register("experienceMonth", {required: true})}
                error={!!errors.experienceMonth}
            />
        </form>
    );
};

export default PersonAbout;
