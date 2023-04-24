import React, {FC} from 'react';
import styles from "../CreditAppeal.module.scss";
import {IAboutCredit} from "../types/common";
import {useForm} from "react-hook-form";
import {useAppSelector} from "../../../app/store/store";
import {InputAdornment, TextField} from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
interface IProps {
    aboutCreditRef: any,

    submitted(key: string, data: IAboutCredit): void;
}

const CreditAbout: FC<IProps> = ({aboutCreditRef, submitted}) => {
    const {
        amount,
        currency,
        percent,
        period,
        purposeOfCredit
    } = useAppSelector(store => store.creditAppealSlice.aboutCredit);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            amount,
            currency,
            percent,
            period,
            purposeOfCredit
        }
    });

    const onSubmit = (data) => {
        submitted('aboutCredit', data);
    }
    return (
        <form
            ref={aboutCreditRef}
            onSubmit={handleSubmit(onSubmit)}
            className={styles.creditAppeal__content__creditAbout}>

            <select {...register("currency")} className={"custom-input"}>
                <option value="">Valyuta</option>
                <option value="AZN">AZN</option>
                <option value="USD">USD</option>
            </select>

            <TextField
                label="Məbləğ"
                {...register("amount", {required: true})}
                variant="outlined"
                error={!!errors.amount}
                type="number"
                InputProps={{
                    inputProps: {min: 0, step: 0},
                    endAdornment: <InputAdornment position="end">$</InputAdornment>,
                }}
            />

            <TextField
                label="Biznes kreditin məqsədi"
                {...register("purposeOfCredit", {required: true})}
                variant="outlined"
                error={!!errors.purposeOfCredit}
            />

            <TextField
                label="Müddət (ay)"
                {...register("period", {required: true})}
                variant="outlined"
                error={!!errors.period}
                type="number"
                InputProps={{
                    inputProps: {
                        min: 0,
                        step: 0
                    },
                    endAdornment: <InputAdornment position="end"><CalendarTodayIcon/></InputAdornment>,

                }}
            />

            <TextField
                label="Faiz"
                {...register("percent", {required: true})}
                variant="outlined"
                error={!!errors.percent}
                type="number"
                InputProps={{
                    inputProps: {min: 0, step: 0},
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
            />


        </form>
    );
};

export default CreditAbout;
