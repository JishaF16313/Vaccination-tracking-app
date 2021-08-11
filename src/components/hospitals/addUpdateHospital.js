import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { hospitalNameLabelText, addHospitalText, cancelText, updateHospitalText } from '../../utility/commonTexts';
import { hospitalNameValidationText } from '../../utility/validationMessages';
import InputField from '../inputfield/index';
import history from '../../routes/history';
import { useDispatch, useSelector } from 'react-redux';
import { addHospital, updateHospital } from '../../store/actions/hospitals/index';
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
    }
}));

function AddUpdateHospital() {
    const storeData = useSelector((store) => {        
        return {
            data: store.hospitals,
            loggedInUserData: store.auth
        }
    });

    const dispatch = useDispatch();

    const classes = useStyles();

    const title = storeData.data.addOrUpdate === "add" ? addHospitalText : updateHospitalText;

    const validate = Yup.object({
        name: Yup.string().max(100).required(hospitalNameValidationText)     
    });

    const submitForm = (values) => {        
        dispatch(startLoading('Please wait...'));
        if (storeData.data.addOrUpdate === "add") {           
            let obj = { hospitalName : values.name };
            let token = storeData.loggedInUserData.token;
            dispatch(addHospital(obj, token));
        } else {
            let obj = { id: storeData.data.editedHospitalData.id , ...values }
            dispatch(updateHospital(obj));
        }       
        // if(storeData.alertData.alertType === "success"){
        //     history.push('/admindashboard');
        // }                   
    }

    const onCancelClicked = (e) => {
        history.push('/admindashboard');
    }

    const initialValues = { name: '' };

    useEffect(() => {
        if (storeData.data.addOrUpdate === "update") {
            initialValues.name = storeData.data.editedHospitalData.name;        
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
