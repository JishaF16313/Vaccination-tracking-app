import React,{useState} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from "@material-ui/core/Paper"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { passwordMinLengthValidationText, passwordValidationText, userAadharIdValidationText, cityValidationText, zipValidationText ,confirmPasswordValidationText} from '../../utility/validationMessages';
import InputField from '../inputfield/index';
import {useSelector, useDispatch} from "react-redux"
import {userRegister,userRegisterFail} from "../../store/actions/users"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import * as API from '../../lib/api';
import {USER_REGISTER_V1 ,USER_SERVICE} from '../../env-config'
import history from "../../routes/history";


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


export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const {isRegister,isRegisterFail} = useSelector(store => store.users);
  const[registerFail,setregisterFail] = useState(false);


  const handleClose = () => {
    dispatch(userRegister(false));
    isRegister && history.push("/signin");
  }
  const failhandleClose = () => {
    setregisterFail(false)
  }
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;

  }
  const validate = Yup.object({
    userLoginId: Yup.string().min(12).required(userAadharIdValidationText),
    pwd: Yup.string().min(8, passwordMinLengthValidationText).max(100).required(passwordValidationText),
    confirmPwd: Yup.string().when("pwd", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("pwd")],
          "Both password need to be the same"
        )
      }).required(confirmPasswordValidationText),
      cityName: Yup.string().required(cityValidationText),
      pinCode: Yup.string().required(zipValidationText)
});


// React.useEffect(() => {
//     isRegister && history.push("/signin")
// }, [isRegister])

const submitForm = async (values) => {
    try{
      await API.API_POST_SERVICE(`${USER_SERVICE}${USER_REGISTER_V1}`,values).then((res)=>{
        dispatch(userRegister(res));
    })
  } catch(error){
    dispatch(userRegisterFail(error.message));
    setregisterFail(true)
  } 
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
           
      <Paper className={classes.paper} elevation={3} >
      
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Formik initialValues={{userLoginId: '', pwd: ''}} validationSchema={validate} onSubmit={values => submitForm(values)}>
                {formik => (
                    <Form className={classes.form}>
                        <div className={classes.field}>
                            <InputField label="Aadhar Number" onChange={(e) => formik.setFieldValue('userLoginId', e.target.value)} name="userLoginId" type="text" classes={classes} style={{width: "100%"}} maxLength={16}/>
                        </div>
                        <div className={classes.field}>
                            <InputField label="Password" onChange={(e) => formik.setFieldValue('pwd', e.target.value)} name="pwd" type="password" classes={classes} style={{width: "100%"}}/>
                        </div>
                        <div className={classes.field}>
                            <InputField label="Confirm Password" onChange={(e) => formik.setFieldValue('confirmPwd', e.target.value)} name="confirmPwd" type="password" classes={classes} style={{width: "100%"}}/>
                        </div>
                        <div className={classes.field}>
                            <InputField label="City" onChange={(e) => formik.setFieldValue('cityName', e.target.value)} name="cityName" type="text" classes={classes} style={{width: "100%"}}/>
                        </div>
                        <div className={classes.field}>
                            <InputField label="Pincode" onChange={(e) => formik.setFieldValue('pinCode', e.target.value)} name="pinCode" type="text" classes={classes} style={{width: "100%"}}/>
                        </div>
                        <div className={classes.btnDiv}>
                            <Button variant="contained" color="primary" size="medium" type="submit" disabled={isRegister}>Register</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        
           <Snackbar anchorOrigin={{  vertical: 'top', horizontal: 'center' }} open={registerFail} autoHideDuration={6000} onClose={failhandleClose}>
           <Alert  severity="error" onClose={failhandleClose}>
           {isRegisterFail}
           </Alert>
           </Snackbar>
               
         <Snackbar anchorOrigin={{  vertical: 'top', horizontal: 'center' }} open={isRegister} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
            User registered Successfully            
            </Alert>
            </Snackbar>
          </Paper>
    </Container>
  );
}
