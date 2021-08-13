import React, { useMemo,useCallback,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../tabpanel';
import Table from "../table";
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import PatientDetailsForm from '../patientDetailsForm';
import ConfirmBedBookingDetails from './handleBedBookingConfirmModal';

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
  }
}));

function UserDashboard() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  // Confirm bed detail handler
  const handleConfirmBedBooking = useCallback( (details) => setmodal({type: "edit", data: details}), []);

  // State to show/hide modals
  const [modal, setmodal] = useState({
    type: null,
    data: null
  })
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
  const handleModalClose = useCallback(() => setmodal({type: null, data: null}),[])
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
    // <div>User Dashboard</div>
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
        {/* <Tab className="customStyle" label="Vaccination Details" icon={<CheckCircleIcon />} /> */}

      </Tabs>
      <TabPanel value={value} index={0}>
        <PatientDetailsForm></PatientDetailsForm>
        {/* <Typography component="h4" variant="h5" className={classes.title}> Hospital Details:</Typography>
        <div className={classes.tableContainer}>
          <Table columnMap={columnMap} rows={rows} />
        </div> */}
        <Box className={classes.BtnHolder}>
          <Button variant="contained" color="primary" onClick={handleConfirmBedBooking} className={classes.cnfrmBtn}>Confirm</Button>
        </Box>
        <ConfirmBedBookingDetails open={modal.type === "edit"} details={modal.data} onClose={handleModalClose} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography component="h4" variant="h5" className={classes.title}> Vaccine Slots:</Typography>
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
        </form>
      </TabPanel>

      {/* <TabPanel value={value} index={2}>
        <Typography component="h4" variant="h5" className={classes.title}> Booking Details:</Typography>
      </TabPanel> */}
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