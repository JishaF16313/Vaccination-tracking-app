import axios from 'axios';

export const TYPES = {
   GET_HOSPITAL_LIST: 'GET_HOSPITAL_LIST',
   ADD_UPDATE: 'ADD_UPDATE',
   ADD_HOSPITAL: 'ADD_HOSPITAL',
   SET_EDITED_HOSPITAL_DATA: 'SET_EDITED_HOSPITAL_DATA',
   UPDATE_HOSPITAL: 'UPDATE_HOSPITAL',
   SET_DELETING_HOSPITAL_ID: 'SET_DELETING_HOSPITAL_ID',
   OPEN_HOSPITAL_DELETE_DIALOG: 'OPEN_HOSPITAL_DELETE_DIALOG',
   DELETE_SELECTED_HOSPITAL: 'DELETE_SELECTED_HOSPITAL'
}

export const getHospitalList = () => ({
   type: TYPES.GET_HOSPITAL_LIST
});

export const setAddOrUpdate = (value) => ({
   type: TYPES.ADD_UPDATE, payload: value
});

//api call for create hospital
export function addHospital(bodyObject, token) {
   debugger;
   token = token ? token : 'xxxx';
   return dispatch => {
      return axios.post('http://9.85.71.82:8080/bas/hospital/_create', bodyObject, { headers: getHeaders(token) })
         .then((response) => {
            debugger;
            if (response && response.status === 200 && response.data) {
               dispatch({ type: TYPES.ADD_HOSPITAL, payload: response.data.hospitalId })
            } else if (response && response.status === 404) {

            }
         })
         .catch((error) => {

         });
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