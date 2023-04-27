import {Fragment, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonAbout from "./components/PersonAbout";
import CreditCalculator from "./components/CreditCalculator";
import AddGuarantor from "./components/AddGuarantor";
import CreditAbout from "./components/CreditAbout";
import Summary from "./components/Summary";
import {ReactElementSignature} from "../../app/types/common";
import {Alert, Paper, Snackbar} from "@mui/material";
import styles from './CreditAppeal.module.scss';
import {useAppDispatch, useAppSelector} from "../../app/store/store";
import {CreditAppealActions} from "./features/creditAppealSlice";
import {IAboutCredit, IGuarantor, IPersonDetail} from "./types/common";
import CancellationDialog from "./components/CancellationDialog";
import ConfirmationDialog from "./components/ConfirmationDialog";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {ICustomer} from "../customer/types/common";
import {axiosInstance} from "../../app/interceptor";

const steps = [{
    key: 0,
    text: 'Şəxs haqqında məlumat'
}, {
    key: 1,
    text: 'Kedit barədə məlumat'
}, {
    key: 2,
    text: 'Zaminin əlavəsi'
}, {
    key: 3,
    text: 'Kredit Kalkulyatoru'
}, {
    key: 4,
    text: 'Xülasə'
}];


const CreditAppeal = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const creditAppealSlice = useAppSelector(store => store.creditAppealSlice);

    const [activeStep, setActiveStep] = useState<number>(0);
    const [openSnack, setOpenSnack] = useState({
        open: false,
        message: "",
        type: "success"
    });
    const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);

    const personRef = useRef<HTMLFormElement>();
    const aboutCreditRef = useRef<HTMLFormElement>();
    const guarantorRef = useRef<HTMLElement>();

    const handleNext = () => {
        switch (activeStep) {
            case 0:
                personRef?.current?.requestSubmit();
                break;
            case 1:
                aboutCreditRef?.current?.requestSubmit();
                break;
            case 2:
                guarantorRef?.current?.click();
                break;
            default:
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const submitForm = (key: string, data: IPersonDetail | IAboutCredit | IGuarantor[]) => {
        if (key === "personDetail") {
            dispatch(CreditAppealActions.updatePersonDetail(data));
        } else if (key === "aboutCredit") {
            dispatch(CreditAppealActions.updateAboutCredit(data))
        } else if (key === "guarantors") {
            dispatch(CreditAppealActions.updateGuarantors(data));
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const renderUI: ReactElementSignature = {
        "0": <PersonAbout personRef={personRef} submitted={submitForm}/>,
        "1": <CreditAbout aboutCreditRef={aboutCreditRef} submitted={submitForm}/>,
        "2": <AddGuarantor guarantorRef={guarantorRef} submitted={submitForm}/>,
        "3": <CreditCalculator/>,
        "4": <Summary/>
    }

    const getCustomerById = async () => {
        try {
            const response = await axiosInstance(`customers/${id}`);
            setCustomer(response.data);
        } catch (e) {
            throw new Error('Something went wrong!');
        }
    }
    const submitCancellation = async (note: string) => {
        const existingCancellationMessage = customer.cancellationMessage ?? [];
        existingCancellationMessage.push({
            message: note,
            cancellationDate: (new Date()).toString()
        })
        try {
            await axiosInstance.patch(`customers/${id}`, {
                cancellationMessage: existingCancellationMessage
            })
            setOpenSnack({...openSnack, open: true, message: "Müracətiniz uğurla ləğv edildi"});
            setTimeout(() => {
                dispatch(CreditAppealActions.resetState())
                backToCustomersPage();
            }, 2000)
        } catch (e) {
            throw new Error('Something went wrong!');
        }

    }
    const submitCreditAppeal = async () => {
        const existingCreditAppeals = customer.creditAppeals;
        existingCreditAppeals.push({
            personDetail: creditAppealSlice.personDetail,
            aboutCredit: creditAppealSlice.aboutCredit,
            guarantors: creditAppealSlice.guarantors
        });
        try {
            const response = await axiosInstance.patch(`customers/${id}`, {
                creditAppeals: [...existingCreditAppeals]
            })
            setOpenSnack({...openSnack, open: true, message: "Müracətiniz uğurla qeydə alındı!"});
            setTimeout(() => {
                dispatch(CreditAppealActions.resetState())
                backToCustomersPage();
            }, 2000)
        } catch (e) {
            throw new Error('Something went wrong!');
        }
    }

    const backToCustomersPage = () => navigate('/')

    useEffect(() => {
        getCustomerById();
    }, []);

    return (
        <div className={styles.creditAppeal}>
            <Button onClick={backToCustomersPage}><KeyboardBackspaceIcon/>Müştərilər səhifəsi</Button>
            <Box sx={{width: '100%'}}>

                <Stepper activeStep={activeStep} component={Paper} className={styles.creditAppeal__stepper}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        return (
                            <Step key={index} {...stepProps}>
                                <StepLabel>{label.text}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                {activeStep === steps.length ? (
                    <Fragment>
                        <Typography sx={{mt: 2, mb: 1}}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Box sx={{flex: '1 1 auto'}}/>
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Paper className={styles.creditAppeal__content}>
                            {renderUI[`${activeStep}`]}
                        </Paper>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Button
                                variant="contained"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{mr: 1}}
                            >
                                Geri
                            </Button>
                            <Box sx={{flex: '1 1 auto'}}/>

                            {activeStep !== steps.length - 1 &&
                                <Button onClick={handleNext} variant="contained">
                                    Sonrakı
                                </Button>}
                            {activeStep === steps.length - 1 &&
                                <>
                                    <CancellationDialog submitCancellation={submitCancellation}/>

                                    <ConfirmationDialog submitCreditAppeal={submitCreditAppeal}/>
                                </>
                            }
                        </Box>
                    </Fragment>
                )}
            </Box>
            <Snackbar
                autoHideDuration={2000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: "right"
                }}
                open={openSnack.open}
            >
                <Alert severity={openSnack.type}>{openSnack.message}</Alert>
            </Snackbar>
        </div>
    );
};

export default CreditAppeal;
