import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import {getUploadHistory} from '../../../store/actions/hospitalAdmin/index'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  display_Inline: {
    display: 'inline',
  },
  upload_button: {
    float: 'right',
    margin: '20px'

  },
  buttons_wrapper: {
    padding: '8px 0',
    display: 'flex',
    justifyContent: 'flex-end'

}
}));

export default function UploadedHistory(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const storeData = useSelector((store) => {        
    return {
        HistoryData: store.patientReducer,
        loggedInUserData: store.auth
    }
});
  let token = storeData.loggedInUserData.token;
  let bedUploadHistoryData = storeData.HistoryData.bedUploadHistoryData;
    useEffect(() => {
      dispatch(getUploadHistory(token))
    }, []);

  const handleCellClick = (param, event) => {
    if (param.colIndex === 2) {
      event.stopPropagation();
    }
  };


  const columnMap = [
    {
      field: 'id',
      headerName: 'ID',
      width: 400,
      editable: false,
    },
    {
      field: 'uploadStatus',
      headerName: 'Upload Status',
      width: 200,
      editable: false,
    }
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper>
            <ButtonGroup className={classes.buttons_wrapper} variant="text" color="primary" aria-label="text primary button group">
              <Button onClick={() => props.handelShowHide("dashboard")}>Dashboard</Button>
              <Button onClick={() => props.handelShowHide("upload")}>Bulk Upload</Button>
              <Button>User Details</Button>
            </ButtonGroup>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid
              className={classes.root}
              rows={bedUploadHistoryData}
              columns={columnMap}
              pageSize={50}
              disableSelectionOnClick
            />
          </div>
        </Grid>
      </Grid>

    </div>
  );
}

