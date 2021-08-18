import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { hospitalDdlList, hospitalUserTypes, cancelText, addPatientText, cityDdlList, stateDdlList } from '../../utility/commonTexts';
import InputField from '../inputfield/index';
import {
    hospitalUserNameValidationText, dateOfBirthValidationText, invalidDateValidationText, zipValidationText, contactNumberValidationText, emailValidationText, stateValidationText, cityValidationText, aadharCardValidationText
} from '../../utility/validationMessages';
import { SetPatientDetails } from '../../store/actions/patientDetails/index';
import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo, useCallback, useState } from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { startLoading } from '../../store/actions/loader/index';


const useStyles = makeStyles((theme) => ({
    mainDiv: {
        margin: theme.spacing(6)
    },
    field: {
        marginTop: theme.spacing(1)
    },
    btnDiv: {
        marginTop: theme.spacing(6)
    },
    cancelBtn: {
        marginLeft: theme.spacing(4)
    },
    errorField: {
        color: 'red',
        marginTop: theme.spacing(1)
    },
    addressField: {
        width: '25ch'
    },
    ddl: {
        width: '25ch'
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
    title: {
        marginTop: theme.spacing(2)
    },
    show: {
        display: 'block'
    },
    hidden: {
        display: 'none'
    }
}));

const PatientDetailsForm = () => {
    const classes = useStyles();

    const title = addPatientText;
    const storeData = useSelector((store) => {
        return {
            // loggedInUserData: store.auth,
            hospitalAvailableBedList: store.hospitalAvailableBedList
        }
    });
    
    const validate = Yup.object({
        firstName: Yup.string().max(100).required(hospitalUserNameValidationText),
        lastName: Yup.string().max(100).required(hospitalUserNameValidationText),
        dob: Yup.string()
            .required(dateOfBirthValidationText)
            .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, invalidDateValidationText),
        contactNumber: Yup.number().min(10).required(contactNumberValidationText),
        emailID: Yup.string().required(emailValidationText),
        city: Yup.string().required(cityValidationText),
        pincode: Yup.number().required(zipValidationText),
        state: Yup.string().required(stateValidationText),
        panNumber: Yup.string(),
        aadharNumber: Yup.string().required(aadharCardValidationText)
    });

    const dispatch = useDispatch();

    const submitForm = (values) => {
        console.log("values", values);
        // let token = storeData.loggedInUserData.token;
        dispatch(startLoading('Please wait...'));
        
        var patientDetails = {};
        patientDetails.patient_first_name = values.firstName;
        patientDetails.patient_last_name = values.lastName;
        patientDetails.patient_contact_number = values.contactNumber;
        patientDetails.patient_email_id = values.emailID;
        patientDetails.patient_LocationDetails = {};
        patientDetails.patient_LocationDetails.city_name = values.city;
        patientDetails.patient_LocationDetails.pin_number = values.pincode;
        patientDetails.patient_IdentificationDetail = {};
        patientDetails.patient_IdentificationDetail.pan_number = values.panNumber;
        patientDetails.patient_IdentificationDetail.aadhar_card = values.aadharNumber;

        dispatch(SetPatientDetails(patientDetails));
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

    const rows = data;
    return (
        <div className={classes.mainDiv}>
            <h3>{title}</h3>
            <Formik initialValues={{ firstName: '', lastName: '', contactNumber: '', emailID: '' }} validationSchema={validate} onSubmit={values => submitForm(values)} className={storeData.hospitalAvailableBedList ? classes.hidden : classes.show}>
                {formik => (
                    <Form>
                        <div className={classes.field}>
                            <InputField label="First Name" onChange={(e) => formik.setFieldValue('firstName', e.target.value)} name="firstName" type="text" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Last Name" onChange={(e) => formik.setFieldValue('lastName', e.target.value)} name="lastName" type="text" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Date of Birth" onChange={(e) => formik.setFieldValue('dob', e.target.value)} name="dob" type="text" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Contact Number" onChange={(e) => formik.setFieldValue('contactNumber', e.target.value)} name="contactNumber" type="text" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Email ID" onChange={(e) => formik.setFieldValue('emailID', e.target.value)} name="emailID" type="text" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Zip Code" onChange={(e) => formik.setFieldValue('pincode', e.target.value)} name="pincode" type="text" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="City" onChange={(e) => formik.setFieldValue('city', e.target.value)} name="city" type="select" options={cityDdlList} classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="State" onChange={(e) => formik.setFieldValue('state', e.target.value)} name="city" type="select" options={stateDdlList} classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Pan Number" onChange={(e) => formik.setFieldValue('panNumber', e.target.value)} name="panNumber" type="text" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Aadhar Number" onChange={(e) => formik.setFieldValue('aadharNumber', e.target.value)} name="aadharNumber" type="text" classes={classes} />
                        </div>
                        <div className={classes.btnDiv}>
                            <Button variant="contained" color="primary" size="medium" type="submit">{addPatientText}</Button>
                            <Button className={classes.cancelBtn} variant="contained" size="medium">{cancelText}</Button>
                        </div>
                    </Form>
                )}
            </Formik>
            {/* <div className={storeData.hospitalAvailableBedList ? classes.show : classes.hidden}>
                <div>
                    <Typography component="h4" variant="h5" className={classes.title} > Hospital Details:</Typography>
                    <div className={classes.divStyle} style={{ height: 250, width: '100%' }}>
                        <DataGrid
                            rows={storeData.hospitalAvailableBedList ? storeData.hospitalAvailableBedList : []}
                            columns={columnMap}
                            pageSize={5}
                            checkboxSelection
                            disableMultipleSelection={true}
                        />
                    </div>
                </div>
            </div> */}
        </div>

    )
}

const data = [{
    bedFacility: "Oxygen",
    bedId: "244fec7a-474b-484e-baa7-69867a7b2324",
    bedType: "Single",
    branchId: "a01bb58a-bd2c-43e5-aca8-826e5dc7524b",
    branchName: "Indira Nagar",
    hospitalId: "9f3c716d-6efc-43a7-9752-616d9f65bfca",
    hospitalName: "Appollo",
    id: "1"
}]

export default PatientDetailsForm;
