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
    ]
}

const patientReducer = ( state= initialState, {type, payload}) => {
    switch(type)
    {
        case actions.GET_PATIENT_BED_LIST_INIT:
            return {...state, hospitalBedData: [], loading: true}

        case actions.GET_PATIENT_BED_LIST_SUCCESS:
            return {...state, hospitalBedData: payload, loading: false}

        case actions.GET_HOSPITAL_BED_LIST_FAIL:
            return {...state, error: payload, loading: false}

        case actions.UPDATE_PATIENT_BED_DETAIL_SUCCESS:{
            let updatedList = [...state.hospitalBedData]
            const updateIndex = updatedList.findIndex( detail => detail.id == payload.id)
            updatedList[updateIndex] = {...payload}
            return {...state, hospitalBedData: updatedList}
        }

        default:
            console.log("BBBBBBBBBB",state)
            return state
    }

}

export default patientReducer

