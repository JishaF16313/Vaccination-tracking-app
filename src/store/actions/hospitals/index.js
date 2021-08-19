import axios from 'axios';
import { setAlert } from '../alert/index';
import { stopLoading } from '../loader/index';
import history from '../../../routes/history';
import * as API_HOST from '../../../env-config';

export const TYPES = {
   GET_HOSPITAL_LIST: 'GET_HOSPITAL_LIST',
   ADD_UPDATE: 'ADD_UPDATE',
   ADD_HOSPITAL: 'ADD_HOSPITAL',
   SET_EDITED_HOSPITAL_DATA: 'SET_EDITED_HOSPITAL_DATA',
   UPDATE_HOSPITAL: 'UPDATE_HOSPITAL',
   SET_DELETING_HOSPITAL_ID: 'SET_DELETING_HOSPITAL_ID',
   OPEN_HOSPITAL_DELETE_DIALOG: 'OPEN_HOSPITAL_DELETE_DIALOG',
   DELETE_SELECTED_HOSPITAL: 'DELETE_SELECTED_HOSPITAL',
   SET_HOSPITAL_DDL_OPTIONS: 'SET_HOSPITAL_DDL_OPTIONS'
}

export function getHospitalList(token) {      
   return async dispatch => {
      try {
         await axios.get(`${API_HOST.BED_AVAILABILITY_SERVICE}_allHospitals`, { headers: getHeaders(token) })
         .then((response) => {             
            let hospitalList = response.data.map((item) => {
                  return { label: item.hospitalName , value: item.hospitalId };
            });           
            return onSuccess(response, hospitalList);
         });        
      } catch (error) {
         return onError(error);
      }

      function onSuccess(response, hospitalList) {
         dispatch({ type: TYPES.GET_HOSPITAL_LIST, payload: response.data });
         dispatch(setHospitalDdlOption(hospitalList));
         dispatch(stopLoading());
      }
      function onError(error) {
         dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
         dispatch(stopLoading());
      }
   }
}

export const setHospitalDdlOption = (value) => ({
   type: TYPES.SET_HOSPITAL_DDL_OPTIONS, payload: value
});

export const setAddOrUpdate = (value) => ({
   type: TYPES.ADD_UPDATE, payload: value
});

//api call for create hospital
export function addHospital(bodyObject, token) {
   return async dispatch => {
      try {
         await axios.post(`${API_HOST.BED_AVAILABILITY_SERVICE}hospital/_create`, bodyObject, { headers: getHeaders(token) })
         .then((response) => {
            return onSuccess(response);
         })         
      } catch (error) {
         return onError(error);
      }

      function onSuccess(response) {
         dispatch({ type: TYPES.ADD_HOSPITAL, payload: response.data.hospitalId });
         dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: 'Hospital created successfully.' }));
         dispatch(stopLoading());
         history.push('/admindashboard');
      }
      function onError(error) {
         dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
         dispatch(stopLoading());
      }
   }
};

export const setEditedHospitalData = (value) => ({
   type: TYPES.SET_EDITED_HOSPITAL_DATA, payload: value
});

export const updateHospital = (value) => ({
   type: TYPES.UPDATE_HOSPITAL, payload: value
});

export const setDeletingHospitalId = (value) => ({
   type: TYPES.SET_DELETING_HOSPITAL_ID, payload: value
});

export const setOpenHospitalDeleteDialog = (value) => ({
   type: TYPES.OPEN_HOSPITAL_DELETE_DIALOG, payload: value
});

export const deleteSelectedHospital = () => ({
   type: TYPES.DELETE_SELECTED_HOSPITAL
});

export const getHeaders = (token) => {
   const headers = {
      'Content-Type': 'application/json',
      'X-Token-ID': token
   }
   return headers;
}
