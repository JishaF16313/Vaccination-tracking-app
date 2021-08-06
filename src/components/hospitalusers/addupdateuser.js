import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { hospitalDdlList, hospitalUserTypes, cancelText, addUserText, updateUserText } from '../../utility/commonTexts';
import InputField from '../inputfield/index';
import {
    hospitalUserNameValidationText, hospitalUserUserNameValidationText, passwordMinLengthValidationText,
    passwordValidationText, confirmPasswordValidationText, passwordMatchValidationText, addressValidationText,
    userTypeValidationText
} from '../../utility/validationMessages';
import history from '../../routes/history';
import { useDispatch, useSelector } from 'react-redux';
import { addHospitalUser, updateHospitalUser } from '../../store/actions/hospitalusers/index';

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

function AddUpdateUser() {
    const storeData = useSelector((store) => {
        return {
            data: store.hospitalusers
        }
    });

    const classes = useStyles();

    const title = storeData.data.addOrUpdate === "add" ? addUserText : updateUserText;

    const dispatch = useDispatch();

    const validate = Yup.object({
        name: Yup.string().max(100).required(hospitalUserNameValidationText),
        userName: Yup.string().max(100).required(hospitalUserUserNameValidationText),
        password: storeData.data.addOrUpdate === "add" ? Yup.string().min(8, passwordMinLengthValidationText).max(100).required(passwordValidationText) : Yup.string(),
        confirmPassword: storeData.data.addOrUpdate === "add" ? Yup.string().required(confirmPasswordValidationText).oneOf([Yup.ref('password'), null], passwordMatchValidationText) : Yup.string(),
        address: Yup.string().max(200).required(addressValidationText),
        hospitalName: Yup.string(),
        userType: Yup.string().required(userTypeValidationText),
    });

    const submitForm = (values) => {
        let hospitalName = hospitalDdlList.filter((item) => {
            return item.value === values.hospitalName
        });
        let userType = hospitalUserTypes.filter((item) => {
            return item.value === values.userType
        });
        if (storeData.data.addOrUpdate === "add") {
            let obj = {
                id: Number(storeData.data.userList.length) + 1,
                name: values.name,
                userName: values.userName,
                address: values.address,
                hospitalName: hospitalName[0].label,
                userType: userType[0].label
            }
            dispatch(addHospitalUser(obj));
        } else {
            let obj = {
                id: storeData.data.userList.length,
                name: values.name,
                userName: values.userName,
                address: values.address,
                hospitalName: hospitalName[0].label,
                userType: userType[0].label
            }
            dispatch(updateHospitalUser(obj));
        }
        history.push('/hospital/users');
    }

    const onCancelClicked = (e) => {
        history.push('/hospital/users');
    }

    const initialValues = { name: '', userName: '', password: '', confirmPassword: '', address: '', hospitalName: '', userType: '' };

    useEffect(() => {
        if (storeData.data.addOrUpdate === "update") {
            let hospitalName = hospitalDdlList.filter((item) => {
                return item.label === storeData.data.editedHospitalUserData.hospitalName
            });
            let userType = hospitalUserTypes.filter((item) => {
                return item.label === storeData.data.editedHospitalUserData.userType
            });
            initialValues.name = storeData.data.editedHospitalUserData.name;
            initialValues.userName = storeData.data.editedHospitalUserData.userName;
            initialValues.address = storeData.data.editedHospitalUserData.address;
            initialValues.hospitalName = hospitalName[0].value;
            initialValues.userType = userType[0].value;
            initialValues.password = "";
            initialValues.confirmPassword = "";
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
                            <InputField label="Username" onChange={(e) => formik.setFieldValue('userName', e.target.value)} name="userName" type="text" classes={classes} />
                        </div>
                        {storeData.data.addOrUpdate === "add" && (
                            <React.Fragment>
                                <div className={classes.field}>
                                    <InputField label="Password" onChange={(e) => formik.setFieldValue('password', e.target.value)} name="password" type="password" classes={classes} />
                                </div>
                                <div className={classes.field}>
                                    <InputField label="Confirm Password" onChange={(e) => formik.setFieldValue('confirmPassword', e.target.value)} name="confirmPassword" classes={classes} type="password" />
                                </div></React.Fragment>
                        )}
                        <div className={classes.field}>
                            <InputField label="Address" onChange={(e) => formik.setFieldValue('address', e.target.value)} name="address" type="textarea" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField defaultValue={initialValues.hospitalName} label="Hospital Name" onChange={(e) => formik.setFieldValue('hospitalName', e.target.value)} name="hospitalName" type="select" options={hospitalDdlList} classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField defaultValue={initialValues.userType} label="User Type" onChange={(e) => formik.setFieldValue('userType', e.target.value)} name="userType" type="select" options={hospitalUserTypes} classes={classes} />
                        </div>
                        <div className={classes.btnDiv}>
                            <Button variant="contained" color="primary" size="medium" type="submit">{storeData.data.addOrUpdate === "add" ? addUserText : updateUserText}</Button>
                            <Button onClick={(e) => onCancelClicked(e)} className={classes.cancelBtn} variant="contained" size="medium">{cancelText}</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddUpdateUser;
