import axios from "axios";
import { setAlert } from "../alert/index";
import { stopLoading } from "../loader/index";
import * as API_HOST from "../../../env-config";

export const TYPES = {
  ADD_PATIENT: "ADD_PATIENT",
  SET_EDITED_PATIENT_USER_DATA: "SET_EDITED_PATIENT_USER_DATA",
};

/**Patient Create */
export function addPatient(bodyObject, token) {
  return async (dispatch) => {
    console.log(JSON.stringify(bodyObject));
    try {
      await axios
        .post(`${API_HOST.PATIENT_SERVICE}_register`, bodyObject, {
          headers: getHeaders(token),
        })
        .then((response) => {
          return onSuccess(response);
        });
    } catch (error) {
      return onError(error);
    }

    function onSuccess(response) {
      dispatch({ type: TYPES.ADD_PATIENT, payload: response.data.patientId });
      dispatch(
        setAlert({
          alertType: "success",
          alertTitle: "Success",
          alertMessage: "Patient created successfully.",
        })
      );
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

/**Patient Update */
export function setEditedPatientUserData(bodyObject, token, pid) {
  return async (dispatch) => {
    try {
      await axios
        .put(`${API_HOST.PATIENT_SERVICE}${pid}/_updatePatient`, bodyObject, {
          headers: getHeaders(token),
        })
        .then((response) => {
          return onSuccess(response);
        });
    } catch (error) {
      return onError(error);
    }

    function onSuccess(response) {
      dispatch({ type: TYPES.SET_EDITED_PATIENT_USER_DATA, payload: pid });

      dispatch(
        setAlert({
          alertType: "success",
          alertTitle: "Success",
          alertMessage: "Patient updated successfully.",
        })
      );
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
    "Content-Type": "application/json",
    "X-Token-ID": token,
  };
  return headers;
};
