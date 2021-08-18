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
            hospitalAvailableBedList: store.hospitalAvailableBedList
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

    const rows = data;
    return (
        /***change the class name to show for development and testing className={storeData.hospitalAvailableBedList ? classes.show : classes.hidden} */
        <div className={classes.mainDiv} className={storeData.hospitalAvailableBedList ? classes.show : classes.hidden}> 
            <div>
                <Typography component="h4" variant="h5" className={classes.title} > Hospital Details:</Typography>
                <div className={classes.divStyle} style={{ height: 250, width: '100%' }}>
                    <DataGrid
                        rows={storeData.hospitalAvailableBedList ? storeData.hospitalAvailableBedList : []}
                        columns={columnMap}
                        pageSize={5}
                        checkboxSelection
                        disableMultipleSelection={true}
                        onChange={handleChange}
                        onSelectionModelChange={itm => console.log(itm)}
                    />
                </div>
            </div>
            <Box className={classes.BtnHolder}>
                <Button variant="contained" color="primary" onClick={handleConfirmBedBooking} className={classes.cnfrmBtn}>Confirm</Button>
            </Box>
            <ConfirmBedBookingDetails open={modal.type === "edit"} details={modal.data} onClose={handleModalClose} />
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
},
{
    bedFacility: "Oxygen",
    bedId: "244fec7a-474b-484e-baa7-69867a7b2324",
    bedType: "Single",
    branchId: "a01bb58a-bd2c-43e5-aca8-826e5dc7524b",
    branchName: "Indira Nagar",
    hospitalId: "9f3c716d-6efc-43a7-9752-616d9f65bfca",
    hospitalName: "Appollo",
    id: "2"
}]

export default HospitalDataTable;