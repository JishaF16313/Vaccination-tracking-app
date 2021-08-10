import React, {useState, useCallback, useMemo, useEffect} from 'react'
import { Typography  } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles'
import Table from "../../table"
import EditVaccinationDetail from './editVaccinationDetail'
import AddVaccinationData from './addVaccinationData';
import {useSelector, useDispatch} from "react-redux"
import {getVaccinationList, deleteVaccinationAppointment} from "../../../store/actions/vaccination"
import ConfirmDialog from "../../dialog/confirmation"
import Button from "@material-ui/core/Button"

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
        data: null
    })

    // Closing the modal
    const handleModalClose = useCallback(() => setmodal({type: null, data: null}),[])

    // Open Vaccination appointmrnt edit modal
    const handleVaccinationEdit = useCallback( (details) => setmodal({type: "edit", data: details}), [])

    // Open vaccination appointment delete modal
    const handleVaccinationDelete = useCallback( details => setmodal({type: "delete", data: details}), [])

    // Open vaccination slots add modal
    const handleVaccinaionSlotsAdd = useCallback( () => setmodal({type: "add", data: null}), [])

    // Dispatch vaccination appointment delete
    const handleVaccinationDeleteDispatch = useCallback(() => {
        dispatch(deleteVaccinationAppointment(modal.data)).then(() => handleModalClose())
    },[modal, handleModalClose])

    // Column title mappings for vaccination details
    const columnMap = useMemo(  () => [{
        title: "Name",
        field: "name"
    },{
        title: "ID",
        field: "id"
    },{
        title: "Address",
        field: "address"
    },{
        title: "Dose 1",
        field: "dose1.status"
    },{
        title: "Dose 2",
        field: "dose2.status"
    }], [])


    return (
        <div className={classes.root}>
            <Typography component="h4" variant="h5" className={classes.title}>Vaccination Appointments <Button variant="contained" color="primary" onClick={handleVaccinaionSlotsAdd}>Add Vaccination Slots</Button></Typography>
            <div className={classes.tableContainer}>
            <Table columnMap={columnMap} rows={vaccinationList} onEdit={handleVaccinationEdit} onDelete={handleVaccinationDelete} loading={loading}/>
            </div>
            {loading && <div className={classes.loader}><CircularProgress/></div>}
            <EditVaccinationDetail open={modal.type === "edit"} details={modal.data} onClose={handleModalClose} />
            <ConfirmDialog open={modal.type === "delete"} title="Delete Appointment" message="Are you sure you want to delete the appointment?" handleDisagree={handleModalClose} handleAgree={handleVaccinationDeleteDispatch} agreeButtonText="Delete" disagreeButtonText="Cancel" />
            <AddVaccinationData open={modal.type === "add"} onClose={handleModalClose}/>
        </div>
    )
}



export default VaccinationDashboard

