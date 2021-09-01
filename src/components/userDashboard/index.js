import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../tabpanel';
import { Typography } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import PatientDetailsForm from '../patientDetailsForm';
import HospitalDataTable from '../hospitalDataTable';
import Button from '@material-ui/core/Button';
import ScheduleVaccination from './schedulevaccination';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../inputfield/index';
import { GetBookingStatus } from '../../store/actions/patientDetails/index';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading } from '../../store/actions/loader/index';
import ConfirmBedBookingDetails from '../userDashboard/handleBedBookingConfirmModal';

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
  }
}));

const validate = Yup.object({
  bookingStatus: Yup.string().max(100).required("Add Booking ID")
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
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  
  // State to show/hide modals
  const [modal, setmodal] = useState({
    type: null,
    data: null
  });

  // Closing the modal
  const handleModalClose = useCallback(() => setmodal({ type: null, data: null }), [])
 
  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab className="customStyle" label="Book A Bed" icon={<AddToQueueIcon />} />
        <Tab className="customStyle" label="Schedule Vaccine" icon={<CalendarTodayIcon />} />
        <Tab className="customStyle" label="Booking Status" icon={<CheckCircleIcon />} />

      </Tabs>
      <TabPanel value={value} index={0}>
        <PatientDetailsForm></PatientDetailsForm>
        <HospitalDataTable></HospitalDataTable>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <ScheduleVaccination />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Typography component="h4" variant="h5" className={classes.title}> Get Booking Details:</Typography>
        <div className={classes.bookingTextField}>
          <Formik initialValues={{ bookingStatus: '' }} validationSchema={validate} onSubmit={values => submitForm(values)}>
            {formik => (
              <Form>
                <div className={classes.field}>
                  <InputField label="Get Booking Status" onChange={(e) => formik.setFieldValue('bookingStatus', e.target.value)} name="bookingStatus" type="text" classes={classes} />
                </div>

                <div className={classes.btnDiv}>
                  <Button variant="contained" color="primary" size="medium" type="submit">Get Status</Button>
                </div>
                <ConfirmBedBookingDetails open={storeData.data.openModal} details={storeData.data.bookingDetails} onClose={handleModalClose} />
              </Form>
            )}
          </Formik>
        </div>
      </TabPanel>
    </Paper>
  )
}

export default UserDashboard;
