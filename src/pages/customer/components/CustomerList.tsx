import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store/store";
import customerThunkService from "../features/customerThunk.service";
import {
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import CustomerSearch from "./CustomerSearch";
import {StatusEnum} from "../../../app/types/common";
import {ICustomer} from "../types/common";
import styles from '../Customer.module.scss';
import CustomerDetail from "./CustomerDetail";
import {useNavigate} from "react-router-dom";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const CustomerList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {loading, response} = useAppSelector(store => store.customerSlice);

    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [detailData, setDetailData] = useState<ICustomer>({} as ICustomer);

    const getCustomerList = useCallback(() => {
        dispatch(customerThunkService.getCustomers());
    }, []);

    useEffect(() => {
        getCustomerList();
    }, []);

    const toggleDetailData = () => {
        setOpenDetail(!openDetail);
    }

    const handleDetailData = useCallback((row: ICustomer) => {
        setDetailData(row);
        toggleDetailData();
    }, [])

    const toCreditAppealRoute = (id: number | undefined) => navigate(`/credit-appeal/${id}`);

    return (
        <>
            {/*search field component*/}
            <CustomerSearch/>

            <Divider/>

            <LoadingSkeleton count={4} loading={loading}/>

            {
                loading === StatusEnum.fulfilled && <>
                    <TableContainer>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ad</TableCell>
                                    <TableCell>Soyad</TableCell>
                                    <TableCell>Ata adı</TableCell>
                                    <TableCell>Doğum tarixi</TableCell>
                                    <TableCell>FİN ( Ş.V )</TableCell>
                                    <TableCell>Seriya nömrəsi ( Ş.V )</TableCell>
                                    <TableCell align={'right'}>Əməliyyatlar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {response.data?.map((row: ICustomer, index: number) => (
                                    <TableRow
                                        key={index}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
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
                                        <TableCell component="th">
                                            <div className={styles.customer__content__operations}>
                                                <Button
                                                    onClick={() => toCreditAppealRoute(row.id)}
                                                    variant="contained"
                                                    size={"small"}>
                                                    <Typography variant={"span"}>Kredit müraciəti</Typography>
                                                </Button>
                                                <Button onClick={() => handleDetailData(row)}
                                                        variant="contained" size={"small"}>
                                                    <Typography variant={"span"}>Ətraflı bax</Typography>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }
            <CustomerDetail
                openDetail={openDetail}
                toggleDetailData={toggleDetailData}
                detailData={detailData}
            />

        </>
    );
};

export default CustomerList;
