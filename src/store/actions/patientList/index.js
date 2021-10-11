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
  SET_HOSPITAL_AVAIALBLE_BED_LIST: "SET_HOSPITAL_AVAIALBLE_BED_LIST",

  TABLE_RAW: "TABLE_RAW",
};

export const getTableRaw = (value) => ({
  type: TYPES.TABLE_RAW,
  payload: value,
});

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

/***setting Available Bed Data */
export const hospitalAvailbleBedList = (value) => ({
  type: TYPES.SET_HOSPITAL_AVAIALBLE_BED_LIST,
  payload: value,
});
//BED BOOKING

export function PatientBedBookingDetails(value, token) {
  return async (dispatch) => {
    try {
      await axios
        .post(`${API_HOST.BEDBOOKING_SERVICE}_book`, value, {
          headers: getHeaders(token),
        })
        .then((response) => {
          if (response.data.message) {

            dispatch(
              setAlert({
                alertType: "error",
                alertTitle: "Error",
                alertMessage: response.data.message,
              })
            );
            dispatch(stopLoading());
          } else {
            let hospitalAvailableBedList = parseHospitalBedData(response);
            return onSuccess(response, hospitalAvailableBedList);
          }
        });
    } catch (error) {
      return onError(error);
    }

    function onSuccess(response, hospitalAvailableBedList) {
      let message =
        "Booking for Patient Confirmed.Please check available beds below and find booking details.'Booking ID -" +
        " " +
        response.data.bookingId +
        " Booking Status - " +
        response.data.bookingStatus;

      dispatch(
        setAlert({
          alertType: "success",
          alertTitle: "Success",
          alertMessage: message,
        })
      );

      dispatch(hospitalAvailbleBedList(hospitalAvailableBedList));
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

//Hospitals
export const parseHospitalBedData = (response) => {
  let parsedResponseArr = [];
  if (response.data) {
    let data = response.data;
    let finalResponseData = [];
    let bookingResponseData = [];
    let parsedResponseArr = [];
    bookingResponseData.push({
      bookingID: data.bookingId,
      bookingStatus: data.bookingStatus,
      waitingNumber: data.waitingNumber,
    });
    for (let i = 0; i < data.Hospitals.length; i++) {
      for (let j = 0; j < data.Hospitals[i].Branches.length; j++) {
        for (let k = 0; k < data.Hospitals[i].Branches[j].Beds.length; k++) {
          parsedResponseArr.push({
            id: data.Hospitals[i].hospitalId + "-" + k, //dynamic ID
            hospitalName: data.Hospitals[i].hospitalName,
            hospitalId: data.Hospitals[i].hospitalId,
            branchName: data.Hospitals[i].Branches[j].branchName,
            branchId: data.Hospitals[i].Branches[j].branchId,
            bedType: data.Hospitals[i].Branches[j].Beds[k]["bed-type"],
            bedFacility: data.Hospitals[i].Branches[j].Beds[k]["bed-facility"],
            bedId: data.Hospitals[i].Branches[j].Beds[k]["bed-id"],
          });
        }
      }
    }
    finalResponseData.bookingResponseData = bookingResponseData;
    finalResponseData.bedAvailabilityData = parsedResponseArr;
    return finalResponseData;
  }
};
