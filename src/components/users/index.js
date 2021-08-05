import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from "../table/index";
import { useSelector, useDispatch } from "react-redux";
import { getUserList, setAddOrUpdate } from "../../store/actions/users/index";
import { Button } from "@material-ui/core";
import { addUserText } from '../../utility/commonTexts';
import history from '../../routes/history';

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
            data: store.users
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

    const handleUserEdit = () => {

    }

    const handleUserDelete = () => {

    }

    const handleAddUserBtnClick = () => {
        dispatch(setAddOrUpdate('add'));
        history.push('/addupdateuser');
    }

    return (
        <div className={classes.root}>
            <h3> Hospital User Dashboard </h3>
            <div>
                <Button onClick={handleAddUserBtnClick} className={classes.addUserButton} variant="contained" color="primary" size="medium" type="button">{addUserText}</Button>
            </div>
            <div className={classes.tableContainer}>
                <Table columnMap={columnMap} rows={storeData.data.userList} onEdit={handleUserEdit} onDelete={handleUserDelete} />
            </div>
        </div>
    )
}

export default UserDashboard;
