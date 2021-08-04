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