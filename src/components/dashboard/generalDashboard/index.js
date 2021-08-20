import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { getAllReport } from '../../../store/actions/dashboard/index';
import { startLoading } from '../../../store/actions/loader/index';
import { useSelector, useDispatch } from 'react-redux';
import { loaderText, bookBedText, totalPatientText, bedsAvailableText, peopleVaccinatedText, vaccineAvailableText } from '../../../utility/commonTexts';
import history from '../../../routes/history';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2%"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: '#3c3d70',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    availability_status_wrapper: {
        padding: '8px 0',
        position: 'relative'
    },
    availability_status: {
        margin: 0,
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: '20px'
    },
    numbers: {
        fontWeight: 'bolder',
        textAlign: 'center',
        fontSize: '44px',
        color: '#fd5656',
        letterSpacing: '1px',
    },
    available_number: {
        fontWeight: 'bolder',
        textAlign: 'center',
        fontSize: '44px',
        color: '#23c83f'
    }
}));

export default function GeneralDashboard({ hideBookBedAction, ...props }) {
    const classes = useStyles();

    const storeData = useSelector((state) => {
        return {
            data: state.dashboard
        }
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (storeData.data.getAllReportData === null) {
            dispatch(startLoading(loaderText));
            dispatch(getAllReport());
        }
    }, []);

    const onBookBedClick = (event) => {
        history.push('/signIn');
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {!hideBookBedAction && (
                    <Grid item xs={12}>
                        <div className={classes.availability_status_wrapper}>
                            <Button size="small" variant="contained" color="primary" onClick={(event) => onBookBedClick(event)}>{bookBedText}</Button>
                        </div>
                    </Grid>
                )}
                <React.Fragment>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>{totalPatientText}</Paper>
                        <Paper className={classes.numbers}>
                            {storeData.data.getAllReportData ? (storeData.data.getAllReportData.numberOfPatient ? storeData.data.getAllReportData.numberOfPatient : 0) : 0}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>{bedsAvailableText}</Paper>
                        <Paper className={classes.numbers}>
                            {storeData.data.getAllReportData ? (storeData.data.getAllReportData.noOfBedAvailable ? storeData.data.getAllReportData.noOfBedAvailable : 0) : 0}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>{peopleVaccinatedText}</Paper>
                        <Paper className={classes.available_number}>
                            {storeData.data.getAllReportData ? (storeData.data.getAllReportData.vaccinatedPeople ? storeData.data.getAllReportData.vaccinatedPeople : 0) : 0}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>{vaccineAvailableText}</Paper>
                        <Paper className={classes.available_number}>
                            {storeData.data.getAllReportData ? (storeData.data.getAllReportData.vaccineAvailable ? storeData.data.getAllReportData.vaccineAvailable : 0) : 0}
                        </Paper>
                    </Grid>
                </React.Fragment>
            </Grid>
        </div>
    );
}

