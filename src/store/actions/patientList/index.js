import axios from "axios";
import { setAlert } from "../alert/index";
import { stopLoading } from "../loader/index";
import history from "../../../routes/history";
import * as API_HOST from "../../../env-config";
import * as API from "../../../lib/api";
import { startLoading } from "../loader";

export const TYPES = {
  POPULATE_PATIENTS: "POPULATE_PATIENTS",
  SET_DELETING_PATIENT_USER_ID: "SET_DELETING_PATIENT_USER_ID",
  OPEN_PATIENT_USER_DELETE_DIALOG: "OPEN_PATIENT_USER_DELETE_DIALOG",
  DELETE_SELECTED_PATIENT_USER: "DELETE_SELECTED_PATIENT_USER",

  GET_PATIENT_BY_ID: "GET_PATIENT_BY_ID",

  UPDATE_PATIENTS: "UPDATE_PATIENTS",
  SET_EDITED_PATIENT_USER_DATA: "SET_EDITED_PATIENT_USER_DATA",
  ADD_UPDATE: "ADD_UPDATE",
};

export const updatePatientsUser = (value) => ({
  type: TYPES.UPDATE_PATIENTS,
  payload: value,
});

export const setAddOrUpdate = (value) => ({
  type: TYPES.ADD_UPDATE,
  payload: value,
});
export const setDeletingPatientUserId =
  (patientId) => async (dispatch, getStore) => {
    const token = getStore().auth.token;
    dispatch(startLoading("Deleting Patient"));
    try {
      const response = await API.API_DELETE_SERVICE(
        `${API_HOST.PATIENT_SERVICE}${patientId}/_delete`,
        { headers: { "X-Token-ID": token } }
      );
      dispatch(deletePatientSuccess(patientId));
      dispatch(
        setAlert({
          alertType: "success",
          alertTitle: "Success",
          alertMessage: "Patient deleted successfully.",
        })
      );
      dispatch(stopLoading());
    } catch (error) {
      dispatch(
        setAlert({
          alertType: "error",
          alertTitle: "Error",
          alertMessage: "Patient deletion failed",
        })
      );
      dispatch(stopLoading());
    }
  };
const deletePatientSuccess = (patientId) => ({
  type: TYPES.SET_DELETING_PATIENT_USER_ID,
  payload: patientId,
});

export const setOpenPatientUserDeleteDialog = (value) => ({
  type: TYPES.OPEN_PATIENT_USER_DELETE_DIALOG,
  payload: value,
});

export const deleteSelectedPatientUser = (value) => ({
  type: TYPES.DELETE_SELECTED_PATIENT_USER,
  payload: value,
});

//API for get patient by ID
export function getPatientById(pidId, token) {
  return async (dispatch) => {
    dispatch(startLoading("Loading Patient"));
    try {
      await axios
        .get(`${API_HOST.PATIENT_SERVICE}${pidId}/_getPatient`, {
          headers: getHeaders(token),
        })
        .then((response) => {
          return onSuccess(response.data);
        });
    } catch (error) {
      return onError(error);
    }

    function onSuccess(patientData) {
      dispatch({ type: TYPES.GET_PATIENT_BY_ID, payload: patientData });
      dispatch({ type: TYPES.CONTROL_DIALOG_BOX, payload: true });

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
      if (zipcode) {
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
