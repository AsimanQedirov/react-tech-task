import React, {useState} from 'react';
import {Button, Dialog, DialogContent, DialogTitle, InputAdornment, TextField, Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import styles from '../Customer.module.scss';
import {useAppDispatch} from "../../../app/store/store";
import {axiosInstance} from "../../../app/interceptor";
import CustomerThunkService from "../features/customerThunk.service";

type Inputs = {
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
};

const CreateNewCustomer = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const toggleOpen = () => {
        if (open)
            reset();
        setOpen(!open);
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        data['cancellationMessage'] = [];
        data['creditAppeals'] = [];
        try {
            const response = await axiosInstance.post("customers", data);
            dispatch(CustomerThunkService.getCustomers());
            toggleOpen();
        } catch (e) {
            throw new Error("Something went wrong!")
        }
    }
    return (
        <div>
            <Button
                onClick={toggleOpen}
                variant="contained"
                size="medium"
                color="success">
                <Typography variant="span">Yeni müştəri yarat</Typography>
            </Button>

            <Dialog maxWidth={"md"} fullWidth={true}
                    open={open} onClose={toggleOpen}>
                <DialogTitle>Yeni müştərinin qeydiyyatı</DialogTitle>
                <DialogContent>
                    <>
                        <form className={styles.customer__form} onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                label="Ad"
                                {...register("name", {required: true})}
                                variant="outlined"
                                error={!!errors.name}
                            />
                            <TextField
                                label="Soyad"
                                {...register("surname", {required: true})}
                                variant="outlined"
                                error={!!errors.surname}
                            />
                            <TextField
                                label="Ata adı"
                                {...register("patronymic", {required: true})}
                                variant="outlined"
                                error={!!errors.patronymic}
                            />
                            <TextField
                                type={'date'}
                                {...register("birthDate", {required: true})}
                                variant="outlined"
                                error={!!errors.birthDate}
                            />
                            <TextField
                                label="Şəxsiyyət vəsiqəsinin FİN-i"
                                {...register("pin", {required: true})}
                                variant="outlined"
                                inputProps={{
                                    type: "text",
                                    min: 0,
                                    maxLength: 7,
                                }}
                                error={!!errors.pin}
                            />
                            <TextField
                                label="Şəxsiyyət vəsiqəsinin seriya nömrəsi"
                                {...register("serialNumber", {required: true})}
                                variant="outlined"
                                inputProps={{
                                    type: "text",
                                }}
                                error={!!errors.serialNumber}
                            />
                            <TextField
                                label="Ev telefonu"
                                {...register("homePhone", {required: true})}
                                variant="outlined"
                                inputProps={{
                                    type: "number",
                                    min : 0
                                }}
                                error={!!errors.homePhone}
                            />
                            <TextField
                                label="Mobil telefonu"
                                {...register("mobilePhone", {required: true})}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+994</InputAdornment>,
                                }}
                                variant="outlined"
                                inputProps={{
                                    type: "number",
                                    min : 0
                                }}
                                error={!!errors.mobilePhone}

                            />
                            <TextField
                                label="Faktiki ünvanı"
                                {...register("currentAddress", {required: true})}
                                error={!!errors.currentAddress}
                                variant="outlined"
                            />
                            <TextField
                                label="Qeydiyyat ünvanı"
                                {...register("registrationAddress", {required: true})}
                                error={!!errors.registrationAddress}
                                variant="outlined"
                            />
                            <Button type={"button"} onClick={toggleOpen} color="info">Ləğv et</Button>
                            <Button type={"submit"} variant="contained" color="success">Təsdiqlə</Button>
                        </form>
                    </>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateNewCustomer;
