import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button"

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

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {!hideBookBedAction && (
                    <Grid item xs={12}>
                        <div className={classes.availability_status_wrapper}>
                            <Button size="small" variant="contained" color="primary">Book Bed</Button>
                        </div>
                    </Grid>
                )}
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        Total Covid Patients
                    </Paper>
                    <Paper className={classes.numbers}>
                        50000
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>Beds Available</Paper>
                    <Paper className={classes.numbers}>
                        5,00,000
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>People Vaccinated</Paper>
                    <Paper className={classes.available_number}>
                        25,000
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

