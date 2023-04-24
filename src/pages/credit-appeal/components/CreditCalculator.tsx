import React, {useEffect, useMemo, useState} from 'react';
import {ICreditTable} from "../types/common";
import {useAppDispatch, useAppSelector} from "../../../app/store/store";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import styles from '../CreditAppeal.module.scss'
import {CreditAppealActions} from "../features/creditAppealSlice";
const CreditCalculator = () => {
    const dispatch = useAppDispatch();
    const {amount, percent, period} = useAppSelector(store => store.creditAppealSlice.aboutCredit);
    const [creditTable, setCreditTable] = useState<Array<ICreditTable>>([]);
    const [sumOfPercentAmount , setSumOfPercentAmount] = useState<number>(0)

    const calculateWithFormula = (i) => {
        let principalAmount = (Number(amount) / Number(period)).toFixed(2);
        return () => {
            let closureAmount = Number(amount) - (principalAmount * i);
            let formula = Number(Math.round((((closureAmount * Number(percent)) / 100) / 360) * 30).toFixed(0))
            return {
                month: i + 1,
                principalAmount,
                monthlyPercent: formula,
                sum: (formula*100 + principalAmount*100)/100
            }
        }
    }


    const calculateCreditTable = () => {
        let tables = [];

        for (let i = 0; i < Number(period); i++) {
            const calcFormula = calculateWithFormula(i);
            tables.push(calcFormula())
        }
        const sum = tables.reduce((previousValue,
                            currentValue)=>
            previousValue + currentValue.monthlyPercent,0);
        setSumOfPercentAmount(sum);
        setCreditTable([...tables]);
        dispatch(CreditAppealActions.updateCreditCalculator(sum));
    }

    useEffect(() => {
        calculateCreditTable();
    }, []);

    return (
        <div className={styles.creditAppeal__content__creditCalculator}>
            <Paper style={{padding : 20}}>
                <Typography variant={"h6"}><>Kreditin müddəti</> : {period} ay</Typography>
                <Typography variant={"h6"}><>Kreditin faizi</> : {percent}%</Typography>
                <Typography variant={"h6"}><>Əsas məbləğ</> : {amount} <i>AZN</i></Typography>
                <Typography variant={"h6"}><>Faiz üzrə məbləğin ümumi cəmi</> : {sumOfPercentAmount}  <i>AZN</i></Typography>
                <Typography variant={"h6"}><>Cəm</> : {sumOfPercentAmount + +amount} <i>AZN</i></Typography>
            </Paper>
            <Paper>

                <TableContainer sx={{ maxHeight: 440 , minWidth : 500 }}>
                    <Table  stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ay</TableCell>
                                <TableCell>Əsas məbləğ</TableCell>
                                <TableCell align={"right"}>Faiz</TableCell>
                                <TableCell align={"right"}>Cəmi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {creditTable.map((row : ICreditTable , index :number) => (
                                <TableRow
                                    key={index}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.month}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.principalAmount} AZN
                                    </TableCell>
                                    <TableCell align="right">{row.monthlyPercent} AZN</TableCell>
                                    <TableCell align="right">{row.sum} AZN</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default CreditCalculator;
