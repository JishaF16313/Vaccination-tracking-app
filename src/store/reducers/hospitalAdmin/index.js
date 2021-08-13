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
        case actions.TYPES.ADD_BED :
            {

            return {...state}
        }

        default:
            return state
    }

}

export default patientReducer

