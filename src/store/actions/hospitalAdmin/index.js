import axios from 'axios';
import { setAlert } from '../alert/index';
import { stopLoading } from '../loader/index';
import history from '../../../routes/history';
import * as API_HOST from '../../../env-config';
import * as API from "../../../lib/api"
import { startLoading } from "../loader"



export const TYPES = {
   GET_HOSPITAL_BED_LIST: 'GET_HOSPITAL_BED_LIST',
   ADD_BED: 'ADD_BED',
   CLEAR_ADD_BED: 'CLEAR_ADD_BED',
   RESET_TEMP_: 'GET_HOSPITAL_BED_LIST',
   POPULATE_UPLOAD_HISTORY: 'POPULATE_UPLOAD_HISTORY',
   POPULATE_PATIENT_LIST: 'POPULATE_PATIENT_LIST',
   TOTAL_PATIENT_COUNT: 'TOTAL_PATIENT_COUNT',
   DELETE_PATIENT_BED: "DELETE_PATIENT_BED"
}

//api call for create hospital bed
export function addBed(bodyObject, token) {
   return async dispatch => {
      try {
         await axios.post(`${API_HOST.BED_AVAILABILITY_SERVICE}_bulkUpload`, bodyObject, { headers: getHeaders(token) })
            .then((response) => {
               return onSuccess(response);
            })
      } catch (error) {
         return onError(error);
      }

      function onSuccess(response) {
         dispatch({ type: TYPES.ADD_BED, payload: response.data });
         dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: 'Bed created successfully.' }));
         dispatch(stopLoading());

      }
      function onError(error) {
         dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
         dispatch(stopLoading());
      }
   }
};

// START PATIENT BED DISCHARGE ACTION 

export const deleteBedBooking = (bookingId) => async (dispatch, getStore) => {
   const token = getStore().auth.token;
   dispatch(startLoading("Deleting Bed booking"))
   try {
      bookingId.forEach(async (element) => {
         const response = await API.API_DELETE_SERVICE(`${API_HOST.BED_AVAILABILITY_SERVICE}${element}/_discharge`, { headers: { "X-Token-ID": token } })
         dispatch(deletePatientBedSuccess(bookingId))
         dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: 'Bed discharge successfully.' }));
         dispatch(stopLoading())
      });

   }
   catch (error) {
      dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: "Bed discharge failed" }));
      dispatch(stopLoading())
   }
}
const deletePatientBedSuccess = response => ({
   type: TYPES.DELETE_PATIENT_BED,
   payload: response
})
// END PATIENT BED DISCHARGE ACTION

//API CALL FOR PATIENT LISTING
export function getPatientList(token) {
   return async dispatch => {
      try {
         await axios.get(`${API_HOST.BED_AVAILABILITY_SERVICE}_getAllPatientsDetailsByBranch`, { headers: getHeaders(token) })
            .then((response) => {
               const totalPatients = response.data.length; //TOTAL PATIENTS
               let patientList = response.data.map((item, k) => {
                  return {
                     id: k + 1,
                     bookingId: item.bookingId,
                     patientName: item.patientName,
                     aadharCard: item.aadharCard,
                     bedType: item.bedType,
                     bedFacility: item.bedFacility,
                     admissionStatus: item.admissionStatus,
                  };
               });
               return onSuccess(patientList, totalPatients);
            });
      } catch (error) {
         return onError(error);
      }

      function onSuccess(patientList, totalPatients) {
         dispatch({ type: TYPES.POPULATE_PATIENT_LIST, payload: patientList });
         dispatch({ type: TYPES.TOTAL_PATIENT_COUNT, payload: totalPatients });
         dispatch(stopLoading());
      }
      function onError(error) {
         dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
         dispatch(stopLoading());
      }
   }
}

export function getUploadHistory(token) {
   return async dispatch => {
      try {
         await axios.get(`${API_HOST.BED_AVAILABILITY_SERVICE}uplaod/_status`, { headers: getHeaders(token) })
            .then((response) => {
               let successObj = response.data.map((item) => {
                  return {
                     id: item.id,
                     uploadStatus: item.status ? 'success' : 'fail'
                  };
               });
               return onSuccess(successObj);
            });
      } catch (error) {
         return onError(error);
      }

      function onSuccess(uploadHistoryData) {
         dispatch({ type: TYPES.POPULATE_UPLOAD_HISTORY, payload: uploadHistoryData });

      }
      function onError(error) {
         dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));

      }
   }
}
export const getHeaders = (token) => {
   const headers = {
      'Content-Type': 'application/json',
      'X-Token-ID': token
   }
   return headers;
}

