import React, {useEffect, useCallback} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Button, FormControl, Paper, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik'
import InputField from '../../inputfield'
import {cityDdlList} from "../../../utility/commonTexts"
import {useSelector, useDispatch} from "react-redux"
import {getHospitalList} from "../../../store/actions/hospitals"
import {getReport, getReportAll} from "../../../store/actions/reports"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2%",
    },
    paper:{
        padding: "15px"
    },
    titleContainer: {
        margin: "10px 0px 20px 0px",
        display: "flex",
        width: "100%",
        justifyContent: "space-between"
    },
    title:{
        flexGrow:1,
    },
    form:{
      width: "100%"
    },
    field: {
        margin: theme.spacing(2),
        width: "80%"
    },
    input:{
        width: "200px"
    },
    errorField: {
        color: 'red',
        marginTop: theme.spacing(1)
    },
    caption:{
        fontStyle: "italic"
    }
}))

function PDFReports() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {token} = useSelector(store => store.auth)
    const {hospitalDdlOptions} = useSelector(store => store.hospitals)

    useEffect(() => {
        dispatch(getHospitalList(token))
    }, [])

    const initFilters = {
        City: "",
        Hospital: ""
    }

    const handleSubmit = useCallback((values) => {
        let filters = []
        for(let filter in values)
        {
            if(values[filter])
            {
                filters.push({
                    name: filter,
                    value: values[filter]
                })
            }
        }
        const reqBody = {filters}
        dispatch(getReport(reqBody))
    },[dispatch])

    const handleDownloadAll = useCallback(() => {
        dispatch(getReportAll())
    },[])


    return (
        <div className={classes.root}>
            <div className={classes.titleContainer}>
            <Typography component="h4" variant="h5" className={classes.title}>
                Reports
            </Typography>
            <div> 
                <Button variant="contained" color="primary" size="small" onClick={handleDownloadAll}>
                    All Cities
                </Button>
                </div>
            </div>
            
            <div>
                <Formik initialValues={initFilters} onSubmit={handleSubmit}>
                {
                    () =>
                    <Paper className={classes.paper} elevation={3}>
                        <Typography variant="h6" component="h6">
                            Filters:    
                        </Typography> 
                        <Form className={classes.form}>
                        <FormControl className={classes.field}>
                            <InputField
                                type="select"
                                label="City"
                                name="City"
                                classes={classes}
                                className={classes.input}
                                options={cityDdlList}
                            />
                        </FormControl>
                        <FormControl className={classes.field}>
                            <InputField
                                type="select"
                                label="Hospital"
                                name="Hospital"
                                classes={classes}
                                className={classes.input}
                                options={hospitalDdlOptions ? hospitalDdlOptions.map(hospital => ({...hospital, value: hospital.label})) : []}  
                            />
                        </FormControl>
                        <div className={classes.field}> 
                            <Button variant="contained" color="primary" type="submit">
                                Download
                            </Button>
                        </div>
                    </Form>
                    <Typography variant="caption" className={classes.caption}>
                        *Empty filters will generate report based upon user's city.
                    </Typography>
                    </Paper>
                }
                </Formik>
            </div>
        </div>
    )
}

export default PDFReports
