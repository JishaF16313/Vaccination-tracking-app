export const TYPES = {
    SETPATIENTDETAILS: 'SETPATIENTDETAILS'
}

export const SetPatientDetails = (value) => ({
    type: TYPES.SETPATIENTDETAILS , payload: value
 });