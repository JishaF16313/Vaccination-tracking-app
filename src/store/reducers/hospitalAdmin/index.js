import * as actions from "../../actions/hospitalAdmin";

const initialState = {
    hospitalPatientData: [
       
    ],
    bedUploadHistoryData: [{
        id: 1,
        uploadStatus: "Success"
      
      },{
        id: 2,
        uploadStatus: "Success"
        }
    ],
    bookedBed: 0
}

const patientReducer = ( state= initialState, {type, payload}) => {

    switch(type)
    {
        case actions.TYPES.ADD_BED :
            return {...state, }
        case actions.TYPES.POPULATE_PATIENT_LIST:
            return { ...state, hospitalPatientData: payload };
        case actions.TYPES.POPULATE_UPLOAD_HISTORY:
            return { ...state, bedUploadHistoryData: payload };
        case actions.TYPES.TOTAL_PATIENT_COUNT:
            return { ...state, bookedBed: payload };
        case actions.TYPES.DELETE_PATIENT_BED:
            return { ...state,hospitalPatientData:state.hospitalPatientData.filter((element)=>{
                return !payload.includes(element.bookingId);
            })};
        default:
            return state
    }

}

export default patientReducer

