import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getAvailableVaccineByDate, scheduleVaccination } from '../../store/actions/schedulevaccination/index';
import { dateNow, parseJwt } from '../../utility/commonFunctions';
import { startLoading } from '../../store/actions/loader';


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
        marginTop: '20px',
        marginBottom: '20px'
    }
}));

function ScheduleVaccination() {
    const [selectedDate, setSelectedDate] = useState();
    const [selectedRow, setSelectedRow] = useState();

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
            width: 250
        },
        {
            field: 'branch-name',
            headerName: 'Branch name',
            width: 250
        },
        {
            field: 'vaccine-type',
            headerName: 'Vaccine Type',
            width: 200
        },
        {
            field: 'no-of-slot-available',
            headerName: 'Slots',
            width: 200
        }
    ];

    const setCurrentDate = () => {
        let now = new Date();
        let year = now.getFullYear();
        let month = ("0" + (now.getMonth() + 1)).slice(-2);
        let date = ("0" + now.getDate()).slice(-2);
        now = `${year}-${month}-${date}`;
        //setSelectedDate(now);
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
        let userInfo = parseJwt(token);
        let obj = {
            "hospital-name": selectedRow["hospitalName"],
            "city": userInfo.cityName,
            "pincode": userInfo.pinCode,
            "branch_id": selectedRow["branch-id"],
            "adhar": userInfo.sub,
            "vaccination-type": selectedRow["vaccine-type"],
            "firstDoseDate": selectedDate,
            "date": selectedDate
        }
        setSelectedRow(obj);
        //dispatch(scheduleVaccination(obj, token));
    }

    return (
        <React.Fragment>
            <Typography component="h3" variant="h5">Slots Available</Typography>
            <TextField
                label="Date of Booking"
                type="date"
                defaultValue={setCurrentDate()}
                className={classes.dateField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(event) => dateChanged(event)}
            />
            {storeData.data.availableVaccineList && storeData.data.availableVaccineList.length > 0 && (
                <React.Fragment>
                    <div className={classes.divStyle} style={{ height: 300, width: '100%' }}>
                        <DataGrid onRowClick={(event) => rowSelected(event)} disableMultipleSelection={true} rows={storeData.data.availableVaccineList} columns={columns} pageSize={5} />
                    </div>
                    <div className={classes.BtnHolder}>
                        <Button variant="contained" color="primary" className={classes.cnfrmBtn}>Schedule</Button>
                    </div>
                </React.Fragment>
            )}
            {(!storeData.data.availableVaccineList || storeData.data.availableVaccineList.length <= 0) && (
                <div className={classes.noDataDiv}>No data to display...</div>
            )}
        </React.Fragment>
    )
}

export default ScheduleVaccination;
