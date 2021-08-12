import axios from 'axios';
import { setAlert } from '../alert/index';
import { stopLoading } from '../loader/index';
import history from '../../../routes/history';
import * as API_HOST from '../../../env-config';

export const TYPES = {
    GET_USER_LIST: 'GET_USER_LIST',
    ADD_UPDATE: 'ADD_UPDATE',
    ADD_USER: 'ADD_USER',
    SET_EDITED_HOSPITAL_USER_DATA: 'SET_EDITED_HOSPITAL_USER_DATA',
    UPDATE_HOSPITAL_USER: 'UPDATE_HOSPITAL_USER',
    SET_DELETING_HOSPITAL_USER_ID: 'SET_DELETING_HOSPITAL_USER_ID',
    OPEN_HOSPITAL_USER_DELETE_DIALOG: 'OPEN_HOSPITAL_USER_DELETE_DIALOG',
    DELETE_SELECTED_HOSPITAL_USER: 'DELETE_SELECTED_HOSPITAL_USER'
 }
 
 export const getUserList = () => ({
    type: TYPES.GET_USER_LIST
 });
 
 export const setAddOrUpdate = (value) => ({ 
    type: TYPES.ADD_UPDATE , payload: value
 });
 
 export function addHospitalUser(bodyObject, token){    
   return async dispatch => {
      try {
         await axios.post(`${API_HOST.USER_SERVICE}_create?role=${bodyObject.userType}`, bodyObject, { headers: getHeaders(token) })
         .then((response) => {
            return onSuccess(response);
         })         
      } catch (error) {
         return onError(error);
      }

      function onSuccess(response) {
         dispatch({ type: TYPES.ADD_USER, payload: response.data });
         dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: 'Hospital user created successfully.' }));
         dispatch(stopLoading());
         history.push('/admindashboard');
      }
      function onError(error) {
         dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
         dispatch(stopLoading());
      }
   }
 };
 
 export const setEditedHospitalUserData = (value) => ({
   type: TYPES.SET_EDITED_HOSPITAL_USER_DATA , payload: value
});

export const updateHospitalUser = (value) => ({ 
   type: TYPES.UPDATE_HOSPITAL_USER , payload: value
});

export const setDeletingHospitalUserId = (value) => ({
   type: TYPES.SET_DELETING_HOSPITAL_USER_ID , payload: value
});

export const setOpenHospitalUserDeleteDialog = (value) => ({
   type: TYPES.OPEN_HOSPITAL_USER_DELETE_DIALOG, payload: value
});

export const deleteSelectedHospitalUser = () => ({
   type: TYPES.DELETE_SELECTED_HOSPITAL_USER
});

export const getHeaders = (token) => {
   const headers = {
      'Content-Type': 'application/json',
      'X-Token-ID': token
   }
   return headers;
}
