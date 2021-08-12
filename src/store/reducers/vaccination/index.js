import {
    GET_VACCINATION_LIST_INIT,
    GET_VACCINATION_LIST_SUCCESS,
    GET_VACCINATION_LIST_FAIL,
    UPDATE_VACCINATION_DETAIL_SUCCESS,
    UPDATE_VACCINATION_DETAIL_FAIL,
    DELETE_VACCINATION_APPOINTMENT,
    GET_VACCINATION_UPLOAD_HISTORY_INIT,
    GET_VACCINATION_UPLOAD_HISTORY_SUCCESS,
    GET_VACCINATION_UPLOAD_HISTORY_FAIL
} from "../../actions/vaccination"
import { removeObjectFromArray } from '../../../utility/commonFunctions';

const initialState = {
    vaccinationList: [],
    vaccinationUploadHistory: [],
    loading: false,
    error: null
}

const vaccinationReducer = ( state= initialState, {type, payload}) => {
    switch(type)
    {
        case GET_VACCINATION_LIST_INIT:
            return {...state, vaccinationList: [], loading: true}

        case GET_VACCINATION_LIST_SUCCESS:
            return {...state, vaccinationList: payload, loading: false}

        case GET_VACCINATION_LIST_FAIL:
            return {...state, error: payload, loading: false}

        case UPDATE_VACCINATION_DETAIL_SUCCESS:{
            let updatedList = [...state.vaccinationList]
            const updateIndex = updatedList.findIndex( detail => detail.id === payload.id)
            updatedList[updateIndex] = {...payload}
            return {...state, vaccinationList: updatedList}
        }

        case DELETE_VACCINATION_APPOINTMENT: 
            return {...state, vaccinationList: removeObjectFromArray(state.vaccinationList, "id", payload.id)}


        case GET_VACCINATION_UPLOAD_HISTORY_INIT:
                return {...state, vaccinationUploadHistory: [], loading: true}
    
        case GET_VACCINATION_UPLOAD_HISTORY_SUCCESS:
                return {...state, vaccinationUploadHistory: payload, loading: false}
    
        case GET_VACCINATION_UPLOAD_HISTORY_FAIL:
                return {...state, error: payload, loading: false}


        default:
            return state
    }

}

export default vaccinationReducer

