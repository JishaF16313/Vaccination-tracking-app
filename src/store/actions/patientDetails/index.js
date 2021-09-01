import axios from 'axios';
import { setAlert } from '../alert/index';
import { stopLoading } from '../loader/index';
import * as API_HOST from '../../../env-config';

export const TYPES = {
    SETPATIENTDETAILS: 'SETPATIENTDETAILS',
    SET_HOSPITAL_AVAIALBLE_BED_LIST: 'SET_HOSPITAL_AVAIALBLE_BED_LIST',
    SET_PATIENT_BED_BOOKING_DETAILS: 'SET_PATIENT_BED_BOOKING_DETAILS',
    GET_BOOKING_STATUS: 'GET_BOOKING_STATUS',
    CONFIRM_BED_BOOKING: 'CONFIRM_BED_BOOKING',
    GET_BOOKING_DETAILS: 'GET_BOOKING_DETAILS',
    OPEN_MODAL: 'OPEN_MODAL'
}
/**Patient Booking */
export function SetPatientDetails (value,token) { 

    // token = token ? token : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTYiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJDSVRJWkVOIn1dLCJjaXR5TmFtZSI6IlB1bmUiLCJob3NwaXRhbElkIjpudWxsLCJwaW5Db2RlIjoiMTIzNDU2IiwiaG9zcGl0YWxCcmFuY2hJZCI6bnVsbCwiZXhwIjoxNjI5NDQ1OTM2LCJpYXQiOjE2Mjk0Mzg3MzZ9.ov4xVtCcR4xhoooYbHblykKimiNrVPq-pUn4uvZ32Fk";
    return async dispatch => {
       try {
          await axios.post(`${API_HOST.BEDBOOKING_SERVICE}_book`, value , { headers: getHeaders(token) })
          .then((response) => {            
            let hospitalAvailableBedList = parseHospitalBedData(response);
            return onSuccess(response, hospitalAvailableBedList);
          }); 
       } catch (error) {
          return onError(error);
       }
 
       function onSuccess(response, hospitalAvailableBedList) {
        let message = "Booking for Patient Confirmed.Please check available beds and find booking details.'Booking ID -"+ " "+ response.data.bookingId + " Booking Status - " + response.data.bookingStatus;
        dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: message }));
        dispatch(hospitalAvailbleBedList(hospitalAvailableBedList));
        dispatch(stopLoading());
       }
       function onError(error) {
        dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
        dispatch(stopLoading());

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

 export const parseHospitalBedData = (response) => {    
    if(response.data){
       let data = response.data;
       let finalResponseData = [];
       let bookingResponseData = [];
       let parsedResponseArr = [];
       bookingResponseData.push({
          "bookingID" : data.bookingId,
          "bookingStatus" : data.bookingStatus,
          "waitingNumber" : data.waitingNumber
       })
       for(let i=0 ; i<data.Hospitals.length ; i++){
          for(let j=0; j<data.Hospitals[i].Branches.length;j++){
             for(let k=0;k<data.Hospitals[i].Branches[j].Beds.length;k++){
               parsedResponseArr.push({
                  "id" :  data.Hospitals[i].hospitalId+"-" + k, //dynamic ID
                  "hospitalName" : data.Hospitals[i].hospitalName,
                  "hospitalId" : data.Hospitals[i].hospitalId,
                  "branchName" : data.Hospitals[i].Branches[j].branchName,
                  "branchId" : data.Hospitals[i].Branches[j].branchId,
                  "bedType" : data.Hospitals[i].Branches[j].Beds[k]['bed-type'],
                  "bedFacility" : data.Hospitals[i].Branches[j].Beds[k]['bed-facility'],
                  "bedId" : data.Hospitals[i].Branches[j].Beds[k]['bed-id']
               })
             }
          }
       }
       finalResponseData.bookingResponseData = bookingResponseData;
       finalResponseData.bedAvailabilityData = parsedResponseArr;
       return finalResponseData;
    }
 }
/***setting Available Bed Data */
 export const hospitalAvailbleBedList = (value) => ({
   type: TYPES.SET_HOSPITAL_AVAIALBLE_BED_LIST, payload: value
});
/**Confirm Bed Booking of Patient */
export function SetPatientBedBookingDetails (value,token){
   let bookingId = value.bookingId;
   let requestData = value.bookingData;
    return async dispatch => {
       try {
          await axios.put(`${API_HOST.BEDBOOKING_SERVICE}/`+bookingId+`/_confirm`, requestData , { headers: getHeaders(token) })
          .then((response) => {            
            return onSuccess(response);
          }); 
       } catch (error) {
          return onError(error);
       }
 
       function onSuccess(response) { 
        let message = "Booking for Patient Confirmed.Booking ID : " + response.data.bookingId + "Bed Booking Status is : " + response.data.bookingStatus;
        dispatch(confirmBedBooking(response.data));
        dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: message }));
        dispatch(stopLoading());
        dispatch(setModalState(true));
       }
       function onError(error) {
          dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
          dispatch(stopLoading());
       }
    }
}

export function GetBookingStatus (value , token) {
  var bookingID = value.bookingStatus;
  return async dispatch => {
      try {
        await axios.get(`${API_HOST.BEDBOOKING_SERVICE}${bookingID}/_status/` , { headers: getHeaders(token) })
         .then((response) => {         
           return onSuccess(response);
         }); 
      } catch (error) {
         return onError(error);
      }

      function onSuccess(response) {
       let message = "Booking for Patient Details with Booking ID: " + response.data.bookingId;
       dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: message }));
       dispatch(getBookingDetails(response.data));
       dispatch(stopLoading());
       dispatch(setModalState(true));
      }
      function onError(error) {
         dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
         dispatch(stopLoading());
      }
   }
}

export const getBookingDetails = (value) => ({
  type: TYPES.GET_BOOKING_DETAILS, payload: value
})

/***Confirm Bed Booking*/
export const confirmBedBooking = (value) => ({
  type: TYPES.CONFIRM_BED_BOOKING, payload: value
});

export const setModalState = (value) => ({
  type: TYPES.OPEN_MODAL, payload: value
})

/**Bed Avilability hospital filter*/
export function hospitalAvailbleBedListFilter_Pin (pinCode,token) { 
return async dispatch => {
     try {
        await axios.get(`${API_HOST.BED_AVAILABILITY_SERVICE}${pinCode}/_getBedAvailableByPinCode`, { headers: getHeaders(token) })
        .then((response) => {            
          let hospitalAvailableBedList = parseHospitalBedData(response);
          dispatch(hospitalAvailbleBedList(hospitalAvailableBedList));          
        }); 
     } catch (error) {
          dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
     }
  }
}

export function hospitalAvailbleBedListFilter_Hospital (hospital,token) { 
  return async dispatch => {
     try {
        await axios.get(`${API_HOST.BED_AVAILABILITY_SERVICE}${hospital}/_getBedAvailableByHospitalName`, { headers: getHeaders(token) })
        .then((response) => {            
          let hospitalAvailableBedList = parseHospitalBedData(response);
          dispatch(hospitalAvailbleBedList(hospitalAvailableBedList));          
        }); 
     } catch (error) {
          dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
     }
  }
}

