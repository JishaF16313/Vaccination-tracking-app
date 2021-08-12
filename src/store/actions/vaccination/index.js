import * as API from "../../../lib/api"
import { setAlert } from '../alert/index';
import * as API_HOST from '../../../env-config';

// Vaccination List
export const GET_VACCINATION_LIST_INIT = "GET_VACCINATION_LIST_INIT"
export const GET_VACCINATION_LIST_SUCCESS = "GET_VACCINATION_LIST_SUCCESS"
export const GET_VACCINATION_LIST_FAIL = "GET_VACCINATION_LIST_FAIL"

export const getVaccinationList = () => dispatch => {
    dispatch(getVaccinationListInit())
    setTimeout(() => dispatch(getVaccinationListSuccess(vaccinationData)), 500)
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

export const updateVaccinationDetail = (data) => dispatch => {
    return new Promise( (resolve) => {
        setTimeout(() => {
            dispatch(updateVaccinationDetaitSuccess(data))
            resolve(data)
        }, 500)
    })
}
const updateVaccinationDetaitSuccess = (response) => ({
    type: UPDATE_VACCINATION_DETAIL_SUCCESS,
    payload: response
})
const updateVaccinationDetailFail = (response) => ({
    type: UPDATE_VACCINATION_DETAIL_FAIL,
    payload: response
})


// Vaccination Delete
export const DELETE_VACCINATION_APPOINTMENT = "DELETE_VACCINATION_APPOINTMENT"

export const deleteVaccinationAppointment = (data) => dispatch =>{
    return new Promise( (resolve) => {
        setTimeout(() => {
            dispatch(deleteVaccinationAppointmentSuccess(data))
            resolve(data)
        }, 500)
    })
}
const deleteVaccinationAppointmentSuccess = response => ({
    type: DELETE_VACCINATION_APPOINTMENT,
    payload: response
})


// Vaccination Data Upload
export const uploadVaccinationData = (reqBody, token) => async(dispatch) => {
    try{
        const response = await API.API_POST_SERVICE(`${API_HOST.VACCINATION_SERVICE}uploadVaccineAvailablity`, reqBody, {headers: {"X-Token-ID" : token}})
        dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: 'Vaccination bulk upload successful.' }));
        return response
    }
    catch (error){
        dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
        console.log(error);
    }
}


// Vaccination List
export const GET_VACCINATION_UPLOAD_HISTORY_INIT = "GET_VACCINATION_UPLOAD_HISTORY_INIT"
export const GET_VACCINATION_UPLOAD_HISTORY_SUCCESS = "GET_VACCINATION_UPLOAD_HISTORY_SUCCESS"
export const GET_VACCINATION_UPLOAD_HISTORY_FAIL = "GET_VACCINATION_UPLOAD_HISTORY_FAIL"

export const getVaccinationUploadHistory = () => dispatch => {
    dispatch(getVaccinationUploadHistoryInit())
    setTimeout(() => dispatch(getVaccinationUploadHistorySuccess(vaccinationUploadHistory)), 500)
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

const vaccinationData = [{
    id: 123,
    name: "Name1",
    address: "Banglore",
    dose1: {
        status: "pending",
        date: "",
        vaccine: ""        
    },
    dose2: {
        status: "pending",
        date: "",
        vaccine: ""},
},{
    id: 456,
    name: "Name2",
    address: "Delhi",
    dose1: {
        status: "done",
        date: "",
        vaccine: "covishield"},
    dose2: {
        status: "pending",
        date: "",
        vaccine: ""},
},{
    id: 789,
    name: "Name2",
    address: "Delhi",
    dose1: {
        status: "done",
        date: "",
        vaccine: "covishield"},
    dose2: {
        status: "done",
        date: "",
        vaccine: "covishield"},
}]

const vaccinationUploadHistory = [{
    id: "123",
    status: "Success",
},
{
    id: "456",
    status: "Success"
}]