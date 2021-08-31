import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo, useCallback, useState } from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { startLoading } from '../../store/actions/loader/index';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ConfirmBedBookingDetails from '../userDashboard/handleBedBookingConfirmModal';
import { SetPatientBedBookingDetails, GetBookingStatus } from '../../store/actions/patientDetails/index';
import Filter from './filter';

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
    },
    field: {
        marginTop: theme.spacing(1)
    },
    btnDiv: {
        marginTop: theme.spacing(2)
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
    const handleConfirmBedBooking = useCallback((details) => setmodal({ type: "open", data: details }), []);

    // State to show/hide modals
    const [modal, setmodal] = useState({
        type: null,
        data: null
    });
    const dispatch = useDispatch();


    // Closing the modal
    const handleModalClose = useCallback(() => setmodal({ type: null, data: null }), []);
    const [selectData, setSelection] = useState(null);
    let token = storeData.loggedInUserData.token;

    const confirmBookingDetails = (data) => {
        let requestData = {
            "bookingId": storeData.data.hospitalAvailableBedList.bookingResponseData[0].bookingID,
            "bookingData": selectData
        }
        dispatch(startLoading("Please wait..."));
        dispatch(SetPatientBedBookingDetails(requestData, token));
        let details = {
            "bookingId": storeData.data.hospitalAvailableBedList.bookingResponseData[0].bookingID,
            "bookingStatus": storeData.data.hospitalAvailableBedList.bookingResponseData[0].bookingStatus,
        }
    }



    const handleRowClick = (params) => {
        let selectedRowData;
        if (storeData.data.hospitalAvailableBedList.bedAvailabilityData)
            selectedRowData = storeData.data.hospitalAvailableBedList.bedAvailabilityData.filter((row) => {
                return params.includes(row.id.toString());
            });
        if (selectedRowData && selectedRowData.length > 0) {
            for (let i = 0; i < selectedRowData.length; i++) {
                let bookingData = {
                    "hospital-name": selectedRowData[i].hospitalName,
                    "hospital-id": selectedRowData[i].hospitalId,
                    "hospital-branch-id": selectedRowData[i].branchId,
                }
                let bedData = {
                    "bed-id": selectedRowData[i].bedId,
                    "bed-type": selectedRowData[i].bedType,
                    "bed-facility": selectedRowData[i].bedFacility
                }
                let locationDetail = {
                    "city_name": "",
                    "pin_number": ""
                }
                bookingData.Bed = bedData;
                bookingData.LocationDetail = locationDetail;
                setSelection(bookingData);
            }
        }
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
                        <Filter />
                        <div className={classes.divStyle} style={{ height: 250, width: '100%' }}>
                            <DataGrid
                                rows={storeData.data.hospitalAvailableBedList ? storeData.data.hospitalAvailableBedList.bedAvailabilityData : null}
                                columns={columnMap}
                                pageSize={5}
                                checkboxSelection
                                disableMultipleSelection={true}
                                onChange={handleChange}
                                onSelectionModelChange={handleRowClick}

                            />
                        </div>

                    </div>

                    <Box className={classes.BtnHolder}>
                        <Button variant="contained" color="primary" onClick={confirmBookingDetails} className={classes.cnfrmBtn}>Confirm</Button>
                    </Box>
                    <ConfirmBedBookingDetails open={storeData.data.openModal} details={storeData.data.confirmStatus} onClose={handleModalClose} />
                    <h1>{ }</h1>
                </div>
            )}
        </div>
    )
};

export default HospitalDataTable;
