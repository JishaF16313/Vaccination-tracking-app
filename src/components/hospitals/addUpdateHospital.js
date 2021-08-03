import { Formik, Form, useField, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { hospitalNameLabelText, hospitalAddressLabelText, hospitalZipLabelText, hospitalCityLabelText, hospitalStateLabelText,
    addHospitalText, cancelText } from '../../utility/commonTexts';
import { zipValidationRegExp, hospitalNameValidationText, hospitalAddressValidationText, zipValidationText,
    cityValidationText, stateValidationText, invalidZipValidationText } from '../../utility/validationMessages';

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

    const TextInputField = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <div>
                {props.type === 'text' && (
                    <TextField label={label} className={`form-control ${meta.touched && meta.error && 'is-valid'}`} {...field} {...props} autoComplete="off" />
                )}
                {props.type === 'textarea' && (
                    <TextField label={label} multiline maxRows={3} className={`form-control ${classes.addressField} ${meta.touched && meta.error && 'is-valid'}`} {...field} {...props} autoComplete="off" />
                )}
                <ErrorMessage component="div" name={field.name} className={classes.errorField} />
            </div>
        )
    }

    const submitForm = (values) => {

    }

    return (
        <div className={classes.mainDiv}>
            <h3>{title}</h3>
            <Formik initialValues={{ name: '', address: '', zip: '', city: '', state: '' }} validationSchema={validate} onSubmit={values => submitForm(values)}>
                {formik => (
                    <Form>
                        <div class={classes.field}>
                            <TextInputField label={hospitalNameLabelText} name="name" type="text" />
                        </div>
                        <div class={classes.field}>
                            <TextInputField label={hospitalAddressLabelText} name="address" type="textarea" />
                        </div>
                        <div class={classes.field}>
                            <TextInputField label={hospitalZipLabelText} name="zip" type="text" />
                        </div>
                        <div class={classes.field}>
                            <TextInputField label={hospitalCityLabelText} name="city" type="text" />
                        </div>
                        <div class={classes.field}>
                            <TextInputField label={hospitalStateLabelText} name="state" type="text" />
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
