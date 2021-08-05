export const TYPES = {
   GET_HOSPITAL_LIST: 'GET_HOSPITAL_LIST',
   ADD_UPDATE: 'ADD_UPDATE',
   ADD_HOSPITAL: 'ADD_HOSPITAL'
}

export const getHospitalList = () => ({
   type: TYPES.GET_HOSPITAL_LIST
});

export const setAddOrUpdate = (value) => ({ 
   type: TYPES.ADD_UPDATE , payload: value
});

export const addHospital = (value) => ({ 
   type: TYPES.ADD_HOSPITAL , payload: value
});

