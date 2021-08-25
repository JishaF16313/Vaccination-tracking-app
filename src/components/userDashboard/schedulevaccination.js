import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getAvailableVaccineByDate, scheduleVaccination } from '../../store/actions/schedulevaccination/index';
import { dateNow, parseJwt } from '../../utility/commonFunctions';
import { startLoading } from '../../store/actions/loader';
import ScheduleVaccinationConfirmModal from './schedulevaccinationconfirmmodal';
import { setAlert } from '../../store/actions/alert';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cnfrmBtn: {
        marginTop: '-30px',
        height: 40,
        float: 'right',
        position: 'relative'
    },
    BtnHolder: {
        marginTop: '60px'
    },
    divStyle: {
        paddingTop: theme.spacing(2)
    },
    container: {
        marginTop: '10px'
    },
    noDataDiv: {
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px'
    },
    dateField: {
        marginTop: '10px',
        marginBottom: '20px'
    },
    doseTypeRadioGroup: {
        marginTop: '20px',
        marginLeft: '70px'
    },
    doseLabel: {
        fontSize: '16px'
    },
    dateLabel: {
        fontSize: '16px',
        marginTop: '20px'
    },
    doseTypeOptions: {
        marginTop: '10px'
    }
}));

function ScheduleVaccination() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [doseValue, setDoseType] = useState("first");
    const [selectedRow, setSelectedRow] = useState(null);

    const classes = useStyles();

    const storeData = useSelector((store) => {
        return {
            data: store.schedulevaccination,
            loggedInUserData: store.auth,
        }
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoading('Please wait...'));
        let date = dateNow();
        let token = storeData.loggedInUserData.token;
        dispatch(getAvailableVaccineByDate(date, token));
    }, []);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            hide: true
        },
        {
            field: 'branch-id',
            headerName: 'Branch ID',
            hide: true
        },
        {
            field: 'hospitalName',
            headerName: 'Hospital Name',
            width: 300
        },
        {
            field: 'branch-name',
            headerName: 'Branch name',
            width: 300
        },
        {
            field: 'vaccine-type',
            headerName: 'Vaccine Type',
            width: 300
        },
        {
            field: 'no-of-slot-available',
            headerName: 'Slots',
            width: 300
        }
    ];

    const setCurrentDate = () => {
        let now = new Date();
        let year = now.getFullYear();
        let month = ("0" + (now.getMonth() + 1)).slice(-2);
        let date = ("0" + now.getDate()).slice(-2);
        now = `${year}-${month}-${date}`;
        return now;
    }

    const dateChanged = (event) => {
        let val = (event.target.value).split('-');
        let selectedDate = `${val[2]}-${val[1]}-${val[0]}`;
        setSelectedDate(selectedDate);
        let token = storeData.loggedInUserData.token;
        dispatch(getAvailableVaccineByDate(selectedDate, token));
    }

    const rowSelected = (event) => {
        let selectedRow = event.row;
        let token = storeData.loggedInUserData.token;
        if (token) {
            let userInfo = parseJwt(token);
            let obj = {
                "hospital-name": selectedRow["hospitalName"],
                "city": userInfo.cityName,
                "pincode": userInfo.pinCode,
                "branch_id": selectedRow["branch-id"],
                "adhar": userInfo.sub,
                "vaccination-type": selectedRow["vaccine-type"],
                "firstDoseDate": (doseValue === "first" ? (selectedDate ? selectedDate : dateNow()) : ""),
                "date": selectedDate ? selectedDate : dateNow(),
                "secondDoseDate": (doseValue === "second" ? (selectedDate ? selectedDate : dateNow()) : ""),
                "secondVaccinationType": (doseValue === "second" ? selectedRow["vaccine-type"] : "")
            }
            setSelectedRow(obj);
        }
    }

    const handleDoseTypeChange = (event) => {
        setDoseType(event.target.value);
        let data = selectedRow;
        if (data) {
            if (event.target.value === "first") {
                data.secondDoseDate = "";
                data.secondVaccinationType = "";
                data.firstDoseDate = selectedDate ? selectedDate : dateNow();
            } else {
                data.secondDoseDate = selectedDate ? selectedDate : dateNow();
                data.firstDoseDate = "";
            }
            setSelectedRow(data);
        }
    }

    const handleScheduleClick = (event) => {
        if (selectedRow) {
            dispatch(startLoading('Please wait...'));
            let token = storeData.loggedInUserData.token;
            dispatch(scheduleVaccination(selectedRow, token));
        } else {
            dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: "Please select a row from the list of available slots." }));
        }
    }

    return (
        <React.Fragment>
            <Typography component="h3" variant="h5">Slots Available</Typography>
            <FormControl>
                <FormLabel component="legend" className={classes.dateLabel}>Date of Booking</FormLabel>
                <TextField type="date" defaultValue={setCurrentDate()} className={classes.dateField} InputLabelProps={{ shrink: true }} onChange={(event) => dateChanged(event)} />
            </FormControl>
            <FormControl component="fieldset" className={classes.doseTypeRadioGroup}>
                <FormLabel component="legend" className={classes.doseLabel}>Select Dose Type</FormLabel>
                <RadioGroup className={classes.doseTypeOptions} row value={doseValue} onChange={(e) => handleDoseTypeChange(e)}>
                    <FormControlLabel value="first" control={<Radio color="primary" />} label="First Dose" />
                    <FormControlLabel value="second" control={<Radio color="primary" />} label="Second Dose" />
                </RadioGroup>
            </FormControl>
            {storeData.data.availableVaccineList && storeData.data.availableVaccineList.length > 0 && (
                <React.Fragment>
                    <div className={classes.divStyle} style={{ height: 250, width: '100%' }}>
                        <DataGrid onRowClick={(event) => rowSelected(event)} disableMultipleSelection={true} rows={storeData.data.availableVaccineList} columns={columns} pageSize={5} />
                    </div>
                    <div className={classes.BtnHolder}>
                        <Button variant="contained" color="primary" className={classes.cnfrmBtn} onClick={(e) => handleScheduleClick(e)}>Schedule</Button>
                    </div>
                </React.Fragment>
            )}
            {(!storeData.data.availableVaccineList || storeData.data.availableVaccineList.length <= 0) && (
                <div className={classes.noDataDiv}>No data to display...</div>
            )}
            {storeData.data.scheduledVaccinationData && (
                <ScheduleVaccinationConfirmModal open={storeData.data.openeVaccinationConfirmPopup} data={storeData.data.scheduledVaccinationData} />
            )}
        </React.Fragment>
    )
}

export default ScheduleVaccination;
