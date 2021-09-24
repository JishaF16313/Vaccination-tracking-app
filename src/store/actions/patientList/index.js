import axios from "axios";
import { setAlert } from "../alert/index";
import { stopLoading } from "../loader/index";
import history from "../../../routes/history";
import * as API_HOST from "../../../env-config";
import * as API from "../../../lib/api";
import { startLoading } from "../loader";

export const TYPES = {
  UPDATE_PATIENTS: "UPDATE_PATIENTS",
  POPULATE_PATIENTS: "POPULATE_PATIENTS",
  SET_DELETING_PATIENT_USER_ID: "SET_DELETING_PATIENT_USER_ID",
  OPEN_PATIENT_USER_DELETE_DIALOG: "OPEN_PATIENT_USER_DELETE_DIALOG",
  DELETE_SELECTED_PATIENT_USER: "DELETE_SELECTED_PATIENT_USER",
  SET_EDITED_PATIENT_USER_DATA: "SET_EDITED_PATIENT_USER_DATA",
  ADD_UPDATE: "ADD_UPDATE",
  GET_PATIENT_BY_ID: "GET_PATIENT_BY_ID",
};

export const updatePatientsUser = (value) => ({
  type: TYPES.UPDATE_PATIENTS,
  payload: value,
});
export const setEditedPatientUserData = (value) => ({
  type: TYPES.SET_EDITED_PATIENT_USER_DATA,
  payload: value,
});
export const setAddOrUpdate = (value) => ({
  type: TYPES.ADD_UPDATE,
  payload: value,
});
export const setDeletingPatientUserId = (value) => ({
  type: TYPES.SET_DELETING_PATIENT_USER_ID,
  payload: value,
});

export const setOpenPatientUserDeleteDialog = (value) => ({
  type: TYPES.OPEN_PATIENT_USER_DELETE_DIALOG,
  payload: value,
});

export const deleteSelectedPatientUser = () => ({
  type: TYPES.DELETE_SELECTED_PATIENT_USER,
});
//API for get patient by ID
export function getPatientById(pidId, token) {
  return async (dispatch) => {
    try {
      await axios
        .get(`${API_HOST.BED_AVAILABILITY_SERVICE}${pidId}/pdetails`, {
          headers: getHeaders(token),
        })
        .then((response) => {
          let patientData = response.data.map((item) => {
            return {
              patientId: item.patientId,
              patientFName: item.patientFirstName,
              patientLName: item.patientLastName,
              patientDob: item.patientFName,
              patientCnum: item.patientContactNumber,
              patientEmail: item.patientEmailId,
              patientZipCode: item.patientFName,
              patientCity: item.patientFName,
              patientState: item.patientFName,
              patientPan: item.patientFName,
              patientAadhar: item.aadharCard,
            };
          });
          return onSuccess(response, patientData);
        });
    } catch (error) {
      return onError(error);
    }

    function onSuccess(response, patientData) {
      dispatch({ type: TYPES.GET_PATIENT_BY_ID, payload: response.data });
      dispatch(stopLoading());
    }
    function onError(error) {
      dispatch(
        setAlert({
          alertType: "error",
          alertTitle: "Error",
          alertMessage: error.message,
        })
      );
      dispatch(stopLoading());
    }
  };
}

//API CALL FOR PATIENT LISTING
export function getPatientListDetails(zipcode, token) {
  return async (dispatch) => {
    try {
       if(zipcode){
      await axios
        .get(`${API_HOST.PATIENT_SERVICE}${zipcode}/_getPatients`, {
          headers: getHeaders(token),
        })

        .then((response) => {
          let patientList = response.data.map((item, k) => {
            return {
              id: k + 1,
              patientId: item.patientId,
              patientName: item.patientFirstName + " " + item.patientLastName,
              email: item.patientEmailId,
              contactno: item.patientContactNumber,
              aadharCard: item.patientIdentificationDetailsResp.aadharNumber,
            };
          });
          return onSuccess(patientList);
        });
      }
    } catch (error) {
      return onError(error);
    }

    function onSuccess(patientList) {
      dispatch({ type: TYPES.POPULATE_PATIENTS, payload: patientList });
      dispatch(stopLoading());
    }
    function onError(error) {
      dispatch(
        setAlert({
          alertType: "error",
          alertTitle: "Error",
          alertMessage: error.message,
        })
      );
      dispatch(stopLoading());
    }
  };
}

export const getHeaders = (token) => {
  //alert(token,"ggggg");
  const headers = {
    crossorigin: true,
    "Content-Type": "application/json",
    "X-Token-ID": token,
    "access-control-allow-origin": "*",
    "Content-type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  return headers;
};
