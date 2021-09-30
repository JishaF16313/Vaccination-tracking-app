import * as actions from "../../actions/patientList";
import { removeObjectFromArray } from "../../../utility/commonFunctions";

const initialState = {
  getAllPatients: [
    {
      id: null,
      patientId: null,
      patientName: null,
      email: null,
      contactno: null,
      aadharCard: null,
    },
  ],
  getSinglePatientByID: {
    patientId: null,
    patientFirstName: null,
    patientLName: null,
    dateOfBirth: null,
    patientContactNumber: null,
    patientEmailId: null,
    patientIdentificationDetailsResp: null,
    patientCity: null,
    patientState: null,
    patientPan: null,
    patientAadhar: null,
  },
  addedpatientUserId: null,
  editedpatientUserData: null,
  deletingPatientUserId: null,
  openDeleteConfirmationDialog: false,
  hospitalAvailableBedList: null,
};

const patientListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.TYPES.POPULATE_PATIENTS:
      return { ...state, getAllPatients: payload };

    case actions.TYPES.GET_PATIENT_BY_ID:
     if(payload){
      return { ...state, getSinglePatientByID: payload };
     }
    

    case actions.TYPES.SET_EDITED_PATIENT_USER_DATA:
      return { ...state, editedpatientUserData: payload };
      case actions.TYPES.SET_HOSPITAL_AVAIALBLE_BED_LIST:
        return { ...state, hospitalAvailableBedList: payload };
    case actions.TYPES.SET_DELETING_PATIENT_USER_ID:
      return { ...state, deletingPatientUserId: payload };
    case actions.TYPES.OPEN_PATIENT_USER_DELETE_DIALOG:
      return { ...state, openDeleteConfirmationDialog: payload };
    case actions.TYPES.DELETE_SELECTED_PATIENT_USER:
      let updatedArr = removeObjectFromArray(
        state.getAllPatients,
        "patientId",
        payload
      );
      return { ...state, getAllPatients: updatedArr };

    default:
      return state;
  }
};

export default patientListReducer;
