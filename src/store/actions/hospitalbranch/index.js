import axios from 'axios';
import { setAlert } from '../alert/index';
import { stopLoading } from '../loader/index';

export const TYPES = {
   GET_HOSPITAL_BRANCH_LIST: 'GET_HOSPITAL_BRANCH_LIST',
   ADD_UPDATE: 'ADD_UPDATE',
   ADD_BRANCH: 'ADD_BRANCH',
   SET_EDITED_HOSPITAL_BRANCH_DATA: 'SET_EDITED_HOSPITAL_BRANCH_DATA',
   UPDATE_HOSPITAL_BRANCH: 'UPDATE_HOSPITAL_BRANCH'
}

export const getHospitalBranchList = () => ({
   type: TYPES.GET_HOSPITAL_BRANCH_LIST
});

export const setAddOrUpdate = (value) => ({
   type: TYPES.ADD_UPDATE, payload: value
});

//api call for create hospital branch
export function addHospitalBranch(bodyObject, token) {
   token = token ? token : 'xxxx';
   return async dispatch => {
      try {
         const response = await axios.post('http://9.199.45.76:8080/bas/branch/_create', bodyObject, { headers: getHeaders(token) });
         return onSuccess(response);
      } catch (error) {
         return onError(error);
      }

      function onSuccess(response) {
         dispatch({ type: TYPES.ADD_BRANCH, payload: response.data.branchId });
         dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: 'Hospital branch created successfully.' }));
         dispatch(stopLoading());
      }
      function onError(error) {
         dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
         dispatch(stopLoading());
      }
   }
}

export const setEditedHospitalBranchData = (value) => ({
   type: TYPES.SET_EDITED_HOSPITAL_BRANCH_DATA, payload: value
});

export const updateHospitalBranch = (value) => ({
   type: TYPES.UPDATE_HOSPITAL_BRANCH, payload: value
});

export const getHeaders = (token) => {
   const headers = {
      'Content-Type': 'application/json',
      'X-Token-ID': token
   }
   return headers;
}
