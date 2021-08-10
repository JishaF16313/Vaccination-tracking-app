import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {
    hospitalNameLabelText, hospitalZipLabelText, hospitalCityLabelText, addHospitalText, cancelText, updateHospitalText
} from '../../utility/commonTexts';
import {
    zipValidationRegExp, hospitalNameValidationText, zipValidationText, cityValidationText, invalidZipValidationText
} from '../../utility/validationMessages';
import InputField from '../inputfield/index';
import history from '../../routes/history';
import { useDispatch, useSelector } from 'react-redux';
import { addHospital, updateHospital } from '../../store/actions/hospitals/index';

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
    }
}));

function AddUpdateHospital() {
    const storeData = useSelector((store) => {
        return {
            data: store.hospitals
        }
    });

    const dispatch = useDispatch();

    const classes = useStyles();

    const title = storeData.data.addOrUpdate === "add" ? addHospitalText : updateHospitalText;

    const validate = Yup.object({
        name: Yup.string().max(100).required(hospitalNameValidationText),        
        zip: Yup.string().matches(zipValidationRegExp, invalidZipValidationText).max(6).required(zipValidationText),
        city: Yup.string().max(50).required(cityValidationText)        
    });

    const submitForm = (values) => {
        if (storeData.data.addOrUpdate === "add") {
            let obj = { id: Number(storeData.data.hospitalList.length) + 1, ...values }
            dispatch(addHospital(obj));
        } else {
            let obj = { id: storeData.data.editedHospitalData.id , ...values }
            dispatch(updateHospital(obj));
        }
        history.push('/admindashboard');
    }

    const onCancelClicked = (e) => {
        history.push('/admindashboard');
    }

    const initialValues = { name: '', zip: '', city: '' };

    useEffect(() => {
        if (storeData.data.addOrUpdate === "update") {
            initialValues.name = storeData.data.editedHospitalData.name;            
            initialValues.zip = storeData.data.editedHospitalData.zip;
            initialValues.city = storeData.data.editedHospitalData.city;           
        }
    }, []);

    return (
        <div className={classes.mainDiv}>
            <h3>{title}</h3>
            <Formik initialValues={initialValues} validationSchema={validate} onSubmit={values => submitForm(values)}>
                {formik => {
                    return (
                        <Form>
                            <div className={classes.field}>
                                <InputField onChange={(e) => formik.setFieldValue('name', e.target.value)} label={hospitalNameLabelText} name="name" type="text" classes={classes} />
                            </div>                           
                            <div className={classes.field}>
                                <InputField label={hospitalZipLabelText} name="zip" onChange={(e) => formik.setFieldValue('zip', e.target.value)} type="text" classes={classes} />
                            </div>
                            <div className={classes.field}>
                                <InputField label={hospitalCityLabelText} name="city" onChange={(e) => formik.setFieldValue('city', e.target.value)} type="text" classes={classes} />
                            </div>                           
                            <div className={classes.btnDiv}>
                                <Button variant="contained" color="primary" size="medium" type="submit">{storeData.data.addOrUpdate === "add" ? addHospitalText : updateHospitalText}</Button>
                                <Button onClick={(e) => onCancelClicked(e)} className={classes.cancelBtn} variant="contained" size="medium">{cancelText}</Button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    )
}

export default AddUpdateHospital;
