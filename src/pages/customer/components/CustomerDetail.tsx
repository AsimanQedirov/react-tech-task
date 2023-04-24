import React, {FC, memo} from 'react';
import {ICustomer} from "../types/common";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Typography} from "@mui/material";
import styles from '../Customer.module.scss'

interface ICustomerDetailProps {
    openDetail: boolean;
    detailData: ICustomer;

    toggleDetailData(): void;
}

const CustomerDetail: FC<ICustomerDetailProps> = memo(
    ({openDetail = false, detailData, toggleDetailData}) => {

        const close = () => toggleDetailData();

        return (
            <div>
                <Dialog maxWidth={"md"} fullWidth={true}
                        open={openDetail} onClose={toggleDetailData}>
                    <DialogTitle>Müştəri məlumatlarına ətraflı baxış</DialogTitle>
                    <DialogContent>
                        {detailData && <div className={styles.customer__content__detail}>
                            <Typography><b>Ad</b> : {detailData.name}</Typography>
                            <Typography><b>Soyad</b> : {detailData.surname}</Typography>
                            <Typography><b>Ata adı</b> : {detailData.patronymic}</Typography>
                            <Typography><b>Doğum tarixi</b> : {detailData.birthDate}</Typography>
                            <Typography><b>Şəxsiyyət vəsiqəsinin FİN-i</b> : {detailData.pin}</Typography>
                            <Typography><b>Şəxsiyyət vəsiqəsinin seriya nömrəsi</b> : {detailData.serialNumber}
                            </Typography>
                            <Typography><b>Ev telefonu</b> : {detailData.homePhone}</Typography>
                            <Typography><b>Mobil telefonu</b> : {detailData.mobilePhone}</Typography>
                            <Typography><b>Faktiki ünvanı</b> : {detailData.currentAddress}</Typography>
                            <Typography><b>Qeydiyyat ünvanı</b> : {detailData.registrationAddress}</Typography>
                        </div>}
                        <Divider sx={{my: 2}}/>
                        {detailData.creditAppeals && detailData.creditAppeals.length > 0 && <>
                            <Typography variant={"h6"}><b>Təsdiqlənmiş kredit müraciətləri</b></Typography>
                            {detailData?.creditAppeals?.map((item, index) =>
                                <Paper key={index} sx={{p: 2, my: 2}}>
                                    <Typography><b>Şəxs haqqında : </b></Typography>
                                    <Divider/>
                                    <Typography><b>Fəaliyyət sahəsi</b> : {item.personDetail.activitySector}
                                    </Typography>
                                    <Typography><b>Biznes ünvanı</b> : {item.personDetail.businessAddress}</Typography>
                                    <Typography><b>İş
                                        təcrübəsi</b> : {item.personDetail.experienceYear} (il)
                                        {item.experienceMonth} (ay) </Typography>
                                    <Typography><b>Maaş</b> : {item.personDetail.monthlySalary}</Typography>
                                    <Typography><b>Region</b> : {item.personDetail.region}</Typography>

                                    <Typography sx={{mt: 2}}><b>Kredit haqqında : </b></Typography>
                                    <Divider/>
                                    <Typography><b>Ümumi
                                        məbləğ</b> : {item.aboutCredit.amount} {item.aboutCredit.currency}</Typography>
                                    <Typography><b>Valyuta</b> : {item.aboutCredit.currency}</Typography>
                                    <Typography><b>Faiz</b> : {item.aboutCredit.percent}%</Typography>
                                    <Typography><b>Müddət</b> : {item.aboutCredit.period} ay</Typography>
                                    <Typography><b>Kreditin məqsədi</b> : {item.aboutCredit.purposeOfCredit}
                                    </Typography>

                                    <Typography sx={{mt: 2}}><b>Zaminlər : </b></Typography>
                                    <Divider/>
                                    {
                                        item.guarantors.map((guarantor, _gI) => {
                                            return <Paper key={_gI} sx={{my: 2, p: 2}}>
                                                <Typography><b>Ad , soyad , ata adı</b> :
                                                    {guarantor.name} {guarantor.surname} {guarantor.patronymic}
                                                </Typography>
                                                <Typography><b>Doğum tarixi</b> : {guarantor.birthDate}</Typography>
                                                <Typography><b>FİN</b> : {guarantor.pin} </Typography>
                                                <Typography><b>Seriya nömrəsi</b> : {guarantor.serialNumber}
                                                </Typography>
                                            </Paper>
                                        })
                                    }
                                </Paper>)}
                        </>}
                        {
                            (detailData?.cancellationMessage && detailData?.cancellationMessage.length > 0) && <>
                                <Typography variant={"h6"} sx={{my: 2}}><b>Ləğv edilmiş kredit
                                    müraciətləri</b></Typography>
                                {
                                    detailData?.cancellationMessage?.map((item, index) => {
                                        return <Paper key={index} sx={{my: 1, p: 2}}>
                                            <Typography><b>Ləğv olunma səbəbi</b> : {item.message} </Typography>
                                            <Typography><b>Ləğv olunma vaxtı</b> : {item.cancellationDate}</Typography>
                                        </Paper>
                                    })
                                }
                            </>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={close} variant={"outlined"}>Bağla</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    });

export default CustomerDetail;
