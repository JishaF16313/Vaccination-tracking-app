import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from "../table/index";
import { useSelector, useDispatch } from "react-redux";
import {
    getUserList, setAddOrUpdate, setEditedHospitalUserData, setDeletingHospitalUserId,
    setOpenHospitalUserDeleteDialog, deleteSelectedHospitalUser
} from "../../store/actions/hospitalusers/index";
import { Button } from "@material-ui/core";
import { addUserText, hospitalUserDashboardText, deleteConfirmationDialogTitleText, deleteHospitalUserMessageText,
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
    addUserButton: {
        margin: '20px',
        float: 'right'
    }
});

function UserDashboard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const storeData = useSelector((store) => {
        return {
            data: store.hospitalusers
        }
    });

    useEffect(() => {
        dispatch(getUserList())
    }, []);

    const columnMap = [
        {
            title: "ID",
            field: "id",
        }, {
            title: "Name",
            field: "name"
        }, {
            title: "Username",
            field: "userName"
        }, {
            title: "Address",
            field: "address"
        }, {
            title: "Hospital Name",
            field: "hospitalName"
        }, {
            title: "User Type",
            field: "userType"
        }];

    const handleUserEdit = (row) => {
        dispatch(setEditedHospitalUserData(row));
        dispatch(setAddOrUpdate('update'));
        history.push('/hospital/addupdateuser');
    }

    const handleUserDelete = (row) => {
        dispatch(setDeletingHospitalUserId(row.id));
        dispatch(setOpenHospitalUserDeleteDialog(true));
    }

    const closeDialog = () => {
        dispatch(setOpenHospitalUserDeleteDialog(false));
    }

    const onDeleteConfirm = () => {
        dispatch(deleteSelectedHospitalUser());
        dispatch(setOpenHospitalUserDeleteDialog(false));
    }

    const handleAddUserBtnClick = () => {
        dispatch(setAddOrUpdate('add'));
        history.push('/hospital/addupdateuser');
    }

    return (
        <div className={classes.root}>
            <h3>{hospitalUserDashboardText}</h3>
            <div>
                <Button onClick={handleAddUserBtnClick} className={classes.addUserButton} variant="contained" color="primary" size="medium" type="button">{addUserText}</Button>
            </div>
            <div className={classes.tableContainer}>
                <Table columnMap={columnMap} rows={storeData.data.userList} onEdit={handleUserEdit} onDelete={handleUserDelete} />
            </div>
            <ConfirmationDialogue open={storeData.data.openDeleteConfirmationDialog} title={deleteConfirmationDialogTitleText} message={deleteHospitalUserMessageText} agreeButtonText={deleteAgreeButtonText} disagreeButtonText={deleteDisagreeButtonText} handleDisagree={closeDialog} handleAgree={onDeleteConfirm} />
        </div>
    )
}

export default UserDashboard;
