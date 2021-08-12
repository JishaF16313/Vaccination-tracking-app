import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { hospitalDdlList, hospitalUserTypes, cancelText, addPatientText, cityDdlList, stateDdlList} from '../../utility/commonTexts';
import InputField from '../inputfield/index';
import {
    hospitalUserNameValidationText, dateOfBirthValidationText, invalidDateValidationText, zipValidationText,contactNumberValidationText, emailValidationText, stateValidationText, cityValidationText, aadharCardValidationText
} from '../../utility/validationMessages';
import { SetPatientDetails } from '../../store/actions/patientDetails/index';
import { useDispatch, useSelector } from 'react-redux';

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
    }
}));

const PatientDetailsForm = () => {
    const classes = useStyles();

    const title = addPatientText;

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
        // getHospitalBedByPincode(values);
        console.log("values",values);
        var patientDetails = {};
        patientDetails.patient_first_name = values.firstName;
        patientDetails.patient_last_name =  values.lastName;
        patientDetails.patient_contact_number = values.contactNumber;
        patientDetails.patient_email_id = values.emailID;
        patientDetails.patient_LocationDetails = {};
        patientDetails.patient_LocationDetails.city_name = values.city;
        patientDetails.patient_LocationDetails.pin_number = values.pin_number;
        patientDetails.patient_IdentificationDetail = {};
        patientDetails.patient_IdentificationDetail.panNumber = values.panNumber
        patientDetails.patient_IdentificationDetail.aadharNumber = values.aadharNumber
        dispatch(SetPatientDetails(patientDetails));
  }

    return (
        <div className={classes.mainDiv}>
            <h3>{title}</h3>
            <Formik initialValues={{ firstName: '', lastName: '', contactNumber: '', emailID: '' }} validationSchema={validate} onSubmit={values => submitForm(values)}>
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
        </div>
    )
}

export default PatientDetailsForm;
