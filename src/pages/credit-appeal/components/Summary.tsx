import React from 'react';
import styles from '../CreditAppeal.module.scss'
import {Box, Divider, Paper, Typography} from "@mui/material";
import {useAppSelector} from "../../../app/store/store";
import {ICustomer} from "../../customer/types/common";

const Summary = () => {
    const {
        personDetail,
        aboutCredit,
        creditCalculator,
        guarantors
    } = useAppSelector(store => store.creditAppealSlice);

    return (
        <div className={styles.creditAppeal__content__summary}>
            <Paper className={styles.creditAppeal__content__summary__cards}>
                <Typography variant="h6">
                    Şəxs haqqında məlumat
                </Typography>
                <Divider style={{margin: '10px 0'}}/>
                <Typography>
                    Fəaliyyət sektoru : {personDetail.activitySector}
                </Typography>
                <Typography>
                    Aylıq gəlir : {personDetail.monthlySalary}
                </Typography>
                <Typography>
                    İş təcrubəsi ( il ) : {personDetail.experienceYear}
                </Typography>
                <Typography>
                    İş təcrubəsi ( ay ) : {personDetail.experienceMonth}
                </Typography>
                <Typography>
                    Region : {personDetail.region}
                </Typography>
                <Typography>
                    Biznes ünvanı : {personDetail.businessAddress}
                </Typography>
            </Paper>
            <Paper className={styles.creditAppeal__content__summary__cards}>
                <Typography variant="h6">
                    Kredit barədə məlumat
                </Typography>
                <Divider style={{margin: '10px 0'}}/>
                <Typography>
                    Ümumi məbləğ : {aboutCredit.amount}
                </Typography>
                <Typography>
                    Valyuta : {aboutCredit.currency}
                </Typography>
                <Typography>
                    Kreditin faizi : {aboutCredit.percent}%
                </Typography>
                <Typography>
                    Müddət (ay) : {aboutCredit.period}
                </Typography>
                <Typography>
                    Biznes kreditin məqsədi : {aboutCredit.purposeOfCredit}
                </Typography>
            </Paper>
            <Paper className={styles.creditAppeal__content__summary__cards}>
                <Typography variant="h6">
                    Kredit kalkulyatoru
                </Typography>
                <Divider style={{margin: '10px 0'}}/>
                <Typography>
                    Məbləğ : {aboutCredit.amount}
                </Typography>
                <Typography>
                    Kreditin faizi : {aboutCredit.percent}%
                </Typography>
                <Typography>
                    Kreditin müddəti (ay) : {aboutCredit.period}
                </Typography>
                <Typography>
                    Aylıq məbləğ ( AZN ) : {(Number(aboutCredit.amount) /
                    Number(aboutCredit.period)).toFixed(2)}
                </Typography>
                <Typography>
                    Cəm ( AZN ) : {Number(aboutCredit.amount) + creditCalculator.sumOfPercentAmount}
                </Typography>

            </Paper>
            <Paper className={styles.creditAppeal__content__summary__cards}>
                <Typography variant="h6">
                    Zaminlər
                </Typography>
                <Divider style={{margin: '10px 0'}}/>
                {
                    guarantors.map((item: ICustomer, index) => {
                        return <Box key={index} sx={{p: 2, border: '1px dashed grey', m: 1}}>
                            <Typography>
                                Ad , soyad və ata adı : {item.name} {item.surname} {item.patronymic}
                            </Typography>
                            <Typography>
                                Doğum tarixi : {item.birthDate}
                            </Typography>
                            <Typography>
                                FİN : {item.pin}
                            </Typography>
                            <Typography>
                                Seriya nömrəsi : {item.serialNumber}
                            </Typography>
                        </Box>
                    })
                }


            </Paper>
        </div>
    );
};

export default Summary;
