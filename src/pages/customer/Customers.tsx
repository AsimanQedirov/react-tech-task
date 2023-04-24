import {Paper, Typography} from "@mui/material";
import styles from './Customer.module.scss';
import CreateNewCustomer from "./components/CreateNewCustomer";
import CustomerList from "./components/CustomerList";

const Customers = () => {

    return (
        <div className={styles.customer}>
            <Paper className={styles.customer__header}>
                <Typography variant="h6">Müştərilər səhifəsi</Typography>
                <CreateNewCustomer/>
            </Paper>
            <Paper className={styles.customer__content}>
                <CustomerList/>
            </Paper>

        </div>
    );
};

export default Customers;
