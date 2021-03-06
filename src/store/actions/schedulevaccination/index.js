import axios from 'axios';
import { setAlert } from '../alert/index';
import { stopLoading } from '../loader/index';
import * as API_HOST from '../../../env-config';
import { parseJwt, getHeaders } from '../../../utility/commonFunctions';

export const TYPES = {
    GET_AVAILABLE_VACCINE_BY_DATE: 'GET_AVAILABLE_VACCINE_BY_DATE',
    SCHEDULE_VACCINATION: 'SCHEDULE_VACCINATION',
    OPEN_SCHEDULE_VACCINATION_SUCCESS_POPUP: 'OPEN_SCHEDULE_VACCINATION_SUCCESS_POPUP'
}

export function getAvailableVaccineByDate(selectedDate, token) {
    let data;
    if (token) {
        data = parseJwt(token);
    }
    return async dispatch => {
        try {
            await axios.get(`${API_HOST.VACCINATION_SERVICE}${data.cityName}/${selectedDate}/_getVaccineAvailableInformation`, { headers: getHeaders(token) })
                .then((response) => {
                  //  console.log("VVVVVVVVVVVVVVVVVVVVVVVVV",response);
                    let modifiedData = [];
                    for (let i = 0; i < response.data.Hospital.length; i++) {
                        let item = response.data.Hospital[i];
                            console.log("VVVVVVVVVVVVVVVVVVVVVVVVV",item);
                        let obj = {
                            "id": Number(i) + 1,
                            "branch-id": item["branch-id"],
                            "hospitalName": item["hospitalName"],
                            "branch-name": item["branch-name"],
                            "vaccine-type": item["vaccine-type"],
                            "no-of-slot-available": item["no-of-slot-available"],
                            "timeSlotAvailable": item["slot-info"],

                            // "timeSlotAvailable":[{"Slot-Start-Time":"02:12:54","Slot-End-Time":"01:12:56"},
                            //                      {"Slot-Start-Time":"03:12:54","Slot-End-Time":"04:12:56"}
                            //                     ]
                        }
                        modifiedData.push(obj);
                    }
                    return onSuccess(modifiedData);
                })
        } catch (error) {
            return onError(error);
        }
        function onSuccess(response) {
            dispatch({ type: TYPES.GET_AVAILABLE_VACCINE_BY_DATE, payload: response });
            dispatch(stopLoading());
        }
        function onError(error) {
            dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
            dispatch(stopLoading());
        }
    }
};

export function scheduleVaccination(bodyObject, token, selectedDate) {
console.log("testtttt");
console.log(bodyObject,"bodyObject");
console.log(selectedDate,"selectedDate");
    return async dispatch => {
        console.log("fff");
        try {
            await axios.post(`${API_HOST.VACCINATION_SERVICE}bookVaccine`, bodyObject, { headers: getHeaders(token) })
                .then((response) => {
                    console.log("sss");
                    if(response.data.message){
                        dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: response.data.message }));
                        dispatch(stopLoading());
                    }else{
                        console.log("zzz",response);
                        return onSuccess(response, selectedDate);
                    }                    
                })
        } catch (error) {
           return onError(error);
        }

        function onSuccess(response, selectedDate) {
            console.log("ggggg",response.data);
            dispatch({ type: TYPES.SCHEDULE_VACCINATION, payload: response.data });
            dispatch(setVaccinationSuccessModalState(true));
            dispatch(stopLoading());
            dispatch(getAvailableVaccineByDate(selectedDate, token));
        }
        function onError(error) {
            dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
            dispatch(stopLoading());
        }
    }
}

export const setVaccinationSuccessModalState = (value) => ({
    type: TYPES.OPEN_SCHEDULE_VACCINATION_SUCCESS_POPUP, payload: value
});

