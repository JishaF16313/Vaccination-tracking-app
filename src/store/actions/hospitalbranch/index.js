import axios from 'axios';
import { setAlert } from '../alert/index';
import { stopLoading } from '../loader/index';
import history from '../../../routes/history';

export const TYPES = {
   GET_HOSPITAL_BRANCH_LIST: 'GET_HOSPITAL_BRANCH_LIST',
   ADD_UPDATE: 'ADD_UPDATE',
   ADD_BRANCH: 'ADD_BRANCH',
   SET_EDITED_HOSPITAL_BRANCH_DATA: 'SET_EDITED_HOSPITAL_BRANCH_DATA',
   UPDATE_HOSPITAL_BRANCH: 'UPDATE_HOSPITAL_BRANCH',
   SET_HOSPITAL_BRANCH_DDL_OPTIONS: 'SET_HOSPITAL_BRANCH_DDL_OPTIONS'
}

export function getHospitalBranchList(token){
   token = token ? token : 'xxxx';
   return async dispatch => {
      try {
         await axios.get('http://9.199.45.76:8080/bas/_allBranches', { headers: getHeaders(token) })
         .then((response) => {    
            let branchList = response.data.map((item) => {
                  return { label: item.branchName , value: item.branchId };
            });           
            return onSuccess(response, branchList);
         });        
      } catch (error) {
         return onError(error);
      }

      function onSuccess(response, branchList) {
         dispatch({ type: TYPES.GET_HOSPITAL_BRANCH_LIST, payload: response.data });
         dispatch(setHospitalBranchDdlOption(branchList));
         dispatch(stopLoading());
      }
      function onError(error) {
         dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
         dispatch(stopLoading());
      }
   }
};

export const setHospitalBranchDdlOption = (value) => ({
   type: TYPES.SET_HOSPITAL_BRANCH_DDL_OPTIONS, payload: value
});

export const setAddOrUpdate = (value) => ({
   type: TYPES.ADD_UPDATE, payload: value
});

//api call for create hospital branch
export function addHospitalBranch(bodyObject, token) {
   token = token ? token : 'xxxx';
   return async dispatch => {
      try {
         await axios.post('http://9.199.45.76:8080/bas/branch/_create', bodyObject, { headers: getHeaders(token) })
         .then((response) => {
            return onSuccess(response);
         })         
      } catch (error) {
         return onError(error);
      }

      function onSuccess(response) {
         dispatch({ type: TYPES.ADD_BRANCH, payload: response.data.branchId });
         dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: 'Hospital branch created successfully.' }));
         dispatch(stopLoading());
         history.push('/admindashboard');
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
