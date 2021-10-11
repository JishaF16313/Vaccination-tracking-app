import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import Table from "../table/index";
import { startLoading } from "../../store/actions/loader/index";


import { useSelector, useDispatch } from "react-redux";
import {
  getPatientListDetails,
  updatePatientsUser,
  setEditedPatientUserData,
  setAddOrUpdate,
  setDeletingPatientUserId,
  setOpenPatientUserDeleteDialog,
  deleteSelectedPatientUser,
  getPatientById,
  PatientBedBookingDetails,
} from "../../store/actions/patientList/index";
import { Button } from "@material-ui/core";
import {
  addPatientText,
  patientList,
  deleteConfirmationDialogTitleText,
  deleteHospitalPatientMessageText,
  deleteAgreeButtonText,
  deleteDisagreeButtonText,
  loaderText,
} from "../../utility/commonTexts";
import history from "../../routes/history";
import ConfirmationDialogue from "../dialog/confirmation";
import PatientCreateForm from "../patientCreate/index";

import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles({
  gridroot: {
    width: "100%",
  },
  title: {
    margin: "10px 0px",
  },
  loader: {
    width: "100%",
    textAlign: "center",
    padding: "10px",
  },
  addUserButton: {
    float: "right",
    margin: "20px",
  },
  tableContainer: {
    margin: "10px 0px",
    padding: "2px",
  },
  dialogCustomizedWidth: {
    minWidth: "60vh",
  },
});

function PatientList(props) {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setEditOpen] = React.useState(false);
  const [sdeltid, setSDeltId] = React.useState("");
  const [loading, SetLoading] = useState(true);

  const classes = useStyles();
  const dispatch = useDispatch();
  const storeData = useSelector((store) => {
    return {
      pat: store.patientListReducer,
      loggedInUserData: store.auth,
      data: store.patientdetails,
    };
  });
 

  const allPatients = storeData.pat.getAllPatients;
 
  const getPatientByIDDetails = storeData.pat.getSinglePatientByID;
  const getPatientByIDForBedBook = storeData.pat.getSinglePatientByID;
  const [bookBtnClick, setBookBtnClick] = useState(false);
  /*******For Bed Booking start********/
  // This useEffect is for retriving patient data from Patient bed booking
  useEffect(() => {
    if (!props.actions && bookBtnClick) {
      getPatientForBedBook();
    }
  }, [getPatientByIDForBedBook.patientId]);

  useEffect(() => {
    if (bookBtnClick) {
      getPatientForBedBook();
    }
  }, [bookBtnClick]);

  const getPatientForBedBook = () => {
    const identifationD =
      getPatientByIDForBedBook.patientIdentificationDetailsResp;
    const locations = getPatientByIDForBedBook.patientLocationDetailsResp;
    if (getPatientByIDForBedBook.patientId) {
      var patientDetailsForBedBooking = {};

      patientDetailsForBedBooking.patient_Id =
        getPatientByIDForBedBook.patientId;
      patientDetailsForBedBooking.patient_first_name =
        getPatientByIDForBedBook.patientFirstName;
      patientDetailsForBedBooking.patient_last_name =
        getPatientByIDForBedBook.patientLastName;
      patientDetailsForBedBooking.patient_contact_number =
        getPatientByIDForBedBook.patientContactNumber;
      patientDetailsForBedBooking.patient_email_id =
        getPatientByIDForBedBook.patientEmailId;
      patientDetailsForBedBooking.patient_LocationDetails = {};
      patientDetailsForBedBooking.patient_LocationDetails.city_name =
        locations.cityName;
      patientDetailsForBedBooking.patient_LocationDetails.pin_number =
        locations.pinNumber;
      patientDetailsForBedBooking.patient_IdentificationDetail = {};
      patientDetailsForBedBooking.patient_IdentificationDetail.pan_number =
        identifationD.panNumber;
      patientDetailsForBedBooking.patient_IdentificationDetail.aadhar_card =
        identifationD.aadharNumber;
      dispatch(PatientBedBookingDetails(patientDetailsForBedBooking, token));
    }
  };
 
  /*******For Bed Booking end********/

  const controldisplay = (values) => {
  
    setPatienLength(values);
  };
  let token = storeData.loggedInUserData.token;
  let zip = storeData.loggedInUserData.pinCode;
  const [patientLength, setPatienLength] = useState(allPatients.length);

 


  useEffect(() => {
    dispatch(getPatientListDetails(zip, token));
 

  }, [token == null]);

  let currentLength = 0;
  useEffect(() => {
    currentLength = allPatients.length;
    dispatch(getPatientListDetails(zip, token));
  }, [patientLength]);

  const columnMap = [
    {
      field: "id",
      title: "ID",
    },
    {
      field: "patientId",
      title: "Patient Id",
    },
    {
      field: "patientName",
      title: "Patient Name",
    },
    {
      field: "email",
      title: "Email",
    },
    {
      field: "contactno",
      title: "Contact no:",
    },
    {
      field: "aadharCard",
      title: "Aadhar Card",
    },
  ];

  const handlePatientEdit = (row) => {
    dispatch(getPatientById(row.patientId, token));
    setEditOpen(true);
  };

  const handlePatientDelete = (row) => {
    setSDeltId(row.patientId);
    dispatch(setOpenPatientUserDeleteDialog(true));
  };

  const closeDialog = () => {
    dispatch(setOpenPatientUserDeleteDialog(false));
  };

  const onDeleteConfirm = () => {
    dispatch(setDeletingPatientUserId(sdeltid));
    dispatch(deleteSelectedPatientUser(sdeltid));
    dispatch(setOpenPatientUserDeleteDialog(false));
  };

  const handleAddPatientBtnClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };

  let rawS = storeData.pat.patientDetalsFromRaw;

  const handleBookABedBtnClick = () => {
    let patientIDForBooking = JSON.parse(
      localStorage.getItem("PatientDetails")
    ).patientId;
    setBookBtnClick(patientIDForBooking);

    dispatch(getPatientById(patientIDForBooking, token));
    const hdata = storeData.pat.hospitalAvailableBedList;
  };
  let btnPactient = "";
  let tableForList = "";
  if (props.actions && props.actions != "notneeded") {
    tableForList = (
      <Table
        columnMap={columnMap}
        rows={allPatients}
        onEdit={handlePatientEdit}
        onDelete={handlePatientDelete}
      />
    );
  } else {
    tableForList = (
      <Table
        columnMap={columnMap}
        rows={allPatients}
        rowIdField={"patientId"}
      />
    );
  }

  if (props.actions != "notneeded") {
    if (props.actions) {
      btnPactient = (
        <Button
          onClick={handleAddPatientBtnClick}
          className={classes.addUserButton}
          variant="contained"
          color="primary"
          size="medium"
          type="button"
        >
          Add Patient
        </Button>
      );
    } else {
      btnPactient = (
        <Button
          onClick={handleBookABedBtnClick}
          className={classes.addUserButton}
          variant="contained"
          color="primary"
          size="medium"
          type="button"
          disabled={rawS.patientId == null ? true : false}
        >
          Book A Bed
        </Button>
      );
    }
  }

  return (
    <div className={classes.root}>
      <h3>{patientList}</h3>

      <div className={classes.gridroot}>
        <div style={{ height: "auto", width: "100%" }}>
          <div>
            {btnPactient}
            <Dialog
              open={open}
              onClose={handleClose}
              fullWidth={true}
              maxWidth={"md"}
              classes={{ paper: classes.dialogCustomizedWidth }}
            >
              <PatientCreateForm
                actioncontrol={handleClose}
                controldisplay={controldisplay}
                editMode={false}
              />
            </Dialog>
            {getPatientByIDDetails.patientFirstName && (
              <Dialog
                fullWidth={true}
                maxWidth={"md"}
                classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
                open={openEdit}
                onClose={handleEditClose}
              >
                {getPatientByIDDetails && (
                  <PatientCreateForm
                    actioncontrol={handleEditClose}
                    controldisplay_edit={controldisplay}
                    editMode={true}
                    pDatas={Object.assign({}, getPatientByIDDetails)}
                  />
                )}
              </Dialog>
            )}
          </div>
          <div className={classes.tableContainer}>{tableForList}</div>

          <ConfirmationDialogue
            open={storeData.pat.openDeleteConfirmationDialog}
            title={deleteConfirmationDialogTitleText}
            message={deleteHospitalPatientMessageText}
            agreeButtonText={deleteAgreeButtonText}
            disagreeButtonText={deleteDisagreeButtonText}
            handleDisagree={closeDialog}
            handleAgree={onDeleteConfirm}
          />
        </div>
      </div>
    </div>
  );
}

export default PatientList;
