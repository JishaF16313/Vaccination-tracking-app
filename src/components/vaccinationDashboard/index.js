import React, {useCallback, useMemo} from 'react'
import { Typography, Grid  } from '@material-ui/core'
import Table from "../table"

function VaccinationDashboard() {
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
        <div>
            <Typography component="h4" variant="h5" > Vaccination Details:</Typography>
            <Table columnMap={columnMap} rows={rows} onEdit={handleVaccinationEdit} onDelete={handleVaccinationDelete} />
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

