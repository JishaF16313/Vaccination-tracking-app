import * as API_HOST from "../../../env-config"
import * as API from "../../../lib/api"
import {startLoading, stopLoading} from "../loader"
import {setAlert} from "../alert"
import {triggerDownloadFromData} from "../../../utility/commonFunctions"

export const getReport = (reqBody) => async(dispatch, getState) =>
{
    const {token} = getState().auth
    dispatch(startLoading("Please wait"))
    try{
        const response = await API.API_POST_SERVICE(`${API_HOST.REPORT_SERVICE}export/pdf`,reqBody, {headers: {"X-Token-ID" : token}, responseType: 'blob'})
        triggerDownloadFromData(response, `report-${new Date(Date.now()).toLocaleDateString()}.pdf`)
        dispatch(stopLoading())
    }
    catch(error)
    {
        dispatch(stopLoading())
        dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: "Unable to download report." }));
    }
}

export const getReportAll = () => async(dispatch) =>
{
    dispatch(startLoading("Please wait"))
    try{
        const response = await API.API_GET_SERVICE(`${API_HOST.REPORT_SERVICE}export/_all/pdf`, {responseType: 'blob'})
        triggerDownloadFromData(response, `reports-all-${new Date(Date.now()).toLocaleDateString()}.pdf`)
        dispatch(stopLoading())
    }
    catch(error)
    {
        dispatch(stopLoading())
        dispatch(setAlert({ alertType: 'error', alertTitle: 'Error', alertMessage: "Unable to download report." }));
    }
}

