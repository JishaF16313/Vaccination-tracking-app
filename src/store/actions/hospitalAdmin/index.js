import axios from 'axios';
import { setAlert } from '../alert/index';
import { stopLoading } from '../loader/index';
import history from '../../../routes/history';
import * as API_HOST from '../../../env-config';


export const TYPES = {
    GET_HOSPITAL_BED_LIST: 'GET_HOSPITAL_BED_LIST',
    ADD_BED: 'ADD_BED',
    RESET_TEMP_: 'GET_HOSPITAL_BED_LIST',
 }

//api call for create hospital bed
export function addBed(bodyObject, token) {
    return async dispatch => {
       try {
          await axios.post(`${API_HOST.BED_AVAILABILITY_SERVICE}/_bulkUpload`, bodyObject, { headers: getHeaders(token) })
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
 

 export const getHeaders = (token) => {
    const headers = {
       'Content-Type': 'application/json',
       'X-Token-ID': token
    }
    return headers;
 }