import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { hospitalDdlList, cancelText, addBranchText, updateBranchText } from '../../utility/commonTexts';
import InputField from '../inputfield/index';
import { branchNameValidationText, hospitalNameValidationText } from '../../utility/validationMessages';
import history from '../../routes/history';
import { useDispatch, useSelector } from 'react-redux';
import { addHospitalBranch, updateHospitalBranch } from '../../store/actions/hospitalbranch/index';

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
        width: '22ch'
    }
}));

function AddUpdateHospitalBranch() {
    const storeData = useSelector((store) => {       
        return {
            data: store.hospitalbranch
        }
    });

    const classes = useStyles();

    const title = storeData.data.addOrUpdate === "add" ? addBranchText : updateBranchText;

    const dispatch = useDispatch();

    const validate = Yup.object({
        name: Yup.string().max(100).required(branchNameValidationText),       
        hospitalName: Yup.string().required(hospitalNameValidationText)
    });

    const submitForm = (values) => {
        let hospitalName = hospitalDdlList.filter((item) => {
            return item.value === values.hospitalName
        });
        if (storeData.data.addOrUpdate === "add") {
            let obj = {
                id: Number(storeData.data.branchList.length) + 1,
                name: values.name,               
                hospitalName: hospitalName[0].label                
            }
            dispatch(addHospitalBranch(obj));
        } else {
            let obj = {
                id: storeData.data.branchList.length,
                name: values.name,               
                hospitalName: hospitalName[0].label
            }
            dispatch(updateHospitalBranch(obj));
        }
        history.push('/admindashboard');
    }

    const onCancelClicked = (e) => {
        history.push('/admindashboard');
    }

    const initialValues = { name: '', hospitalName: '' };

    useEffect(() => {
        if (storeData.data.addOrUpdate === "update") {
            let hospitalName = hospitalDdlList.filter((item) => {
                return item.label === storeData.data.editedHospitalBranchData.hospitalName
            });           
            initialValues.name = storeData.data.editedHospitalBranchData.name;            
            initialValues.hospitalName = hospitalName[0].value;
        }
    }, []);

    return (
        <div className={classes.mainDiv}>
            <h3>{title}</h3>
            <Formik initialValues={initialValues} validationSchema={validate} onSubmit={values => submitForm(values)}>
                {formik => (
                    <Form>
                        <div className={classes.field}>
                            <InputField label="Name" onChange={(e) => formik.setFieldValue('name', e.target.value)} name="name" type="text" classes={classes} />
                        </div>         
                        <div className={classes.field}>
                            <InputField defaultValue={initialValues.hospitalName} label="Hospital Name" onChange={(e) => formik.setFieldValue('hospitalName', e.target.value)} name="hospitalName" type="select" options={hospitalDdlList} classes={classes} />
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