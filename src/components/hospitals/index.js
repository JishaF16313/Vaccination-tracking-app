import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from "../table/index";
import { useSelector, useDispatch } from "react-redux";
import { getHospitalList, setAddOrUpdate, setEditedHospitalData, setDeletingHospitalId,
    setOpenHospitalDeleteDialog, deleteSelectedHospital } from "../../store/actions/hospitals/index";
import { Button } from "@material-ui/core";
import { addHospitalText, hospitalDashboardText, deleteConfirmationDialogTitleText, deleteHospitalMessageText,
    deleteAgreeButtonText, deleteDisagreeButtonText } from '../../utility/commonTexts';
import history from '../../routes/history';
import ConfirmationDialogue from '../dialog/confirmation';

const useStyles = makeStyles({
    root: {
        padding: "2%",
        flexGrow: 1,
    },
    title: {
        margin: "10px 0px"
    },
    tableContainer: {
        margin: "10px 0px",
        padding: "2px"
    },
    loader: {
        width: "100%",
        textAlign: "center",
        padding: "10px"
    },
    addHospitalButton: {
        margin: '20px',
        float: 'right'
    }
});

function HospitalDashboard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const storeData = useSelector((store) => {
        return {
            data: store.hospitals
        }
    });

    useEffect(() => {
        dispatch(getHospitalList())
    }, []);

    const columnMap = [
        {
            title: "ID",
            field: "id",
        }, {
            title: "Name",
            field: "name"
        }, {
            title: "Address",
            field: "address"
        }, {
            title: "Zip",
            field: "zip"
        }, {
            title: "City",
            field: "city"
        }, {
            title: "State",
            field: "state"
        }];

    const handleHospitalEdit = (row) => {
        dispatch(setEditedHospitalData(row));
        dispatch(setAddOrUpdate('update'));
        history.push('/addupdatehospital');
    }

    const handleHospitalDelete = (row) => {       
        dispatch(setDeletingHospitalId(row.id));
        dispatch(setOpenHospitalDeleteDialog(true));
    }

    const closeDialog = () => {
        dispatch(setOpenHospitalDeleteDialog(false));
    }
    
    const onDeleteConfirm = () => {
        dispatch(deleteSelectedHospital());
        dispatch(setOpenHospitalDeleteDialog(false));
    }

    const handleAddHospitalBtnClick = () => {
        dispatch(setAddOrUpdate('add'));
        history.push('/addupdatehospital');
    }

    return (
        <div className={classes.root}>
            <h3>{hospitalDashboardText}</h3>
            <div>
                <Button onClick={handleAddHospitalBtnClick} className={classes.addHospitalButton} variant="contained" color="primary" size="medium" type="button">{addHospitalText}</Button>
            </div>
            <div className={classes.tableContainer}>
                <Table columnMap={columnMap} rows={storeData.data.hospitalList} onEdit={handleHospitalEdit} onDelete={handleHospitalDelete} />
            </div>
            <ConfirmationDialogue open={storeData.data.openDeleteConfirmationDialog} title={deleteConfirmationDialogTitleText} message={deleteHospitalMessageText} agreeButtonText={deleteAgreeButtonText} disagreeButtonText={deleteDisagreeButtonText} handleDisagree={closeDialog} handleAgree={onDeleteConfirm} />
        </div>
    )
}

export default HospitalDashboard;
