export const TYPES = {
    GET_USER_LIST: 'GET_USER_LIST',
    ADD_UPDATE: 'ADD_UPDATE',
    ADD_USER: 'ADD_USER'
 }
 
 export const getUserList = () => ({
    type: TYPES.GET_USER_LIST
 });
 
 export const setAddOrUpdate = (value) => ({ 
    type: TYPES.ADD_UPDATE , payload: value
 });
 
 export const addUser = (value) => ({ 
    type: TYPES.ADD_USER , payload: value
 });
 
 