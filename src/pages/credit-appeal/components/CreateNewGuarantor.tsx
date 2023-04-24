import React, {FC, useState} from 'react';
import {Button, Dialog, DialogContent, DialogTitle, InputAdornment, TextField} from "@mui/material";
import styles from "../../customer/Customer.module.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import {axiosInstance} from "../../../app/interceptor";
import {IGuarantor} from "../types/common";


interface IProps {
    getGuarantors(): void;
}

const CreateNewGuarantor : FC<IProps> = ({getGuarantors}) => {
    const [open, setOpen] = useState<boolean>(false);

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const toggleOpen = () => {
        if (open)
            reset();
        setOpen(!open);
    }
    const onSubmit: SubmitHandler<Omit<IGuarantor, 'id'>> = async (data) => {
        try {
            const response = await axiosInstance.post(`guarantors`, data);
            getGuarantors();
            toggleOpen();
        } catch (e) {

        }
    }
    return (
        <>
            <Button onClick={toggleOpen} variant="contained" color="success" size={"small"}>Yeni zamin yarat</Button>
            <Dialog maxWidth={"md"} fullWidth={true}
                    open={open} onClose={toggleOpen}>
                <DialogTitle>Yeni zamin qeydiyyatı</DialogTitle>
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
                                inputProps={{
                                    type: "number",
                                    min : 0
                                }}
                                error={!!errors.homePhone}
                                variant="outlined"
                            />
                            <TextField
                                label="Mobil telefonu"
                                {...register("mobilePhone", {required: true})}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+994</InputAdornment>,
                                }}
                                inputProps={{
                                    type: "number",
                                    min : 0
                                }}
                                error={!!errors.mobilePhone}
                                variant="outlined"
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
        </>
    );
};

export default CreateNewGuarantor;
