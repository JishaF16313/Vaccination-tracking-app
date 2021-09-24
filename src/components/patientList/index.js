import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import Table from "../table/index";


import { useSelector, useDispatch } from "react-redux";
import {
  getPatientListDetails,
  updatePatientsUser,
  setEditedPatientUserData,
  setAddOrUpdate,
  setDeletingPatientUserId,
  setOpenPatientUserDeleteDialog,
  deleteSelectedPatientUser,
  getPatientById
} from "../../store/actions/patientList/index";
import { Button } from "@material-ui/core";
import {
  addPatientText,
  patientList,
  deleteConfirmationDialogTitleText,
  deleteHospitalPatientMessageText,
  deleteAgreeButtonText,
  deleteDisagreeButtonText,
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
    padding: "2px"
},
dialogCustomizedWidth: {
  minWidth:  '60vh',
}
});

function PatientList() {
  // alert("refresh")
  const [open, setOpen] = React.useState(false);
  const [openEdit, setEditOpen] = React.useState(false);
  const [pdata, setPdata] = React.useState({});


  const classes = useStyles();
  const dispatch = useDispatch();
  const storeData = useSelector((store) => {
    return {
      pat: store.patientListReducer,
       loggedInUserData: store.auth,
    };
  });

const allPatients = storeData.pat.getAllPatients;
//let zip = storeData.loggedInUserData.pinCode;
//let token =  JSON.parse(localStorage.getItem("user")).token;
//let zip =  JSON.parse(localStorage.getItem("user")).pinCode;
//const token =  JSON.parse(localStorage.getItem("user")).token;
///console.log(token,"front end");
const controldisplay=(values)=>{
  setPatienLength(values)
}
let token = storeData.loggedInUserData.token;
let zip = storeData.loggedInUserData.pinCode;
const [patientLength,setPatienLength]=useState(allPatients.length);
  useEffect(() => {
// console.log("use effect.................................................................")
   dispatch(getPatientListDetails(zip,token));
  },[token==null]);

let currentLength=0;
  useEffect(() => {
    
    currentLength=allPatients.length;
       dispatch(getPatientListDetails(zip,token));
      },[patientLength]);

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
    return false;
    setEditOpen(true);
    setPdata(row);
    
    dispatch(getPatientById(row.patientId));
    // dispatch(setEditedPatientUserData(row));
    //dispatch(setAddOrUpdate("update"));
  
  };

  const handlePatientDelete = (row) => {
    return false;
    dispatch(setDeletingPatientUserId(row.id));
    dispatch(setOpenPatientUserDeleteDialog(true));
  };

  const closeDialog = () => {
    dispatch(setOpenPatientUserDeleteDialog(false));
  };

  const onDeleteConfirm = () => {
    dispatch(deleteSelectedPatientUser());
    dispatch(setOpenPatientUserDeleteDialog(false));
  };

  const handleAddPatientBtnClick = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    //alert('handle colse');
    setOpen(false);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };

  return (
    <div className={classes.root}>
      <h3>{patientList}</h3>

      <div className={classes.gridroot}>
        <div style={{height:'auto', width: "100%" }}>
          <div>
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
            <Dialog open={open} onClose={handleClose} fullWidth={true}   maxWidth={'md'} classes={{ paper: classes.dialogCustomizedWidth }}>
              <PatientCreateForm  actioncontrol={handleClose} controldisplay={controldisplay} editMode={false} />
            </Dialog>
            <Dialog classes={{ paperFullWidth: classes.dialogCustomizedWidth }} open={openEdit} onClose={handleEditClose}>
              <PatientCreateForm
                actioncontrol={handleEditClose}
                editMode={true}
                pdetails={pdata}
              />
            </Dialog>
          </div>
          <div className={classes.tableContainer}>
            
             <Table
              columnMap={columnMap}
              rows={allPatients}
              onEdit={handlePatientEdit}
              onDelete={handlePatientDelete}
            /> 
 
          </div>
      
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
