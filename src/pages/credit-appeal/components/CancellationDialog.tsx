import React, {FC, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";

interface IProps {
    submitCancellation(note?: string): void
}

const CancellationDialog: FC<IProps> = ({submitCancellation}) => {
    const [open, setOpen] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors}, reset} = useForm<{ note: string }>();

    const toggle = () => {
        if (open)
            reset();
        setOpen(!open);
    }
    const cancelSubmit: SubmitHandler<{ note: string }> = (data) => {
        submitCancellation(data.note);
        toggle();
    }
    return (
        <div>
            <Button
                variant="contained"
                onClick={toggle}
                color="error"
                style={{marginRight: 10}}>
                Müraciəti ləğv et
            </Button>
            <Dialog maxWidth={"sm"} fullWidth={true}
                    open={open} onClose={toggle}>
                <DialogTitle>
                    Müştərinin kredit müraciətinin ləğv edilməsi
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <Typography variant="h6">
                        Kredit müraciətini ləğv etməyə əminsinizmi?
                        Əks halda qeyd olunan xanalar üzrə məlumatları geri qaytarmaq mümkün olmayacaq
                    </Typography>
                    <form style={{marginTop: 10}} onSubmit={handleSubmit(cancelSubmit)}>
                        <TextField
                            rows={4}
                            fullWidth
                            label="Müraciətin ləğv olunma səbəbi"
                            multiline
                            variant="outlined"
                            {...register("note" , {required : true})}
                            error={!!errors.note}
                        />
                        <DialogActions>
                            <Button type={"button"} onClick={toggle} variant="outlined">
                                Bağla
                            </Button>
                            <Button type={"submit"} variant="contained" color="error">
                                Təsdiqlə
                            </Button>
                        </DialogActions>
                    </form>

                </DialogContent>

            </Dialog>

        </div>
    );
};

export default CancellationDialog;
