import axios from 'axios';
import { setAlert } from '../alert/index';
import { stopLoading } from '../loader/index';
import history from '../../../routes/history';
import * as API_HOST from '../../../env-config';

export const TYPES = {
    SETPATIENTDETAILS: 'SETPATIENTDETAILS',
    SET_HOSPITAL_AVAIALBLE_BED_LIST: 'SET_HOSPITAL_AVAIALBLE_BED_LIST'
}

export function SetPatientDetails (value,token) { 
   //  token = token ? token : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODEyMzQ2NzgiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJQT1JUQUxfQURNSU4ifV0sImNpdHlOYW1lIjoiQmFuZ2Fsb3JlIiwiaG9zcGl0YWxJZCI6bnVsbCwicGluQ29kZSI6IjU2MDAwMSIsImhvc3BpdGFsQnJhbmNoSWQiOm51bGwsImV4cCI6MTYyODc2Mzc3MSwiaWF0IjoxNjI4NzU2NTcxfQ.s8xQH6jnuDXJPhXlBv00f_JRUp6wjUfOKARpUB_2qUU";
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
   //dummy data
   //  let data={
   //    "bookingId": "6bd02a27-7fc9-4046-91c4-5020354d9e85",
   //    "bookingStatus": "pending",
   //    "waitingNumber": "18",
   //    "Hospitals": [
   //      {
   //          "hospitalName": "Appollo",
   //        "hospitalId": "9f3c716d-6efc-43a7-9752-616d9f65bfca",
   //        "Branches": [
   //          {
   //            "branchName": "Indira Nagar",
   //            "branchId": "a01bb58a-bd2c-43e5-aca8-826e5dc7524b",
   //            "Beds": [
   //              {
   //                "bed-type": "Single",
   //                "bed-facility": "Oxygen",
   //                "bed-id": "244fec7a-474b-484e-baa7-69867a7b2324"
   //              }
   //            ]
   //          }
   //        ]
   //      }
   //    ]
   //  }
    let parsedResponseArr = [];
    if(response.data){
       let data = response.data;
       let parsedResponseArr = [];
       for(var i=0 ; i<data.Hospitals.length ; i++){
          for(var j=0; j<data.Hospitals[i].Branches.length;j++){
             for(var k=0;k<data.Hospitals[i].Branches[j].Beds.length;k++){
               parsedResponseArr.push({
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
       console.log("data",parsedResponseArr);
      // data['Hospitals'].forEach(element => {
      //    element['Branch'].forEach(elem => {
      //       elem['Beds'].forEach(ele => {
      //          parsedResponseArr.push({
      //             "hospitalName" : element.hospitalName,
      //             "hospitalId" : element.hospitalId,
      //             "branchName" : elem.branchName,
      //             "branchId" : elem.branchId,
      //             "bedType" : ele['bed-Type'],
      //             "bedFacility" : ele['bed-facility'],
      //             "bedId" : ele['bed-id']
      //          })
      //       })
      //    })
      // });
    }
    return parsedResponseArr;
 }

 export const hospitalAvailbleBedList = (value) => ({
   type: TYPES.SET_HOSPITAL_AVAIALBLE_BED_LIST, payload: value
});