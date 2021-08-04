import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { hospitalDdlList, hospitalUserTypes, cancelText, addUserText } from '../../utility/commonTexts';
import InputField from '../inputfield/index';
import {
    hospitalUserNameValidationText, hospitalUserUserNameValidationText, passwordMinLengthValidationText,
    passwordValidationText, confirmPasswordValidationText, passwordMatchValidationText, addressValidationText,
    userTypeValidationText
} from '../../utility/validationMessages';

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

const AddUpdateUser = () => {
    const classes = useStyles();

    const title = addUserText;

    const validate = Yup.object({
        name: Yup.string().max(100).required(hospitalUserNameValidationText),
        userName: Yup.string().max(100).required(hospitalUserUserNameValidationText),
        password: Yup.string().min(8, passwordMinLengthValidationText).max(100).required(passwordValidationText),
        confirmPassword: Yup.string().required(confirmPasswordValidationText).oneOf([Yup.ref('password'), null], passwordMatchValidationText),
        address: Yup.string().max(200).required(addressValidationText),
        hospitalName: Yup.string(),
        userType: Yup.string().required(userTypeValidationText),
    });

    const submitForm = (values) => {

    }

    return (
        <div className={classes.mainDiv}>
            <h3>{title}</h3>
            <Formik initialValues={{ name: '', userName: '', password: '', confirmPassword: '', address: '', hospitalName: '', userType: '' }} validationSchema={validate} onSubmit={values => submitForm(values)}>
                {formik => (
                    <Form>
                        <div className={classes.field}>
                            <InputField label="Name" onChange={(e) => formik.setFieldValue('name', e.target.value)} name="name" type="text" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Username" onChange={(e) => formik.setFieldValue('userName', e.target.value)} name="userName" type="text" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Password" onChange={(e) => formik.setFieldValue('password', e.target.value)} name="password" type="password" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Confirm Password" onChange={(e) => formik.setFieldValue('confirmPassword', e.target.value)} name="confirmPassword" classes={classes} type="password" />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Address" onChange={(e) => formik.setFieldValue('address', e.target.value)} name="address" type="textarea" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="Hospital Name" onChange={(e) => formik.setFieldValue('hospitalName', e.target.value)} name="hospitalName" type="select" options={hospitalDdlList} classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label="User Type" onChange={(e) => formik.setFieldValue('userType', e.target.value)} name="userType" type="select" options={hospitalUserTypes} classes={classes} />
                        </div>
                        <div className={classes.btnDiv}>
                            <Button variant="contained" color="primary" size="medium" type="submit">{addUserText}</Button>
                            <Button className={classes.cancelBtn} variant="contained" size="medium">{cancelText}</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddUpdateUser;
