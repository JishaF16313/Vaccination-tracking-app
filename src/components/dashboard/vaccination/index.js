import React, {useState, useCallback, useMemo, useEffect} from 'react'
import { Typography  } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles'
import Table from "../../table"
import EditVaccinationDetail from './editVaccinationDetail'
import {useSelector, useDispatch} from "react-redux"
import {getVaccinationList} from "../../../store/actions/vaccination"

const useStyles = makeStyles({
    root: {
        padding: "2%",
        flexGrow: 1,
    },
    title: {
        margin: "10px 0px"
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

    // Vaccination detail edit handler
    const handleVaccinationEdit = useCallback( (details) => setmodal({type: "edit", data: details}), [])

    // Vaccination detail delete handler
    const handleVaccinationDelete = useCallback( details => console.log("Delete", details), [])

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
            <Typography component="h4" variant="h5" className={classes.title}> Vaccination Appointments</Typography>
            <div className={classes.tableContainer}>
            <Table columnMap={columnMap} rows={vaccinationList} onEdit={handleVaccinationEdit} onDelete={handleVaccinationDelete} loading={loading}/>
            </div>
            {loading && <div className={classes.loader}><CircularProgress/></div>}
            <EditVaccinationDetail open={modal.type === "edit"} details={modal.data} onClose={handleModalClose} />
        </div>
    )
}



export default VaccinationDashboard

