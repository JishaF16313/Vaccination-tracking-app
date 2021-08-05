import * as actions from '../../actions/hospitals/index';

const initialState = {
   hospitalList: [{ id: 1, name: 'Hospital 1', address: 'Address 1', zip: '111111', city: 'City 1', state: 'State 1'},
                  { id: 2, name: 'Hospital 2', address: 'Address 2', zip: '222222', city: 'City 2', state: 'State 2'}],
   addOrUpdate: 'add'
};

const Reducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case actions.TYPES.GET_HOSPITAL_LIST:
         return state;
      case actions.TYPES.ADD_UPDATE:
         return { ...state, addOrUpdate: payload };
      case actions.TYPES.ADD_HOSPITAL:         
         return { ...state, hospitalList: [...state.hospitalList, payload] };
      default:
         return state;
   }
}

export default Reducer;
