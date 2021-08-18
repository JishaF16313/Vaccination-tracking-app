import React, { useMemo, useEffect} from 'react'
import { Typography  } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles'
import Table from "../../table"
import {useSelector, useDispatch} from "react-redux"
import {getVaccinationUploadHistory } from "../../../store/actions/vaccination"
import IconButton from "@material-ui/core/IconButton"
import history from "../../../routes/history"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
    root: {
        padding: "2%",
    },
    title: {
        margin: "10px 0px 20px 0px",
        display: "flex",
        alignItems: "center"
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

function VaccinationUploadHistory() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {vaccinationUploadHistory, loading,} = useSelector(store => store.vaccination)

    // Getting list of vaccination appointments
    useEffect(() => {
        dispatch(getVaccinationUploadHistory())
    }, [dispatch])


    // Column title mappings for vaccination details
    const columnMap = useMemo(  () => [{
        title: "Upload ID",
        field: "uploadId"
    },{
        title: "Upload Status",
        field: "status"
    }], [])

    return (
        <div className={classes.root}>
            <Typography component="h4" variant="h5" className={classes.title}>
                <IconButton onClick={() => history.goBack()}><ArrowBackIcon/></IconButton>
                Vaccination Upload History
            </Typography>
            <div className={classes.tableContainer}>
            <Table columnMap={columnMap} rows={vaccinationUploadHistory} loading={loading} rowIdField={"uploadId"}/>
            </div>
            {loading && <div className={classes.loader}><CircularProgress/></div>}
        </div>
    )
}



export default VaccinationUploadHistory

