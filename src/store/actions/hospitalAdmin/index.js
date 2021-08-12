export const GET_PATIENT_BED_LIST_INIT = "GET_PATIENT_BED_LIST_INIT"
export const GET_PATIENT_BED_LIST_SUCCESS = "GET_PATIENT_BED_LIST_SUCCESS"
export const GET_PATIENT_BED_LIST_FAIL = "GET_PATIENT_BED_LIST_FAIL"
export const GET_HOSPITAL_BED_LIST_FAIL = "GET_HOSPITAL_BED_LIST_FAIL"

export const UPDATE_PATIENT_BED_DETAIL_SUCCESS = "UPDATE_PATIENT_BED_DETAIL_SUCCESS"
export const UPDATE_PATIENT_BED_DETAIL_FAIL = "UPDATE_PATIENT_BED_DETAIL_FAIL"

const hospitalPatientData = []

export const getHospitalBedListList = () => dispatch => {
    dispatch(getHospitalBedListInit())
    setTimeout(() => dispatch(getHospitalBedListSuccess(hospitalPatientData)), 500)
}

const getHospitalBedListInit = () => ({
    type: GET_PATIENT_BED_LIST_INIT
})
const getHospitalBedListSuccess = (response) => ({
    type: GET_PATIENT_BED_LIST_SUCCESS,
    payload: response
})
const getHospitalBedListFail = (response) => ({
    type: GET_PATIENT_BED_LIST_FAIL,
    payload: response
})




export const updateHospitalBedDetail = (data) => dispatch => {
    return new Promise( (resolve) => {
        setTimeout(() => {
            dispatch(updateHospitalBedDetaitSuccess(data))
            resolve(data)
        }, 500)
    })
}

const updateHospitalBedDetaitSuccess = (response) => ({
    type: UPDATE_PATIENT_BED_DETAIL_SUCCESS,
    payload: response
})
const updateHospitalBedDetailFail = (response) => ({
    type: UPDATE_PATIENT_BED_DETAIL_FAIL,
    payload: response
})
