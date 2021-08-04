import React, {useMemo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../tabpanel';
import Table from "../table";
import { Typography  } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  customStyle: {
      fontWeight:500
  },
  //styling
 box: {
    height: 100,
    display: "flex",
    border: "1px solid black",
    padding: 8
  },
  centerBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
});


function UserDashboard() {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    }

     // Column title mappings for hospital bed details
     const columnMap = useMemo(  () => [{
        title: "Hospital Name",
        field: "hospitalName"
    },{
        title: "ID",
        field: "id"
    },{
        title: "Address",
        field: "address"
    },{
        title: "Beds Available",
        field: "availableBeds"
    },{
        title: "Beds with Oxygen Cylinder",
        field: "bedsWithOxygen"
    },{
        title: "Action",
        field: "selected"
    }], [])

    // Vaccination data - to be called from API
    const rows = data;

    return(
        // <div>User Dashboard</div>
        <Paper className={classes.root}>
        <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        >
        <Tab className="customStyle" label="Book A Bed" />
        <Tab className="customStyle" label="Vaccination Details" />
        <Tab className="customStyle" label="Schedule Vaccine" />

      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography component="h4" variant="h5" className={classes.title}> Hospital Details:</Typography>
            <div className={classes.tableContainer}>
            <Table columnMap={columnMap} rows={rows} />
            </div>
            {/* <Button variant="contained" color="primary" size="medium" type="submit">Confirm</Button> */}
            <Box component="span" m={1} className={`${classes.bottomLeftBox} ${classes.box}`}>
                <Button variant="contained" color="primary" style={{ height: 40 }}>Confirm</Button>
            </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Typography component="h4" variant="h5" className={classes.title}> Booking Details:</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Typography component="h4" variant="h5" className={classes.title}> Vaccine Slots:</Typography>
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
},{
    id: 102,
    hospitalName: "Mahavir Jain Hospitals",
    address: "Bengaluru",
    availableBeds: 5,
    bedsWithOxygen: 'Y',
    selected: false 
},{
    id: 103,
    hospitalName: "Apollo Hospitals",
    address: "Hyderabad",
    availableBeds: 22,
    bedsWithOxygen: 'Y',
    selected: false 
},{
    id: 104,
    hospitalName: "Prestine Hospitals",
    address: "Bengaluru",
    availableBeds: 8,
    bedsWithOxygen: 'N',
    selected: false 
},]

export default UserDashboard