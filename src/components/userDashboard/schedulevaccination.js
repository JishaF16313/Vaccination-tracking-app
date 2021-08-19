import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

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
    }
}));

function ScheduleVaccination() {
    const classes = useStyles();

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100
        },
        {
            field: 'hospitalName',
            headerName: 'Hospital Name',
            width: 180,
            editable: true,
        },
        {
            field: 'branchName',
            headerName: 'Branch name',
            width: 180,
            editable: true,
        },
        {
            field: 'vaccineType',
            headerName: 'Vaccine Type',
            width: 150,
            editable: true,
        },
        {
            field: 'slots',
            headerName: 'Slots',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'address',
            headerName: 'Address',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.getValue(params.id, 'hospitalName') || ''} ${params.getValue(params.id, 'branchName') || ''
                }`,
        },
    ];

    const rows1 = [
        { id: 1, branchName: 'K R Puram', hospitalName: 'MaxCure', vaccineType: 'Covishield', slots: 10 },
        { id: 2, branchName: 'KukatPally', hospitalName: 'Care Hospital', vaccineType: 'Covaxin', slots: 20 }
    ];

    const dateTimeNow = (e) => {
        let now = new Date();
        let year = now.getFullYear();
        let month = ("0" + (now.getMonth() + 1)).slice(-2);
        let date = ("0" + now.getDate()).slice(-2);
        let hour = ("0" + now.getHours()).slice(-2);
        let minute = ("0" + now.getMinutes()).slice(-2);
        now = `${year}-${month}-${date}T${hour}:${minute}`;
        return now;
    }

    const dateChanged = (event) => {
        let val = event.target.value;
    }

    return (
        <React.Fragment>
            <Typography component="h4" variant="h5" className={classes.title}> Vaccine Slots</Typography>
            <form className={classes.container} noValidate>
                <TextField
                    id="datetime-local"
                    label="Date of Booking"
                    type="datetime-local"
                    defaultValue={dateTimeNow()}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => dateChanged(event)}
                />
                <div className={classes.divStyle} style={{ height: 250, width: '100%' }}>
                    <DataGrid rows={rows1} columns={columns} pageSize={5} checkboxSelection />
                </div>
                <Box className={classes.BtnHolder}>
                    <Button variant="contained" color="primary" className={classes.cnfrmBtn}>Schedule</Button>
                </Box>
            </form>
        </React.Fragment>
    )
}

export default ScheduleVaccination;
