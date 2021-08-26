import React, {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Button, FormControl, Paper, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik'
import InputField from '../../inputfield'
import {cityDdlList} from "../../../utility/commonTexts"
import {useSelector, useDispatch} from "react-redux"
import {getHospitalList} from "../../../store/actions/hospitals"
import {getReportPDF} from "../../../store/actions/reports"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2%",
    },
    title: {
        margin: "10px 0px 20px 0px",
        display: "flex",
        justifyContent: "space-between"
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

    const handleSubmit = (values) => {
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
        console.log(reqBody);
        dispatch(getReportPDF(reqBody))
    }


    return (
        <div className={classes.root}>
            <Typography component="h4" variant="h5" className={classes.title}>
                Reports
            </Typography>
            <div>
                <Formik initialValues={initFilters} onSubmit={handleSubmit}>
                {
                    () => <Form className={classes.form}>
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
                }
                </Formik>
            </div>
        </div>
    )
}

export default PDFReports
