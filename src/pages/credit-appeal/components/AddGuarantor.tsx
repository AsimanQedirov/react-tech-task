import React, {FC, MutableRefObject, useEffect, useMemo, useState} from 'react';
import {axiosInstance} from "../../../app/interceptor";
import styles from '../CreditAppeal.module.scss';
import {
    Alert,
    Button,
    Checkbox,
    Divider,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {StatusEnum} from "../../../app/types/common";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import CreateNewGuarantor from "./CreateNewGuarantor";
import GuarantorSearch from "./GuarantorSearch";
import {useAppSelector} from "../../../app/store/store";
import {IGuarantor} from "../types/common";

interface IProps {
    guarantorRef: MutableRefObject<HTMLElement | undefined>,

    submitted(key: string, selectedRows: Array<IGuarantor>): void
}

const AddGuarantor: FC<IProps> = ({guarantorRef, submitted}) => {
    const [response, setResponse] = useState<{
        loading: string,
        data: Array<IGuarantor>
    }>({
        loading: StatusEnum.idle,
        data: []
    });
    const {guarantors} = useAppSelector(store => store.creditAppealSlice)
    const [selectedRows, setSelectedRows] = useState<Array<IGuarantor>>(guarantors);
    const [openSnack, setOpenSnack] = useState(false);
    const getGuarantors = async (pin?: string | number) => {
        setResponse({...response, loading: StatusEnum.pending});
        try {
            const response = await axiosInstance(`guarantors`, {
                params: {
                    pin_like: pin
                }
            });
            const guarantorList = response.data;
            setResponse({data: [...guarantorList], loading: StatusEnum.fulfilled});
        } catch (e) {
            setResponse({...response, loading: StatusEnum.rejected});
        }
    }
    const addSelectedRows = (event: React.ChangeEvent<HTMLInputElement>, data: IGuarantor) => {
        const checked = event.target.checked;
        if (checked)
            setSelectedRows([...selectedRows, data]);
        else
            setSelectedRows(selectedRows.filter(item => item.id !== data.id));
    }

    const saveSelectedRows = () => {
        if (selectedRows.length === 0) {
            setOpenSnack(true);
            setTimeout(() => {
                setOpenSnack(false)
            }, 2000)
            return
        }
        submitted("guarantors", selectedRows);
    }

    useEffect(() => {
        getGuarantors();
    }, []);

    const checkIncludingData = useMemo(() => {
        return (data: IGuarantor) => selectedRows.some(item => item.id === data.id)
    }, [selectedRows])

    return (
        <div className={styles.creditAppeal__content__addGuarantor}>
            <div className={styles.creditAppeal__content__addGuarantor__container}>
                <Typography>Zaminlər siyahısı</Typography>
                <CreateNewGuarantor getGuarantors={getGuarantors}/>
            </div>
            <Divider/>

            <GuarantorSearch getGuarantorByPin={getGuarantors}/> {/*get guarantor by fin in search field*/}

            <LoadingSkeleton count={4} loading={response.loading}/>

            {response.loading === StatusEnum.fulfilled && <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Seç</TableCell>
                            <TableCell>Ad</TableCell>
                            <TableCell>Soyad</TableCell>
                            <TableCell>Ata adı</TableCell>
                            <TableCell>Doğum tarixi</TableCell>
                            <TableCell>FİN ( Ş.V )</TableCell>
                            <TableCell>Seriya nömrəsi ( Ş.V )</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {response.data.map((row: IGuarantor, index: number) => (
                            <TableRow
                                key={index}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th">
                                    <Checkbox
                                        checked={checkIncludingData(row)}
                                        onChange={(event) => addSelectedRows(event, row)}
                                    />
                                </TableCell>
                                <TableCell component="th">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th">
                                    {row.surname}
                                </TableCell>
                                <TableCell component="th">
                                    {row.patronymic}
                                </TableCell>
                                <TableCell component="th">
                                    {row.birthDate}
                                </TableCell>
                                <TableCell component="th">
                                    {row.pin}
                                </TableCell>
                                <TableCell component="th">
                                    {row.serialNumber}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
            <Button ref={guarantorRef} onClick={saveSelectedRows}></Button>
            <Snackbar
                autoHideDuration={2000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: "right"
                }}
                open={openSnack}
            >
                <Alert severity={'error'}>Heç bir zamin seçilməyib</Alert>
            </Snackbar>
        </div>
    );
};

export default AddGuarantor;
