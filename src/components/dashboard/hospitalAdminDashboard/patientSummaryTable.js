import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  display_Inline: {
    display: 'inline',
  },
  upload_button: {
    float: 'right',
    margin: '20px'

  },

}));

export default function BedForm() {
  const classes = useStyles();
  const { hospitalPatientData } = useSelector(store => store.patientReducer)

  const [selectedPatientArray, setSelectedPatientArray] = useState([]);
  

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

  const columnMap = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200,
      editable: false,
    },
    {
      field: 'bookingId',
      headerName: 'Booking Id',
      width: 200,
      editable: false,
    },
    {
      field: 'patientName',
      headerName: 'Patient Name',
      width: 200,
      editable: true,
    },
    {
      field: 'aadharCard',
      headerName: 'Aadhar Card',
      type: 'number',
      width: 200,
      editable: true,
    },
    {
      field: 'bedType',
      headerName: 'Bed Type',
      type: 'number',
      width: 200,
      editable: true,
    },
    {
      field: 'bedFacility',
      headerName: 'Bed Facility',
      type: 'number',
      width: 200,
      editable: true,
    },
    {
      field: 'admissionStatus',
      headerName: 'Admission Status',
      type: 'number',
      width: 200,
      editable: true,
    },
  ];

  return (
    <div className={classes.root}>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          className={classes.root}
          rows={hospitalPatientData}
          columns={columnMap}
          pageSize={50}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={handleRowClick}
        />
      </div>

      {/* <Table columnMap={columnMap} rows={hospitalPatientData} onEdit={handleBedEdit} onDelete={handleBedDelete} /> */}
      <Button className={classes.upload_button} variant="contained" color="primary">
        DISCHARGE
      </Button>
	   {/* <EditBedModel open={modal.type === "edit"} details={modal.data} onClose={handleModalClose}></EditBedModel>*/}

    </div>
  );
}

