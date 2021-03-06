import * as API from "../../../lib/api"
import { setAlert } from '../alert/index';
import {startLoading, stopLoading} from "../loader"
import * as API_HOST from '../../../env-config';

// Vaccination List
export const GET_VACCINATION_LIST_INIT = "GET_VACCINATION_LIST_INIT"
export const GET_VACCINATION_LIST_SUCCESS = "GET_VACCINATION_LIST_SUCCESS"
export const GET_VACCINATION_LIST_FAIL = "GET_VACCINATION_LIST_FAIL"
export const SET_VACCINATION_SLOT_COUNT = "SET_VACCINATION_SLOT_COUNT"
export const SET_V_TIME_S_COUNT="SET_V_TIME_S_COUNT"
//Store the slotCount

export const setSlotTimeCount = (response) => ({
  type: SET_V_TIME_S_COUNT,
  payload: response
})


export const setSlotCount = (response) => ({

  type: SET_VACCINATION_SLOT_COUNT,
  payload: response
})

export const getVaccinationList = () => async(dispatch, getState) => {
  dispatch(getVaccinationListInit())
  const token = getState().auth.token
    try {
      const response = await API.API_GET_SERVICE(`${API_HOST.VACCINATION_SERVICE}getVaccineSchdeuledInformationForDay`,{headers: {"X-Token-ID" : token}})
      dispatch(getVaccinationListSuccess(response))
    }
    catch(error)
    {
      dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: "Unable to get the appointments" }));
      dispatch(getVaccinationListFail(error.message))
    }
}

const getVaccinationListInit = () => ({
    type: GET_VACCINATION_LIST_INIT
})
const getVaccinationListSuccess = (response) => ({
    type: GET_VACCINATION_LIST_SUCCESS,
    payload: response
})
const getVaccinationListFail = (response) => ({
    type: GET_VACCINATION_LIST_FAIL,
    payload: response
})

// Vaccination Update
export const UPDATE_VACCINATION_DETAIL_SUCCESS = "UPDATE_VACCINATION_DETAIL_SUCCESS"
export const UPDATE_VACCINATION_DETAIL_FAIL = "UPDATE_VACCINATION_DETAIL_FAIL"

export const updateVaccinationDetail = (bookingId) => async(dispatch, getState) => {
  const token = getState().auth.token
  dispatch(startLoading("Updating vaccination status"))
    try{
      const response = await API.API_PUT_SERVICE(`${API_HOST.VACCINATION_SERVICE}/vaccine/${bookingId}/updateVaccineStatus`,null,{headers: {"X-Token-ID" : token}})
      dispatch(updateVaccinationDetaitSuccess(response))
      dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: 'Vaccination status update successful.' }));
      dispatch(stopLoading())
    }
    catch (error)
    {
      dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: "Vaccination status update failed" }));
      dispatch(stopLoading())
    }
}
const updateVaccinationDetaitSuccess = (response) => ({
    type: UPDATE_VACCINATION_DETAIL_SUCCESS,
    payload: response
})


// Vaccination Delete
export const DELETE_VACCINATION_APPOINTMENT = "DELETE_VACCINATION_APPOINTMENT"

export const deleteVaccinationAppointment = (bookingId) => async(dispatch,getStore) =>{
    const token = getStore().auth.token
    dispatch(startLoading("Deleting vaccination appointment"))
    try{
      const response = await API.API_DELETE_SERVICE(`${API_HOST.VACCINATION_SERVICE}${bookingId}/_deleteVaccinationBookingId`,{headers: {"X-Token-ID" : token}})
      dispatch(deleteVaccinationAppointmentSuccess(bookingId))
      dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: 'Vaccination deleted successfully.' }));
      dispatch(stopLoading())
    }
    catch (error)
    {
      dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: "Vaccination delete failed" }));
      dispatch(stopLoading())
    }
}
const deleteVaccinationAppointmentSuccess = response => ({
    type: DELETE_VACCINATION_APPOINTMENT,
    payload: response
})


// Vaccination Data Upload
export const uploadVaccinationData = (reqBody) => async(dispatch, getState) => {
  const token = getState().auth.token

  console.log("FROM ACTION TOP",JSON.stringify(reqBody));
  dispatch(startLoading("Uploading vaccination data"))
    try{
        const response = await API.API_POST_SERVICE(`${API_HOST.VACCINATION_SERVICE}uploadVaccinAvailablity`, reqBody, {headers: {"X-Token-ID" : token}})
        dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: 'Vaccination bulk upload successful.' }));
        dispatch(stopLoading())
    }
    catch (error){
        dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: "Unable to upload vaccination data." }));
        dispatch(stopLoading())
    }
}


// Vaccination Upload History
export const GET_VACCINATION_UPLOAD_HISTORY_INIT = "GET_VACCINATION_UPLOAD_HISTORY_INIT"
export const GET_VACCINATION_UPLOAD_HISTORY_SUCCESS = "GET_VACCINATION_UPLOAD_HISTORY_SUCCESS"
export const GET_VACCINATION_UPLOAD_HISTORY_FAIL = "GET_VACCINATION_UPLOAD_HISTORY_FAIL"

export const getVaccinationUploadHistory = () => async(dispatch, getState) => {
  dispatch(getVaccinationUploadHistoryInit())
  const token = getState().auth.token
  try{
    const response = await API.API_GET_SERVICE(`${API_HOST.VACCINATION_SERVICE}vaccine/getUploadVaccineStatus`,{headers: {"X-Token-ID" : token}})
    dispatch(getVaccinationUploadHistorySuccess(response))
  }
  catch (error)
  {
    dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: "Unable to get the upload history" }));
    dispatch(getVaccinationUploadHistoryFail(error.message))
  }
}

const getVaccinationUploadHistoryInit = () => ({
    type: GET_VACCINATION_UPLOAD_HISTORY_INIT
})
const getVaccinationUploadHistorySuccess = (response) => ({
    type: GET_VACCINATION_UPLOAD_HISTORY_SUCCESS,
    payload: response
})
const getVaccinationUploadHistoryFail = (response) => ({
    type: GET_VACCINATION_UPLOAD_HISTORY_FAIL,
    payload: response
})

