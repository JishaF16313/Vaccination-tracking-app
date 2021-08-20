import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from 'react-redux';
import { getAvailableVaccineByDate } from '../../store/actions/schedulevaccination/index';
import { dateNow } from '../../utility/commonFunctions';
import { startLoading } from '../../store/actions/loader';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cnfrmBtn: {
        top: '50%',
        height: 40,
        float: 'right',
        position: 'relative'
    },
    BtnHolder: {
        marginTop: theme.spacing(2)
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
    }
}));

function ScheduleVaccination() {
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
        return now;
    }

    const dateChanged = (event) => {
        let val = (event.target.value).split('-');
        let selectedDate = `${val[2]}-${val[1]}-${val[0]}`;
        let token = storeData.loggedInUserData.token;
        dispatch(getAvailableVaccineByDate(selectedDate, token));
    }

    return (
        <React.Fragment>
            <Typography component="h4" variant="h5" className={classes.title}> Vaccine Slots</Typography>
            <form className={classes.container} noValidate>
                <TextField
                    label="Date of Booking"
                    type="date"
                    defaultValue={setCurrentDate()}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => dateChanged(event)}
                />
                {storeData.data.availableVaccineList && storeData.data.availableVaccineList.length > 0 && (
                    <React.Fragment>
                        <div className={classes.divStyle} style={{ height: 250, width: '100%' }}>
                            <DataGrid rows={storeData.data.availableVaccineList} columns={columns} pageSize={5} checkboxSelection />
                        </div>
                        <Box className={classes.BtnHolder}>
                            <Button variant="contained" color="primary" className={classes.cnfrmBtn}>Schedule</Button>
                        </Box>
                    </React.Fragment>
                )}
                {(!storeData.data.availableVaccineList || storeData.data.availableVaccineList.length <= 0) && (
                    <div className={classes.noDataDiv}>No data to display...</div>
                )}
            </form>
        </React.Fragment>
    )
}

export default ScheduleVaccination;
