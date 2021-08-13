import axios from 'axios';
import { setAlert } from '../alert/index';
import { stopLoading } from '../loader/index';
import history from '../../../routes/history';

export const TYPES = {
    SETPATIENTDETAILS: 'SETPATIENTDETAILS'
}

export function SetPatientDetails (value,token) { 
    // type: TYPES.SETPATIENTDETAILS ;
    // payload: value;
    token = token ? token : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODEyMzQ2NzgiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJQT1JUQUxfQURNSU4ifV0sImNpdHlOYW1lIjoiQmFuZ2Fsb3JlIiwiaG9zcGl0YWxJZCI6bnVsbCwicGluQ29kZSI6IjU2MDAwMSIsImhvc3BpdGFsQnJhbmNoSWQiOm51bGwsImV4cCI6MTYyODc2Mzc3MSwiaWF0IjoxNjI4NzU2NTcxfQ.s8xQH6jnuDXJPhXlBv00f_JRUp6wjUfOKARpUB_2qUU";
    return async dispatch => {
       try {
          await axios.post('http://9.43.92.240:8081/bbs/_book', value , { headers: getHeaders(token) })
          .then((response) => {            
            let hospitalAvailableBedList = response.data;    
             return onSuccess(response, hospitalAvailableBedList);
          });        
       } catch (error) {
          return onError(error);
       }
 
       function onSuccess(response, hospitalAvailableBedList) {
        //   dispatch({ type: TYPES.GET_HOSPITAL_LIST, payload: response.data });
        //   dispatch(setHospitalDdlOption(hospitalList));
        let message = "Booking for Patient Confirmed.Please check available beds and find booking details.'Booking ID -"+ " "+ hospitalAvailableBedList.bookingId + " Booking Status - " + hospitalAvailableBedList.bookingStatus;
        dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: message }));
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