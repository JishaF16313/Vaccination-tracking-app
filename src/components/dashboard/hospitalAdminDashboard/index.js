import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useSelector } from "react-redux";

import HospitalBedBulkUpload from './hospitalBedBulkUpload';
import PatientSummaryTable from './patientSummaryTable';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import UploadedHistory from './uploadHistory'


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
    buttons_wrapper: {
        padding: '8px 0',
        display: 'flex',
        justifyContent: 'flex-end'

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
    let [bookedBed, setBookedBed] = useState(0);
    let [showBulkUpload, setBulkUpload] = useState(false);
    let [showUploadHistory, setUploadHistory] = useState(false);
    const handelShowHide = (buttonVal) => {

        if(buttonVal === "history"){
            setUploadHistory(true);
            setBulkUpload(false)
        }else if (buttonVal === "upload"){
            setUploadHistory(false);
            setBulkUpload(true)
        }else{
            setUploadHistory(false)
            setBulkUpload(false)
        }
    }
    const storeData = useSelector((store) => {        
        return {
            data: store.bookedBed,
            loggedInUserData: store.auth
        }
    });
    return (
        <div className={classes.root}>
            {!showBulkUpload && !showUploadHistory &&
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper>
                            <ButtonGroup className={classes.buttons_wrapper} variant="text" color="primary" aria-label="text primary button group">
                                <Button onClick={()=>handelShowHide("history")}>Upload History</Button>
                                <Button onClick={()=>handelShowHide("upload")}>Bulk Upload</Button>
                                <Button>User Details</Button>
                            </ButtonGroup>
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
                    <Grid item xs={12}>
                         <PatientSummaryTable></PatientSummaryTable>
                    </Grid>
                   

                </Grid>
                
            }
            {showBulkUpload && <HospitalBedBulkUpload handelShowHide = {handelShowHide} showBulkUpload = {showBulkUpload}></HospitalBedBulkUpload>}
            {showUploadHistory && <UploadedHistory handelShowHide = {handelShowHide}  showUploadHistory = {showUploadHistory}></UploadedHistory>}
        </div>
    );
}

