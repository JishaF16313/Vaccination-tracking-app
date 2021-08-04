import React, {useCallback, useMemo} from 'react'
import { Typography  } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Table from "../../table"

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
    }
})

function VaccinationDashboard() {
    const classes = useStyles()

    // Vaccination detail edit handler
    const handleVaccinationEdit = useCallback( (details) => console.log("Edit", details), [])

    // Vaccination detail delete handle
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

    // Vaccination data - to be called from API
    const rows = data

    return (
        <div className={classes.root}>
            <Typography component="h4" variant="h5" className={classes.title}> Vaccination Details:</Typography>
            <div className={classes.tableContainer}>
            <Table columnMap={columnMap} rows={rows} onEdit={handleVaccinationEdit} onDelete={handleVaccinationDelete} />
            </div>
        </div>
    )
}

const data = [{
    id: 123,
    name: "Name1",
    address: "Banglore",
    dose1: {
        status: "done",
        date: "",
        vaccine: "covishield"        
    },
    dose2: {
        status: "pending",
        date: "",
        vaccine: ""},
},{
    id: 456,
    name: "Name2",
    address: "Delhi",
    dose1: {
        status: "done",
        date: "",
        vaccine: "covishield"},
    dose2: {
        status: "done",
        date: "",
        vaccine: "covishield"},
},]

export default VaccinationDashboard

