import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSelector } from 'react-redux';

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
  })

  return (
    <div className={classes.root}>
      {storeData.data.alertType && (
        <Alert severity={storeData.data.alertType}>
          <AlertTitle>{storeData.data.alertTitle}</AlertTitle>
          {storeData.data.alertMessage}
        </Alert>
      )}
    </div>
  );
}

export default AlertMessage;

