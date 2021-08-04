import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { hospitalNameLabelText, hospitalAddressLabelText, hospitalZipLabelText, hospitalCityLabelText, hospitalStateLabelText,
    addHospitalText, cancelText } from '../../utility/commonTexts';
import { zipValidationRegExp, hospitalNameValidationText, hospitalAddressValidationText, zipValidationText,
    cityValidationText, stateValidationText, invalidZipValidationText } from '../../utility/validationMessages';
import InputField from '../inputfield/index';

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

const AddUpdateHospital = () => {
    const classes = useStyles();

    const title = addHospitalText;

    const validate = Yup.object({
        name: Yup.string().max(100).required(hospitalNameValidationText),
        address: Yup.string().max(200).required(hospitalAddressValidationText),
        zip: Yup.string().matches(zipValidationRegExp, invalidZipValidationText).max(6).required(zipValidationText),
        city: Yup.string().max(50).required(cityValidationText),
        state: Yup.string().max(50).required(stateValidationText)
    });

    const submitForm = (values) => {

    }

    return (
        <div className={classes.mainDiv}>
            <h3>{title}</h3>
            <Formik initialValues={{ name: '', address: '', zip: '', city: '', state: '' }} validationSchema={validate} onSubmit={values => submitForm(values)}>
                {formik => (
                    <Form>
                        <div className={classes.field}>
                            <InputField onChange={(e) => formik.setFieldValue('name', e.target.value)} label={hospitalNameLabelText} name="name" type="text" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label={hospitalAddressLabelText} name="address" onChange={(e) => formik.setFieldValue('address', e.target.value)} type="textarea" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label={hospitalZipLabelText} name="zip" onChange={(e) => formik.setFieldValue('zip', e.target.value)} type="text" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label={hospitalCityLabelText} name="city" onChange={(e) => formik.setFieldValue('city', e.target.value)} type="text" classes={classes} />
                        </div>
                        <div className={classes.field}>
                            <InputField label={hospitalStateLabelText} name="state" onChange={(e) => formik.setFieldValue('state', e.target.value)} type="text" classes={classes} />
                        </div>
                        <div className={classes.btnDiv}>
                            <Button variant="contained" color="primary" size="medium" type="submit">{addHospitalText}</Button>
                            <Button className={classes.cancelBtn} variant="contained" size="medium">{cancelText}</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddUpdateHospital;
