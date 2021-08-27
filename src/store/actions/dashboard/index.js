import axios from 'axios';
import { setAlert } from '../alert/index';
import { stopLoading } from '../loader/index';
import * as API_HOST from '../../../env-config';

export const TYPES = {
    GET_ALL_REPORT: 'GET_ALL_REPORT'
}

export const getAllReport = () => {
    return async dispatch => {
        try {
            await axios.get(`${API_HOST.REPORT_SERVICE}_all`)
                .then((response) => {
                    return onSuccess(response);
                });
        } catch (error) {
            return onError(error);
        }
        function onSuccess(response) {
            dispatch({ type: TYPES.GET_ALL_REPORT, payload: response.data });
            dispatch(stopLoading());
        }
        function onError(error) {
            dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: error.message }));
            dispatch(stopLoading());
        }
    }
}

export const getHeaders = (token) => {
    const headers = {
        'Content-Type': 'application/json',
        'X-Token-ID': token ? token : ''
    }
    return headers;
}
