import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { clearAlert } from '../../store/actions/alert/index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function AlertMessage() {
  const classes = useStyles();

  const storeData = useSelector((store) => {
    return {
      data: store.alert
    }
  });

  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      {storeData.data.alertType && (
        <Alert severity={storeData.data.alertType} onClose={() => dispatch(clearAlert())}>
          <AlertTitle>{storeData.data.alertTitle}</AlertTitle>
          {storeData.data.alertMessage}
        </Alert>
      )}
    </div>
  );
}

export default AlertMessage;

