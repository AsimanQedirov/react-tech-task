import React, {FC, useState} from 'react';
import {Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

interface IProps {
    submitCreditAppeal(note?: string): void
}

const ConfirmationDialog: FC<IProps> = ({submitCreditAppeal}) => {
    const [open, setOpen] = useState<boolean>(false);

    const toggle = () => {
        setOpen(!open);
    }
    const submit = () => {
        submitCreditAppeal();
    }
    return (
        <div>
            <Button onClick={toggle} variant="contained" color="success">
                Müraciət et
            </Button>

            <Dialog maxWidth={"sm"} fullWidth={true}
                    open={open} onClose={toggle}>
                <DialogTitle>Müştərinin kredit müraciətinin təsdiqlənməsi</DialogTitle>
                <DialogContent>
                    <Alert severity="info">
                        <AlertTitle>Məlumatlandırıcı bildiriş</AlertTitle>
                        Qeyd olunan bölmələr üzrə kredit müraciətini təsdiqləməyə əminsinizmi?
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggle} variant="outlined">
                        Bağla
                    </Button>
                    <Button onClick={submit} variant="contained" color="success">
                        Təsdiqlə
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmationDialog;
