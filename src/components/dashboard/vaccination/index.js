import React, {useState, useCallback, useMemo, useEffect} from 'react'
import { Typography  } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles'
import Table, {displayTypes} from "../../table"
import EditVaccinationDetail from './editVaccinationDetail'
import AddVaccinationData from './addVaccinationData';
import {useSelector, useDispatch} from "react-redux"
import {getVaccinationList, deleteVaccinationAppointment, updateVaccinationDetail} from "../../../store/actions/vaccination"
import ConfirmDialog from "../../dialog/confirmation"
import Button from "@material-ui/core/Button"
import history from "../../../routes/history"
import Loader from "../../loader"

const useStyles = makeStyles({
    root: {
        padding: "2%",
    },
    title: {
        margin: "10px 0px 20px 0px",
        display: "flex",
        justifyContent: "space-between"
    },
    tableContainer: {
        margin: "10px 0px",
        padding: "2px"
    },
    buttons:{ margin: "0px 5px"},
    loader: {
        width: "100%",
        textAlign: "center",
        padding: "10px"
    }
})

function VaccinationDashboard() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {vaccinationList, loading, error} = useSelector(store => store.vaccination)

    // Getting list of vaccination appointments
    useEffect(() => {
        dispatch(getVaccinationList())
    }, [dispatch])

    // State to show/hide modals
    const [modal, setmodal] = useState({
        type: null,
        data: null,
        title: null,
        message: null,
        onAgree: null,
        onDisagree: null
    })

    // Closing the modal
    const handleModalClose = useCallback(() => setmodal({
        type: null, 
        data: null, 
        title: null,
        message: null,
        onAgree: null,
        onDisagree: null}),[])

    const setNotAllowedModal = useCallback(
        (message) => {
            setmodal({
                type: "confirm",
                title: "Action Not Allowed",
                message,
                onAgree: handleModalClose,
                onDisagree: handleModalClose
            })
        },
        [handleModalClose],
    )

    // Function to determine if an appointment can be updated or deleted
    const isActionAllowed = (appointment) => {
        const statusString = appointment.dose[0].status && appointment.dose[0].status.toLowerCase()
        if(statusString)
        {
            if(statusString === "booked" || ( statusString === "partially vaccinated" && appointment.dose[1] && appointment.dose[1].date))
                return true
            else 
                return false 
        }
    }

    
    // Dispatch vaccination appointment delete
    const handleVaccinationDeleteDispatch = useCallback((appointment) => () => {
        dispatch(deleteVaccinationAppointment(appointment["vaccine-booking-id"]))
        handleModalClose()
    },[dispatch, modal, handleModalClose])

    // Dispatch vaccination appointment update
    const handleUpdateVaccinationDispatch = useCallback(
        (appointment) => () => {
            dispatch(updateVaccinationDetail(appointment["vaccine-booking-id"]))
            handleModalClose()
        },
        [dispatch, modal, handleModalClose],
    )

    // Open Vaccination appointmrnt edit modal
    const handleVaccinationEdit = useCallback( (appointment) => 
        isActionAllowed(appointment) ?
            setmodal({
                type: "confirm", 
                data: appointment,
                title: "Update Vaccination Status",
                message: "Are you sure the person is vaccinated for todays appointment?",
                onAgree: handleUpdateVaccinationDispatch(appointment),
                onDisagree: handleModalClose
            })
            :
            setNotAllowedModal("Can't update vaccinated appoitnment.")
            , [handleModalClose, handleUpdateVaccinationDispatch])

    // Open vaccination appointment delete modal
    const handleVaccinationDelete = useCallback( appointment =>  
        isActionAllowed(appointment) ?
            setmodal({
                type: "confirm", 
                data: appointment,
                title: "Delete Vaccination Appointment",
                message: "Are you sure you want to delete the appointment?",
                onAgree: handleVaccinationDeleteDispatch(appointment),
                onDisagree: handleModalClose
            })
            :
            setNotAllowedModal("Can't delete vaccinated appointment")
            , [handleModalClose, handleVaccinationDeleteDispatch])

    // Open vaccination slots add modal
    const handleVaccinaionSlotsAdd = useCallback( () => setmodal({type: "add", data: null}), [])


    // Column title mappings for vaccination details
    const columnMap = useMemo(  () => 
    [{
        title: "Name",
        field: "PatientName"
    },{
        title: "Aadhaar",
        field: "PatientAdhar"
    },{
        title: "Status",
        field: "dose[0].status",
    },{
        title: "Booked On",
        field: "vaccine_booked_date",
    },{
        title: "Vaccine",
        field: "dose[0].vaccine-type",
    },{
        title: "Dose 1 Date",
        field: "dose[0].date",
    },{
        title: "Dose 2 Date",
        field: "dose[1].date",
    }], [])


    return (
        <div className={classes.root}>
            <Typography component="h4" variant="h5" className={classes.title}>Vaccination Appointments
                <div>
                    <Button variant="contained" color="primary" className={classes.buttons} onClick={handleVaccinaionSlotsAdd}>Add Vaccination Slots</Button>
                    <Button variant="contained" color="primary" className={classes.buttons} onClick={() => history.push("/vaccination/uploadhistory")}>Upload History</Button>
                </div>
            </Typography>
            <div className={classes.tableContainer}>
            <Table columnMap={columnMap} rows={vaccinationList} onDone={handleVaccinationEdit} onDelete={handleVaccinationDelete} loading={loading} rowIdField={"vaccine-booking-id"}/>
            </div>
            {loading && <div className={classes.loader}><CircularProgress/></div>}
            <ConfirmDialog open={modal.type === "confirm"} title={modal.title} message={modal.message} handleDisagree={modal.onDisagree} handleAgree={modal.onAgree} agreeButtonText="Confirm" disagreeButtonText="Cancel" />
            <AddVaccinationData open={modal.type === "add"} onClose={handleModalClose}/>
            <Loader />
        </div>
    )
}



export default VaccinationDashboard

