import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addBed } from '../../../store/actions/hospitalAdmin/index'

import PatientSummaryTable from './patientSummaryTable';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },

    inputField: {
        width: '50%',
        margin: '0 0 22px 0'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: '#3c3d70',
        fontSize: '18px',
        fontWeight: 'bold',
        width: '50%'
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
        float: 'right',
        margin: '20px'

    }
}));

const HospitalBedBulkUpload = (props) => {

    const storeData = useSelector((store) => {        
        return {
            data: store.hospitals,
            loggedInUserData: store.auth
        }
    });

    const [bedCount, setBed] = useState(0);
    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();


    const classes = useStyles();

    const handleCellClick = (param, event) => {
        if (param.colIndex === 2) {
            event.stopPropagation();
        }
    };

    const handleRowClick = (param) => {
        if (param && param.length) {
            
            //setSelectedPatientArray(selectedPatientArray => [...selectedPatientArray, param.row.bookingId]);
          }
    };
    const handleBedValueChange = (event) => {
        setBed(event.target.value);
    }

    const createTempTable = () => {
        let initialRow = [];
        for(let i = 1; i<=bedCount; i++) {
            initialRow.push({
                id : i,
                bedType : "",
                facility : ""
            })
        }
        setRows(initialRow);
    }

    const uploadBeds = () => {
        let obj = {
                    "Beds": rows,
                    "branchId": "630a6b33-b2c0-4870-83f1-e5941baf3afe",
                    "branchName": "INS-1"
                }
        let token = storeData.loggedInUserData.token;
        dispatch(addBed(obj, token));

    }

    const handleCellEditCommit = React.useCallback(
        ({ id, field, value }) => {
          if (field === 'bedType') {
            const bedType = value
            const updatedRows = rows.map((row) => {
              if (row.id === id) {
                return { ...row, bedType };
              }
              return row;
            });
            setRows(updatedRows);
          }
          if (field === 'facility') {
            const facility = value
            const updatedRows = rows.map((row) => {
              if (row.id === id) {
                return { ...row, facility };
              }
              return row;
            });
            setRows(updatedRows);
          }
        },
        [rows],
      );

    const columnMap = [
        {
            field: 'id',
            headerName: 'Serial No',
            width: 200,
            editable: false,
        },
        {
            field: 'bedType',
            headerName: 'Bed Type',
            width: 200,
            editable: true,
        },
        {
            field: 'facility',
            headerName: 'Facility',
            width: 200,
            editable: true,
        },

    ];

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Paper>
                        <ButtonGroup className={classes.buttons_wrapper} variant="text" color="primary" aria-label="text primary button group">
                            <Button>Upload History</Button>
                            <Button onClick={() => props.handelShowHide(props.showBulkUpload)}>Dashboard</Button>
                            <Button>User Details</Button>
                        </ButtonGroup>
                    </Paper>
                </Grid>
                <Grid item xs={12} style={{"display" : "flex"}}>
                    <Paper className={classes.paper}>
                        Bed Available <TextField type="number" onChange={(event) => handleBedValueChange(event)} name="normal" value={bedCount} className={classes.inputField} id="all-bed" />
                    </Paper>
                    <Paper className={classes.paper}>
                        Add Bed<Button className={classes.numbers}><AddIcon onClick={(event) => createTempTable(event)}></AddIcon></Button>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <div style={{ height: 300, width: '100%' }}>
                        <DataGrid
                            className={classes.root}
                            rows={rows}
                            columns={columnMap}
                            pageSize={50}
                            disableSelectionOnClick
                            onSelectionModelChange={handleRowClick}
                            onCellEditCommit={handleCellEditCommit}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                <Button className={classes.upload_button} onClick={uploadBeds} variant="contained" color="primary">
                    UPLOAD
                </Button>
                </Grid>
            </Grid>
        </div>

    )
}


export default HospitalBedBulkUpload

