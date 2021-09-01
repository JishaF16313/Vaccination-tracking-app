import React from 'react';import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from "@material-ui/core/Paper"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { passwordMinLengthValidationText, passwordValidationText, hospitalUserUserNameValidationText} from '../../utility/validationMessages';
import InputField from '../inputfield/index';
import {useSelector, useDispatch} from "react-redux"
import {authenticate} from "../../store/actions/auth"
import history from "../../routes/history"


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "20px",
    Width: "400px"
  },
  form:{
    width: "100%"
  },
  field: {
      margin: theme.spacing(2),
      width: "80%"
  },
  input:{
    width: "100%"
  },
  errorField: {
    color: 'red',
    marginTop: theme.spacing(2)
},
btnDiv: {
  marginTop: theme.spacing(3),
  textAlign: "center"
},
}));

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const {isAuthenticating, authError, isAuthenticated} = useSelector(store => store.auth)

  const validate = Yup.object({
    userLoginId: Yup.string().max(100).required(hospitalUserUserNameValidationText),
    pwd: Yup.string().min(8, passwordMinLengthValidationText).max(100).required(passwordValidationText),
});

React.useEffect(() => {
  isAuthenticated && history.push("/redirect")
}, [isAuthenticated])

const submitForm = (values) => {
  dispatch(authenticate(values))
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper} elevation={3} >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik initialValues={{userLoginId: '', pwd: ''}} validationSchema={validate} onSubmit={values => submitForm(values)}>
                {formik => (
                    <Form className={classes.form}>
                        <div className={classes.field}>
                            <InputField label="User ID/Aadhar"  name="userLoginId" type="text" classes={classes} style={{width: "100%"}}/>
                        </div>
                        <div className={classes.field}>
                            <InputField label="Password" name="pwd" type="password" classes={classes} style={{width: "100%"}}/>
                        </div>
                        <div className={classes.btnDiv}>
                            <Button variant="contained" color="primary" size="medium" type="submit" disabled={isAuthenticating}>{!isAuthenticating ? "Login" : "Submitting..."}</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        {
          authError && 
          <Typography variant="caption" className={classes.errorField}>
            {authError}
          </Typography>
        }
        </Paper>
    </Container>
  );
}
