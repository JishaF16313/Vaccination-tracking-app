import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo, useCallback, useState } from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { startLoading } from '../../store/actions/loader/index';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ConfirmBedBookingDetails from '../userDashboard/handleBedBookingConfirmModal';
import { SetPatientBedBookingDetails }from '../../store/actions/patientDetails/index';
const useStyles = makeStyles((theme) => ({
    mainDiv: {
        margin: theme.spacing(6)
    },
    show: {
        display: 'block'
    },
    hidden: {
        display: 'none'
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
}))
const HospitalDataTable = (props) => {
    const classes = useStyles();
    const storeData = useSelector((store) => {
        return {
            loggedInUserData: store.auth,
            data: store.patientdetails
        }
    });

    function handleChange(event) {
        // Here, we invoke the callback with the new value
        props.onChange(event.target.value);
    }

    // Confirm bed detail handler
    const handleConfirmBedBooking = useCallback((details) => setmodal({ type: "edit", data: details }), []);

    // State to show/hide modals
    const [modal, setmodal] = useState({
        type: null,
        data: null
    });
    const dispatch = useDispatch();
    
    
    // Closing the modal
    const handleModalClose = useCallback(() => setmodal({ type: null, data: null }), []);
    const [select, setSelection] = React.useState([]);
    let token = storeData.loggedInUserData.token;
    const confirmBookingDetails = (data) => {
        let bookingData = {
            "hospital-name" : "Appollo",
            "hospital-id": "9f3c716d-6efc-43a7-9752-616d9f65bfca",
            "hospital-branch-id": "a01bb58a-bd2c-43e5-aca8-826e5dc7524b",
            "LocationDetail": {
              "city_name": "Bengaluru",
              "pin_number": "560017"
            },
            "Bed": {
              "bed-id": "244fec7a-474b-484e-baa7-69867a7b2324",
              "bed-type": "Single",
              "bed-facility": "Oxygen"
            }
        }
        let requestData = {
            "bookingId": "6bd02a27-7fc9-4046-91c4-5020354d9e85",
            "bookingData": bookingData
        }
        dispatch(SetPatientBedBookingDetails(requestData,token));
    }
    
    // Column title mappings for hospital bed details
    const columnMap = useMemo(() => [{
        headerName: "Hospital Name",
        field: "hospitalName",
        width: 180
    }, {
        headerName: "Hospital ID",
        field: "hospitalId",
        width: 180
    }, {
        headerName: "Branch Name",
        field: "branchName",
        width: 180
    }, {
        headerName: "Branch ID",
        field: "branchId",
        width: 180
    }, {
        headerName: "Beds Type",
        field: "bedType",
        width: 180
    }, {
        headerName: "Bed Facility",
        field: "bedFacility",
        width: 180
    },
    {
        headerName: "Bed ID",
        field: "bedId",
        width: 180
    }
    ], [])
    return (
        /***change the class name to show for development and testing className={storeData.hospitalAvailableBedList ? classes.show : classes.hidden} */
       <div>
        {storeData.data.hospitalAvailableBedList && (
        <div className={classes.mainDiv} className={storeData.data.hospitalAvailableBedList ? classes.show : classes.hidden}> 
            <div>
                <Typography component="h4" variant="h5" className={classes.title} > Hospital Details:</Typography>
                <div className={classes.divStyle} style={{ height: 250, width: '100%' }}>
                    <DataGrid
                        rows={storeData.data.hospitalAvailableBedList ? storeData.data.hospitalAvailableBedList.bedAvailabilityData : null}
                        columns={columnMap}
                        pageSize={5}
                        checkboxSelection
                        disableMultipleSelection={true}
                        onChange={handleChange}
                        onSelectionChange={(newSelection) => {
                            setSelection(newSelection.rows);
                            console.log("data==",newSelection);
                        }}
                       
                    />
                </div>
            </div>
            <Box className={classes.BtnHolder}>
                <Button variant="contained" color="primary" onClick={confirmBookingDetails} className={classes.cnfrmBtn}>Confirm</Button>
            </Box>
            <ConfirmBedBookingDetails open={modal.type === "edit"} details={modal.data} onClose={handleModalClose} />
            <h1>{select}</h1>
        </div>
        )}
        </div>
    )
};

const data = [{
    bedFacility: "Oxygen",
    bedId: "244fec7a-474b-484e-baa7-69867a7b2324",
    bedType: "Single",
    branchId: "a01bb58a-bd2c-43e5-aca8-826e5dc7524b",
    branchName: "Indira Nagar",
    hospitalId: "9f3c716d-6efc-43a7-9752-616d9f65bfca",
    hospitalName: "Appollo",
    id: "1"
}]

export default HospitalDataTable;