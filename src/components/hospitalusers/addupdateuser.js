import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { hospitalUserTypes, cancelText, addUserText, updateUserText } from '../../utility/commonTexts';
import InputField from '../inputfield/index';
import {
    hospitalUserUserNameValidationText, passwordMinLengthValidationText,
    passwordValidationText, confirmPasswordValidationText, passwordMatchValidationText,
    userTypeValidationText, zipValidationText, cityValidationText, invalidZipValidationText, zipValidationRegExp
} from '../../utility/validationMessages';
import history from '../../routes/history';
import { useDispatch, useSelector } from 'react-redux';
import { addHospitalUser, updateHospitalUser } from '../../store/actions/hospitalusers/index';
import { startLoading } from '../../store/actions/loader/index';
import { getHospitalList } from '../../store/actions/hospitals/index';
import { getHospitalBranchList } from '../../store/actions/hospitalbranch/index';

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

function AddUpdateUser() {
    const [selectedHospitalId, setselectedHospitalId] = useState(null);

    const storeData = useSelector((store) => {
        return {
            data: store.hospitalusers,
            loggedInUserData: store.auth,
            hospitalData: store.hospitals,
            HospitalBranchData: store.hospitalbranch
        }
    });

    const classes = useStyles();

    const title = storeData.data.addOrUpdate === "add" ? addUserText : updateUserText;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoading('Please wait...'));
        let token = storeData.loggedInUserData.token;
        dispatch(getHospitalList(token));
    }, []);

    const validate = Yup.object({
        userName: Yup.string().max(100).required(hospitalUserUserNameValidationText),
        password: storeData.data.addOrUpdate === "add" ? Yup.string().min(8, passwordMinLengthValidationText).max(100).required(passwordValidationText) : Yup.string(),
        confirmPassword: storeData.data.addOrUpdate === "add" ? Yup.string().required(confirmPasswordValidationText).oneOf([Yup.ref('password'), null], passwordMatchValidationText) : Yup.string(),
        //hospitalName: Yup.string().required('Hospital name is required.'),
        branchName: Yup.string().required('Branch name is required.'),
        city: Yup.string().required(cityValidationText),
        zip: Yup.string().matches(zipValidationRegExp, invalidZipValidationText).max(6).required(zipValidationText),
        userType: Yup.string().required(userTypeValidationText),
    });

    const submitForm = (values) => {
        if (storeData.data.addOrUpdate === "add") {
            let obj = {
                userLoginId: values.userName,
                pwd: values.password,
                confirmPwd: values.confirmPassword,
                hospitalData: {
                    hospitalId: selectedHospitalId,
                    branchId: values.branchName,
                    location: {
                        cityName: values.city,
                        pinCode: values.zip
                    }
                },
                userType: values.userType
            }
            let token = storeData.loggedInUserData.token;
            dispatch(addHospitalUser(obj, token));
        } else {
            let obj = {
                id: storeData.data.userList.length,
                name: values.name,
                userName: values.userName,
                address: values.address
            }
            dispatch(updateHospitalUser(obj));
        }
        //history.push('/admindashboard');
    }

    const onCancelClicked = (e) => {
        history.push('/admindashboard');
    }

    const initialValues = { userName: '', password: '', confirmPassword: '', hospitalName: '', city: '', zip: '', branchName: '', userType: '' };

    useEffect(() => {
        if (storeData.data.addOrUpdate === "update") {
            // let hospitalName = hospitalDdlList.filter((item) => {
            //     return item.label === storeData.data.editedHospitalUserData.hospitalName
            // });
            // let userType = hospitalUserTypes.filter((item) => {
            //     return item.label === storeData.data.editedHospitalUserData.userType
            // });
            // initialValues.name = storeData.data.editedHospitalUserData.name;
            // initialValues.userName = storeData.data.editedHospitalUserData.userName;
            // initialValues.address = storeData.data.editedHospitalUserData.address;
            // initialValues.hospitalName = hospitalName[0].value;
            // initialValues.userType = userType[0].value;
            // initialValues.password = "";
            // initialValues.confirmPassword = "";
        }
    }, []);

    const onHospitalNameChanged = (val) => {
        setselectedHospitalId(val);
        dispatch(startLoading('Please wait...'));
        let token = storeData.loggedInUserData.token;
        dispatch(getHospitalBranchList(token,val));
    }

    return (
        <div className={classes.mainDiv}>
            <h3>{title}</h3>
            <Formik initialValues={initialValues} validationSchema={validate} onSubmit={values => submitForm(values)}>
                {formik => (
                    <Form>
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
                            <InputField label="City" onChange={(e) => formik.setFieldValue('city', e.target.value)} name="city" type="text" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Zip" onChange={(e) => formik.setFieldValue('zip', e.target.value)} name="zip" type="text" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Hospital Name" value={selectedHospitalId} onChange={(e) => onHospitalNameChanged(e.target.value)} name="hospitalName" type="select" options={storeData.hospitalData.hospitalDdlOptions ? storeData.hospitalData.hospitalDdlOptions : []} classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Branch Name" onChange={(e) => formik.setFieldValue('branchName', e.target.value)} name="branchName" type="select" options={storeData.HospitalBranchData.hospitalBranchDdlOptions ? storeData.HospitalBranchData.hospitalBranchDdlOptions : []} classes={classes} />
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
