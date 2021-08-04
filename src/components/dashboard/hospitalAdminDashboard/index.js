import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: '#3c3d70',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    availability_status_wrapper: {
        backgroundColor: '#337ab7',
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
    },
    upload_button: {
        padding: '10px 22px',
        backgroundColor: '#5cb85c',
        color: '#FFFFFF',
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '900',
        position: 'absolute',
        top: '2px',
        left: '40px'
    }
}));

export default function HospitalAdmin() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.availability_status_wrapper}>
                        <button className={classes.upload_button}>Bulk upload bed details</button>
                        <p style={{"textAlign" : "center"}} className={classes.availability_status}>Bed Availability Status</p>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        Beds booked in the hospital
                    </Paper>
                    <Paper className={classes.numbers}>
                        50
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>How many people are vaccinated</Paper>
                    <Paper className={classes.numbers}>
                        5,00,000
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>How many beds are available</Paper>
                    <Paper className={classes.available_number}>
                        25,000
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

