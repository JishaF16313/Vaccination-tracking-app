import * as API_HOST from "../../../env-config"
import * as API from "../../../lib/api"
import {startLoading, stopLoading} from "../loader"
import {setAlert} from "../alert"

export const getReportPDF = (reqBody) => async(dispatch, getState) =>
{
    const {token} = getState().auth
    dispatch(startLoading("Please wait"))
    try{
        const response = await API.API_POST_SERVICE(`${API_HOST.REPORT_SERVICE}export/pdf`, reqBody, {headers: {"X-Token-ID" : token}})
        console.log(response);
        dispatch(stopLoading())
    }
    catch(error)
    {
        dispatch(stopLoading())
        dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: "Unable to download report." }));
    }
}