import React, { useMemo, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../tabpanel';
import Table from "../table";
import { Typography } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import PatientDetailsForm from '../patientDetailsForm';
import PatientList from "../patientList";
import HospitalDataTable from '../hospitalDataTable';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ScheduleVaccination from './schedulevaccination';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../inputfield/index';
import { GetBookingStatus } from '../../store/actions/patientDetails/index';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading } from '../../store/actions/loader/index';
import ConfirmBedBookingDetails from '../userDashboard/handleBedBookingConfirmModal';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PDFReports from '../reports/pdfReports';
import PatientCreateForm from "../patientCreate/index";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BedTwoToneIcon from '@material-ui/icons/KingBedOutlined';
//import logo from "./logo192.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  customStyle: {
    fontWeight: 500
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
  show: {
    display: 'block'
  },
  hidden: {
    display: 'none'
  },
  field: {
    marginTop: theme.spacing(1)
  },
  btnDiv: {
    marginTop: theme.spacing(2)
  },
  errorField: {
    color: 'red',
    marginTop: theme.spacing(1)
  }
}));

const validate = Yup.object({
  bookingStatus: Yup.string().max(100).required("Booking ID is required")
});


function UserDashboard() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const storeData = useSelector((store) => {
    return {
      loggedInUserData: store.auth,
      data: store.patientdetails
    }
  });
  const dispatch = useDispatch();

  const submitForm = (values) => {
    console.log("values", values);
    let token = storeData.loggedInUserData.token;
    dispatch(startLoading('Please wait...'));
    dispatch(GetBookingStatus(values, token));
      // console.log("store",storeData);
    // handleConfirmBedBooking(data);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  // Confirm bed detail handler
  const handleConfirmBedBooking = useCallback((details) => setmodal({ type: "edit", data: details }), []);

  // State to show/hide modals
  const [modal, setmodal] = useState({
    type: null,
    data: null
  });


  // Column title mappings for hospital bed details
  const columnMap = useMemo(() => [{
    title: "Hospital Name",
    field: "hospitalName"
  }, {
    title: "ID",
    field: "id"
  }, {
    title: "Address",
    field: "address"
  }, {
    title: "Beds Available",
    field: "availableBeds"
  }, {
    title: "Beds with Oxygen Cylinder",
    field: "bedsWithOxygen"
  }, {
    title: "Action",
    field: "selected"
  }], [])

  // Closing the modal
  const handleModalClose = useCallback(() => setmodal({ type: null, data: null }), [])
  // Vaccination data - to be called from API
  const rows = data;

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
 

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
         <Tab className="customStyle" label="Patients" icon={<AddCircleOutlineIcon />} />
        <Tab className="customStyle" label="Book A Bed" icon={<BedTwoToneIcon />} />
        <Tab className="customStyle" label="Schedule Vaccine" icon={<CalendarTodayIcon />} />
        <Tab className="customStyle" label="Booking Status" icon={<CheckCircleIcon />} />
        <Tab className="customStyle" label="Reports" icon={<AssessmentIcon />} />

      </Tabs>
      <TabPanel value={value} index={0}>
        <PatientList actions={true} ></PatientList>
      </TabPanel>
      
      <TabPanel value={value} index={1}>
      {/* <PatientDetailsForm></PatientDetailsForm> */}
      <PatientList actions={false} ></PatientList>
        <HospitalDataTable></HospitalDataTable>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <ScheduleVaccination />
              {/* <Typography component="h4" variant="h5" className={classes.title}> Vaccine Slots:</Typography>
        <form className={classes.container} noValidate>
          <TextField
            id="datetime-local"
            label="Date of Booking"
            type="datetime-local"
            defaultValue="2021-08-06T17:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <div className={classes.divStyle} style={{ height: 250, width: '100%' }}>
            <DataGrid
              rows={rows1}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
          </div>
          <Box className={classes.BtnHolder}>
            <Button variant="contained" color="primary" className={classes.cnfrmBtn}>Schedule</Button>
          </Box>
        </form> */}
              </TabPanel>

      <TabPanel value={value} index={3}>
        <Typography component="h4" variant="h5" className={classes.title}> Get Booking Details:</Typography>
        <div className={classes.bookingTextField}>
          <Formik initialValues={{ bookingStatus: '' }} validationSchema={validate} onSubmit={values => submitForm(values)}>
            {formik => (
              <Form>
                <div className={classes.field}>
                  <InputField label="Add Booking ID" onChange={(e) => formik.setFieldValue('bookingStatus', e.target.value)} name="bookingStatus" type="text" classes={classes} />
                </div>

                <div className={classes.btnDiv}>
                  <Button variant="contained" color="primary" size="medium" type="submit">Get Status</Button>
                </div>
                <ConfirmBedBookingDetails open={storeData.data.openModal} details={storeData.data.bookingDetails} onClose={handleModalClose} />
              </Form>
            )}
          </Formik>
        </div>

      {/* {storeData.data.bookingDetails && (
          <div>
          <p>Booking ID : {storeData.data.bookingDetails[0].bookingId} </p>
          <p>Booking Status : {storeData.data.bookingDetails[0].bookingStatus} </p>
          <p>Hospital ID : {storeData.data.bookingDetails[0].Hospital["hospital-id"]} </p>
          <p>Branch Name : {storeData.data.bookingDetails[0].Hospital["hospital-branch-id"]} </p>
          <p>City : {storeData.data.bookingDetails[0].Hospital.LocationDetail.city_name} </p>
          <p>Pincode : {storeData.data.bookingDetails[0].Hospital.LocationDetail.pin_number} </p>
          <p>Bed Type : {storeData.data.bookingDetails[0].Hospital.Bed['bed-type']} </p>
          <p>Facility : {storeData.data.bookingDetails[0].Hospital.Bed['bed-facility']} </p>
        </div>
        )} */}      
        </TabPanel>
  
      <TabPanel value={value} index={4}>
        <PDFReports/>
      </TabPanel>
  
    </Paper>
  )
}

const data = [{
  id: 100,
  hospitalName: "Kims Hospital",
  address: "Hyderabad",
  availableBeds: 10,
  bedsWithOxygen: 'Y',
  selected: false
}, {
  id: 102,
  hospitalName: "Mahavir Jain Hospitals",
  address: "Bengaluru",
  availableBeds: 5,
  bedsWithOxygen: 'Y',
  selected: false
}, {
  id: 103,
  hospitalName: "Apollo Hospitals",
  address: "Hyderabad",
  availableBeds: 22,
  bedsWithOxygen: 'Y',
  selected: false
}, {
  id: 104,
  hospitalName: "Prestine Hospitals",
  address: "Bengaluru",
  availableBeds: 8,
  bedsWithOxygen: 'N',
  selected: false
},]

export default UserDashboard
