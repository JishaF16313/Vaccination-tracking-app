import * as actions from '../../actions/hospitals/index';
import { removeObjectFromArray } from '../../../utility/commonFunctions';

const initialState = {
   hospitalList: null,
   addOrUpdate: 'add',
   addedHospitalId: null,
   editedHospitalData: null,
   deletingHospitalId: null,
   openDeleteConfirmationDialog: false,
   hospitalDdlOptions: null
};

const Reducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case actions.TYPES.GET_HOSPITAL_LIST:
         return { ...state, hospitalList: payload };
      case actions.TYPES.ADD_UPDATE:
         return { ...state, addOrUpdate: payload };
      case actions.TYPES.ADD_HOSPITAL:
         return { ...state, addedHospitalId: payload };
      case actions.TYPES.SET_HOSPITAL_DDL_OPTIONS:
         return { ...state, hospitalDdlOptions: payload };
      case actions.TYPES.SET_EDITED_HOSPITAL_DATA:
         return { ...state, editedHospitalData: payload };
      case actions.TYPES.UPDATE_HOSPITAL:
         let updatedList = [...state.hospitalList];
         const updateIndex = updatedList.findIndex(detail => detail.id === state.editedHospitalData.id);
         updatedList[updateIndex] = { ...payload };
         return { ...state, hospitalList: updatedList };
      case actions.TYPES.SET_DELETING_HOSPITAL_ID:
         return { ...state, deletingHospitalId: payload };
      case actions.TYPES.OPEN_HOSPITAL_DELETE_DIALOG:
         return { ...state, openDeleteConfirmationDialog: payload };
      case actions.TYPES.DELETE_SELECTED_HOSPITAL:
         let updatedArr = removeObjectFromArray(state.hospitalList, 'id', state.deletingHospitalId);
         return { ...state, hospitalList: updatedArr };
      default:
         return state;
   }
}

export default Reducer;
