import axios from 'axios';
import { setAlert } from '../alert/index';
import { stopLoading } from '../loader/index';
import * as API_HOST from '../../../env-config';
import { parseJwt, getHeaders } from '../../../utility/commonFunctions';

export const TYPES = {
    GET_AVAILABLE_VACCINE_BY_DATE: 'GET_AVAILABLE_VACCINE_BY_DATE',
    SCHEDULE_VACCINATION: 'SCHEDULE_VACCINATION'
}

export function getAvailableVaccineByDate(selectedDate, token) {
    const data = parseJwt(token);
    return async dispatch => {
        try {
            await axios.get(`${API_HOST.VACCINATION_SERVICE}${data.cityName}/${selectedDate}/_getVaccineAvailableInformation`, { headers: getHeaders(token) })
                .then((response) => {
                    let data = response.data.Hospital.map((item) => {
                        return {
                            "id": item["branch-id"],
                            ...item
                        }
                    })
                    return onSuccess(data);
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

export function scheduleVaccination(bodyObject, token) {
    return async dispatch => {
        try {
            await axios.post(`${API_HOST.VACCINATION_SERVICE}/bookVaccine`, bodyObject, { headers: getHeaders(token) })
                .then((response) => {
                    return onSuccess(response);
                })
        } catch (error) {
            return onError(error);
        }

        function onSuccess(response) {
            dispatch({ type: TYPES.SCHEDULE_VACCINATION, payload: response.data });
            dispatch(setAlert({ alertType: 'success', alertTitle: 'Success', alertMessage: 'Vaccination scheduled successfully.' }));
            dispatch(stopLoading());
        }
        function onError(error) {
            dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
            dispatch(stopLoading());
        }
    }
}

