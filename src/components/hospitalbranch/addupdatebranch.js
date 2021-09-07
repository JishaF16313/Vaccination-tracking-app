import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { cancelText, addBranchText, updateBranchText, hospitalZipLabelText, hospitalCityLabelText, } from '../../utility/commonTexts';
import InputField from '../inputfield/index';
import { branchNameValidationText, hospitalNameValidationText, zipValidationText, cityValidationText, invalidZipValidationText, zipValidationRegExp } from '../../utility/validationMessages';
import history from '../../routes/history';
import { useDispatch, useSelector } from 'react-redux';
import { addHospitalBranch, updateHospitalBranch } from '../../store/actions/hospitalbranch/index';
import { startLoading } from '../../store/actions/loader/index';
import { getHospitalList } from '../../store/actions/hospitals/index';

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
    autocompleteField: {
        width: '25ch'
    },
    asterisk: {
        color: 'red',
        fontSize: '20px'
    },
    ddlAsterisk: {
        color: 'red',
        fontSize: '20px',
        marginLeft: '6px'
    }
}));

function AddUpdateHospitalBranch() {
    const [hospitalNameValue, setHospitalNameValue] = useState(null);
    
    const storeData = useSelector((store) => {
        return {
            data: store.hospitalbranch,
            loggedInUserData: store.auth,
            hospitalData: store.hospitals
        }
    });

    const classes = useStyles();

    const title = storeData.data.addOrUpdate === "add" ? addBranchText : updateBranchText;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoading('Please wait...'));
        let token = storeData.loggedInUserData.token;
        dispatch(getHospitalList(token));
    }, []);

    const validate = Yup.object({
        name: Yup.string().max(100).required(branchNameValidationText),
        hospitalName: Yup.string(),
        zip: Yup.string().matches(zipValidationRegExp, invalidZipValidationText).max(6).required(zipValidationText),
        city: Yup.string().max(50).required(cityValidationText)
    });

    const submitForm = (values) => {
        dispatch(startLoading('Please wait...'));
        if (storeData.data.addOrUpdate === "add") {
            let obj = {
                hospitalId: hospitalNameValue.value ? hospitalNameValue.value : null,
                hospitalName: hospitalNameValue.label ? hospitalNameValue.label : null,
                branchName: values.name,
                city: values.city,
                pin: values.zip
            }
            let token = storeData.loggedInUserData.token;
            dispatch(addHospitalBranch(obj, token));
        } else {
            let obj = {
                id: storeData.data.branchList.length,
                hospitalName: hospitalNameValue.value ? hospitalNameValue.value : hospitalNameValue.label,
                ...values
            }
            dispatch(updateHospitalBranch(obj));
        }
        //history.push('/admindashboard');
    }

    const onCancelClicked = (e) => {
        history.push('/admindashboard');
    }

    const initialValues = { name: '', hospitalName: '', zip: '', city: '' };

    useEffect(() => {
        if (storeData.data.addOrUpdate === "update") {
            // let hospitalName = hospitalDdlList.filter((item) => {
            //     return item.label === storeData.data.editedHospitalBranchData.hospitalName
            // });
            // initialValues.name = storeData.data.editedHospitalBranchData.name;
            // initialValues.hospitalName = hospitalName[0].value;
            // initialValues.zip = storeData.data.editedHospitalBranchData.zip;
            // initialValues.city = storeData.data.editedHospitalBranchData.city;
        }
    }, []);

    const hospitalNameChange = (event, newValue) => {
        if (typeof newValue === 'string') {
            setHospitalNameValue({ label: newValue });
        } else if (newValue && newValue.inputValue) {
            setHospitalNameValue({ label: newValue.inputValue });
        } else {
            setHospitalNameValue(newValue);
        }
    }
  
    return (
        <div className={classes.mainDiv}>
            <h3>{title}</h3>
            <Formik initialValues={initialValues} validationSchema={validate} onSubmit={values => submitForm(values)}>
                {formik => (
                    <Form>
                        <div className={classes.field}>
                            <InputField label="Name" onChange={(e) => formik.setFieldValue('name', e.target.value)} name="name" type="text" classes={classes} required/>
                        </div>
                        <div className={classes.field}>
                            <InputField value={hospitalNameValue} label="Hospital Name" onChange={(e, formik) => hospitalNameChange(e, formik)} name="hospitalName" type="autocomplete" options={storeData.hospitalData.hospitalDdlOptions ? storeData.hospitalData.hospitalDdlOptions : []} classes={classes} required/>
                        </div>
                        <div className={classes.field}>
                            <InputField label={hospitalZipLabelText} name="zip" onChange={(e) => formik.setFieldValue('zip', e.target.value)} type="text" classes={classes} required/>
                        </div>
                        <div className={classes.field}>
                            <InputField label={hospitalCityLabelText} name="city" onChange={(e) => formik.setFieldValue('city', e.target.value)} type="text" classes={classes} required/>
                        </div>
                        <div className={classes.btnDiv}>
                            <Button variant="contained" color="primary" size="medium" type="submit">{storeData.data.addOrUpdate === "add" ? addBranchText : updateBranchText}</Button>
                            <Button onClick={(e) => onCancelClicked(e)} className={classes.cancelBtn} variant="contained" size="medium">{cancelText}</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddUpdateHospitalBranch;
