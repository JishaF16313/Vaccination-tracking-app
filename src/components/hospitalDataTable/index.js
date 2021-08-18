import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo, useCallback, useState } from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { startLoading } from '../../store/actions/loader/index';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ConfirmBedBookingDetails from '../userDashboard/handleBedBookingConfirmModal';

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
            // loggedInUserData: store.auth,
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

    // Closing the modal
    const handleModalClose = useCallback(() => setmodal({ type: null, data: null }), []);

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
                        rows={storeData.data.hospitalAvailableBedList ? storeData.data.hospitalAvailableBedList : null}
                        columns={columnMap}
                        pageSize={5}
                        checkboxSelection
                        disableMultipleSelection={true}
                        onChange={handleChange}
                        onSelectionModelChange={item => console.log(item)}
                    />
                </div>
            </div>
            <Box className={classes.BtnHolder}>
                <Button variant="contained" color="primary" onClick={handleConfirmBedBooking} className={classes.cnfrmBtn}>Confirm</Button>
            </Box>
            <ConfirmBedBookingDetails open={modal.type === "edit"} details={modal.data} onClose={handleModalClose} />
        </div>
        )}
        </div>
    )
};

export default HospitalDataTable;
