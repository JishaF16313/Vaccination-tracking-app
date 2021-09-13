import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { startLoading } from '../../../store/actions/loader/index';
import { loaderText } from '../../../utility/commonTexts';
import { deleteBedBooking, getPatientList, TYPES } from '../../../store/actions/hospitalAdmin/index';

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
  const dispatch = useDispatch();
  const [DischargePatient, selectDischargePatient] = useState([])
  const storeData = useSelector((store) => {
    return {
      PatientList: store.patientReducer,
      loggedInUserData: store.auth,
    }
  });
  let token = storeData.loggedInUserData.token;
  let hospitalPatientData = storeData.PatientList.hospitalPatientData;

  useEffect(() => {
    dispatch(startLoading(loaderText));
    dispatch(getPatientList(token));
  }, [token==null]);
  
  const [selectedPatientArray, setSelectedPatientArray] = useState([]);


  const handleCellClick = (param, event) => {
    if (param.colIndex === 2) {
      event.stopPropagation();
    }
  };

  const SelectPatientRow = (row) => {
    const BookingIdArray = hospitalPatientData.filter((el) => {
      return row.includes(el.id);
    }).map((element)=>{
      return element.bookingId;
    });
    selectDischargePatient(BookingIdArray);
  }

  const DischargeHandler = (SelectedRowArray) => {
    dispatch(deleteBedBooking(DischargePatient));
    dispatch({ type: TYPES.TOTAL_PATIENT_COUNT, payload: hospitalPatientData.length-DischargePatient.length });
  }



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
          checkboxSelection={true}
          onSelectionModelChange={SelectPatientRow}
        />
      </div>

      {/* <Table columnMap={columnMap} rows={hospitalPatientData} onEdit={handleBedEdit} onDelete={handleBedDelete} /> */}
      <Button className={`${classes.upload_button}`} disabled={DischargePatient.length<1 ? true : false}  onClick={DischargeHandler} variant="contained" color="primary">
        DISCHARGE
      </Button>
      {/* <EditBedModel open={modal.type === "edit"} details={modal.data} onClose={handleModalClose}></EditBedModel>*/}

    </div>
  );
}

