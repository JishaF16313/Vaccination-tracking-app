import {
    GET_VACCINATION_LIST_INIT,
    GET_VACCINATION_LIST_SUCCESS,
    GET_VACCINATION_LIST_FAIL,
    UPDATE_VACCINATION_DETAIL_SUCCESS,
    DELETE_VACCINATION_APPOINTMENT,
    GET_VACCINATION_UPLOAD_HISTORY_INIT,
    GET_VACCINATION_UPLOAD_HISTORY_SUCCESS,
    GET_VACCINATION_UPLOAD_HISTORY_FAIL,
    SET_VACCINATION_SLOT_COUNT,
    SET_V_TIME_S_COUNT

} from "../../actions/vaccination"
import { removeObjectFromArray } from '../../../utility/commonFunctions';

const initialState = {
    vaccinationList: [],
    vaccinationUploadHistory: [],
    loading: false,
    error: null,
    vaccineTimeSlotCount:0
}

const vaccinationReducer = ( state= initialState, {type, payload}) => {
    switch(type)
    {
        case GET_VACCINATION_LIST_INIT:
            return {...state, vaccinationList: [], loading: true}

        case GET_VACCINATION_LIST_SUCCESS:
            return {...state, vaccinationList: payload.Patients, loading: false}

        case GET_VACCINATION_LIST_FAIL:
            return {...state, error: payload, loading: false}

        case UPDATE_VACCINATION_DETAIL_SUCCESS:{
            let updatedList = [...state.vaccinationList]
            const updatedAppointment = payload.Patients
            const updateIndex = updatedList.findIndex( detail => detail["vaccine-booking-id"] === updatedAppointment["vaccine-booking-id"])
            if(updateIndex >= 0)
                updatedList[updateIndex] = {...updatedAppointment}
            return {...state, vaccinationList: updatedList}
        }

        case DELETE_VACCINATION_APPOINTMENT: 
            return {...state, vaccinationList: removeObjectFromArray(state.vaccinationList, "vaccine-booking-id", payload)}


        case GET_VACCINATION_UPLOAD_HISTORY_INIT:
                return {...state, vaccinationUploadHistory: [], loading: true}
    
        case GET_VACCINATION_UPLOAD_HISTORY_SUCCESS:
                return {...state, vaccinationUploadHistory: payload.Uploads, loading: false}
    
        case GET_VACCINATION_UPLOAD_HISTORY_FAIL:
                return {...state, error: payload, loading: false}
        case SET_VACCINATION_SLOT_COUNT:
            return {...state, vaccineSlotCount:payload}
        case SET_V_TIME_S_COUNT:

                return {...state, vaccineTimeSlotCount:payload}

        default:
            return state
    }

}

export default vaccinationReducer

