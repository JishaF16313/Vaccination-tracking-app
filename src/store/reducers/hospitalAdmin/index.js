import * as actions from "../../actions/hospitalAdmin";

const initialState = {
    hospitalPatientData: [{
        id: 1,
        bookingId: 111,
        patientName: "Raj",
        aadharCard: "12123338888",
        bedType: 'SingleBed',
        bedFacility: 'oxygen',
        admissionStatus: 'new',
      
      },{
        id: 2,
        bookingId: 222,
        patientName: "Raju",
        aadharCard: "12123338888",
        bedType: 'DoubleBed',
        bedFacility: 'ventilator',
        admissionStatus: 'new',
        }
    ],
    bedUploadHistoryData: [{
        id: 1,
        uploadStatus: "Success"
      
      },{
        id: 2,
        uploadStatus: "Success"
        }
    ],
    bookedBed: 51
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
    

        default:
            return state
    }

}

export default patientReducer

