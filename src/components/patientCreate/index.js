import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  hospitalDdlList,
  hospitalUserTypes,
  cancelText,
  addPatientText,
  updatePatientText,
  cityDdlList,
  stateDdlList,
} from "../../utility/commonTexts";
import InputField from "../inputfield/index";
import {
  hospitalUserNameValidationText,
  dateOfBirthValidationText,
  invalidDateValidationText,
  zipValidationText,
  contactNumberValidationText,
  emailValidationText,
  stateValidationText,
  cityValidationText,
  aadharCardValidationText,
  userPanCardValidationText,
} from "../../utility/validationMessages";
import { getPatientListDetails } from "../../store/actions/patientList/index";
import {
  addPatient,
  setEditedPatientUserData,
} from "../../store/actions/patientCreate/index";
import { useDispatch, useSelector } from "react-redux";
import React, { useMemo, useCallback, useState, useEffect } from "react";
import { startLoading } from "../../store/actions/loader/index";
import { isNull } from "lodash-es";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    margin: theme.spacing(6),
  },
  field: {
    marginTop: theme.spacing(1),
  },
  btnDiv: {
    marginTop: theme.spacing(6),
    justifyContent: "center",
    display: "flex",
    margin: "-10px",
  },
  cancelBtn: {
    marginLeft: theme.spacing(4),
  },
  errorField: {
    color: "red",
    marginTop: theme.spacing(1),
  },
  asterisk: {
    color: "red",
    fontSize: "20px",
  },
  ddlAsterisk: {
    color: "red",
    fontSize: "20px",
    marginLeft: "6px",
  },
  addressField: {
    width: "25ch",
  },
  ddl: {
    width: "25ch",
  },
  cnfrmBtn: {
    top: "50%",
    height: 40,
    float: "right",
    position: "relative",
  },
  BtnHolder: {
    marginTop: theme.spacing(2),
  },
  divStyle: {
    paddingTop: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
  },
  show: {
    display: "block",
  },
  hidden: {
    display: "none",
  },
  column: {
    float: "left",
    width: "50%",
  },
  formcontainer: {
    display: "flex",
    flexDirection: "column",
  },
  innerformcontainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  left: {
    paddingRight: "20px",
  },
}));

const PatientCreateForm = (props) => {
  const [formvalidate, setFormValidate] = useState(false);
  var initialValuesForAdd = {
    firstName: "",
    lastName: "",
    contactNumber: "",
    emailID: "",
    pincode: "",
    city: "",
    state: "",
    panNumber: "",
    aadharNumber: "",
    dob: "",
  };
  var initialValues = {
    firstName: "",

    lastName: "",
    contactNumber: "",
    emailID: "",
    pincode: "",
    city: "",
    state: "",
    panNumber: "",
    aadharNumber: "",
    dob: "",
  };
  const [getDetails, setDetails] = useState(initialValues);

  const EditDetails = () => {
    useEffect(() => {
      setDetails({
        ...initialValues,
        firstName: props.pDatas.patientFirstName,
        lastName: props.pDatas.patientLastName,
        contactNumber: props.pDatas.patientContactNumber,
        emailID: props.pDatas.patientEmailId,
        pincode: props.pDatas.patientLocationDetailsResp.pinNumber,
        city: props.pDatas.patientLocationDetailsResp.cityName,
        state: props.pDatas.state,
        panNumber: props.pDatas.patientIdentificationDetailsResp.panNumber,
        aadharNumber:
          props.pDatas.patientIdentificationDetailsResp.aadharNumber,
        dob: props.pDatas.dateOfBirth,
      });
    }, [props.pDatas.patientFirstName]);
  };
  if (props.editMode) {
    EditDetails();
  }

  const hidepopup = () => {
    if (formvalidate) {
      props.actioncontrol();
    }
  };
  const classes = useStyles();

  const title = addPatientText;

  const storeData = useSelector((store) => {
    return {
      loggedInUserData: store.auth,
      singlePatDetails: store.patientListReducer,
      pat: store.patientListReducer,
    };
  });

  const validate = Yup.object({
    firstName: Yup.string().max(100).required(hospitalUserNameValidationText),
    lastName: Yup.string().max(100).required(hospitalUserNameValidationText),
    dob: Yup.string()
      .required(dateOfBirthValidationText)
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        invalidDateValidationText
      ),
    contactNumber: Yup.number().min(10).required(contactNumberValidationText),
    emailID: Yup.string().required(emailValidationText),
    //.matches(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValidationText)),
    city: Yup.string().required(cityValidationText),
    pincode: Yup.number().required(zipValidationText),
    state: Yup.string().required(stateValidationText),
    panNumber: Yup.string().required(userPanCardValidationText),
    aadharNumber: Yup.string().required(aadharCardValidationText),
  });

  const dispatch = useDispatch();

  const submitForm = (values) => {
    props.actioncontrol();
    if (!props.editMode) {
      props.controldisplay(values);
    } else {
      props.controldisplay_edit(values);
    }

    let token = storeData.loggedInUserData.token;
    let zip = storeData.loggedInUserData.pinCode;
    dispatch(startLoading("Please wait..."));

    var patientDetails = {};
    patientDetails.dateOfBirth = values.dob;
    patientDetails.patientContactNumber = values.contactNumber;
    patientDetails.patientEmailId = values.emailID;
    patientDetails.patientFirstName = values.firstName;
    patientDetails.patientIdentificationDetailsReq = {};
    patientDetails.patientIdentificationDetailsReq.aadharNumber =
      values.aadharNumber;
    patientDetails.patientIdentificationDetailsReq.panNumber = values.panNumber;
    patientDetails.patientLastName = values.lastName;
    patientDetails.patientLocationDetailsReq = {};
    patientDetails.patientLocationDetailsReq.cityName = values.city;
    patientDetails.patientLocationDetailsReq.pinNumber = values.pincode;
    patientDetails.state = values.state;

    //FOR EDIT

    var patientDetailsAfterEdit = {};
    patientDetailsAfterEdit.dateOfBirth = values.dob;
    patientDetailsAfterEdit.patientContactNumber = values.contactNumber;
    patientDetailsAfterEdit.patientEmailId = values.emailID;
    patientDetailsAfterEdit.patientFirstName = values.firstName;
    patientDetailsAfterEdit.patientIdentificationDetails = {};
    patientDetailsAfterEdit.patientIdentificationDetails.aadharNumber =
      values.aadharNumber;
    patientDetailsAfterEdit.patientIdentificationDetails.panNumber =
      values.panNumber;
    patientDetailsAfterEdit.patientLastName = values.lastName;
    patientDetailsAfterEdit.patientLocationDetails = {};
    patientDetailsAfterEdit.patientLocationDetails.cityName = values.city;
    patientDetailsAfterEdit.patientLocationDetails.pinNumber = values.pincode;
    patientDetailsAfterEdit.state = values.state;

    !props.editMode
      ? dispatch(addPatient(patientDetails, token))
      : dispatch(
          setEditedPatientUserData(
            patientDetailsAfterEdit,
            token,
            props.pDatas.patientId
          )
        );

    dispatch(getPatientListDetails(zip, token));
    setFormValidate(true);
  };

  return (
    <div className={classes.mainDiv}>
      <h3>{!props.editMode ? "Create Patient" : "Update Patient"}</h3>

      <Formik
        enableReinitialize={true}
        initialValues={!props.editMode ? initialValuesForAdd : getDetails}
        validationSchema={validate}
        onSubmit={(values) => submitForm(values)}
      >
        {(formik) => (
          <Form className={classes.formcontainer}>
            <div className={classes.innerformcontainer}>
              <div className={classes.left}>
                <div className={classes.field}>
                  <InputField
                    label="First Name"
                    onChange={(e) =>
                      formik.setFieldValue("firstName", e.target.value)
                    }
                    name="firstName"
                    type="text"
                    required
                    classes={classes}
                  />
                </div>
                <div className={classes.field}>
                  <InputField
                    label="Last Name"
                    onChange={(e) =>
                      formik.setFieldValue("lastName", e.target.value)
                    }
                    name="lastName"
                    type="text"
                    required
                    classes={classes}
                  />
                </div>
                <div className={classes.field}>
                  <InputField
                    label="Date of Birth"
                    onChange={(e) =>
                      formik.setFieldValue("dob", e.target.value)
                    }
                    name="dob"
                    type="text"
                    required
                    classes={classes}
                  />
                </div>
                <div className={classes.field}>
                  <InputField
                    label="Contact Number"
                    onChange={(e) =>
                      formik.setFieldValue("contactNumber", e.target.value)
                    }
                    name="contactNumber"
                    type="text"
                    required
                    classes={classes}
                  />
                </div>
                <div className={classes.field}>
                  <InputField
                    label="Email ID"
                    onChange={(e) =>
                      formik.setFieldValue("emailID", e.target.value)
                    }
                    name="emailID"
                    type="text"
                    required
                    classes={classes}
                  />
                </div>
              </div>
              <div className={classes.right}>
                <div className={classes.field}>
                  <InputField
                    label="Zip Code"
                    onChange={(e) =>
                      formik.setFieldValue("pincode", e.target.value)
                    }
                    name="pincode"
                    type="text"
                    required
                    classes={classes}
                  />
                </div>

                <div className={classes.field}>
                  <InputField
                    label="City"
                    onChange={(e) =>
                      formik.setFieldValue("city", e.target.value)
                    }
                    name="city"
                    type="select"
                    options={cityDdlList}
                    required
                    classes={classes}
                  />
                </div>
                <div className={classes.field}>
                  <InputField
                    label="State"
                    onChange={(e) =>
                      formik.setFieldValue("state", e.target.value)
                    }
                    name="state"
                    type="select"
                    options={stateDdlList}
                    required
                    classes={classes}
                  />
                </div>
                <div className={classes.field}>
                  <InputField
                    label="Pan Number"
                    onChange={(e) =>
                      formik.setFieldValue("panNumber", e.target.value)
                    }
                    name="panNumber"
                    type="text"
                    required
                    classes={classes}
                  />
                </div>
                <div className={classes.field}>
                  <InputField
                    label="Aadhar Number"
                    onChange={(e) =>
                      formik.setFieldValue("aadharNumber", e.target.value)
                    }
                    name="aadharNumber"
                    required
                    type="text"
                    classes={classes}
                  />
                </div>
              </div>
            </div>

            {!props.editMode && (
              <div className={classes.btnDiv}>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  type="submit"
                  onClick={hidepopup}
                >
                  {addPatientText}
                </Button>
                <Button
                  onClick={props.actioncontrol}
                  className={classes.cancelBtn}
                  variant="contained"
                  size="medium"
                >
                  {cancelText}
                </Button>
              </div>
            )}

            {props.editMode && (
              <div className={classes.btnDiv}>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  type="submit"
                >
                  {updatePatientText}
                </Button>
                <Button
                  onClick={props.actioncontrol}
                  className={classes.cancelBtn}
                  variant="contained"
                  size="medium"
                >
                  {cancelText}
                </Button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PatientCreateForm;
