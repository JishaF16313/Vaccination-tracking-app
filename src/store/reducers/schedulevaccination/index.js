import * as actions from '../../actions/schedulevaccination/index';

const initialState = {
    availableVaccineList: [
        {"id":"1", "branch-id" : "branch1", "hospitalName" : "Hospital 1" , "branch-name" : "Branch 1", "vaccine-type" : "Covaxine", "no-of-slot-available" : "50" },
        {"id":"2", "branch-id" : "branch2", "hospitalName" : "Hospital 2" , "branch-name" : "Branch 2", "vaccine-type" : "Covishield", "no-of-slot-available" : "20" },
    ],
    scheduledVaccinationData : null
};

const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        // case actions.TYPES.GET_AVAILABLE_VACCINE_BY_DATE:
        //     return { ...state, availableVaccineList: payload };
           case actions.TYPES.SCHEDULE_VACCINATION:
               return { ...state, scheduledVaccinationData: payload };        
        default:
            return state;
    }
}

export default Reducer;
