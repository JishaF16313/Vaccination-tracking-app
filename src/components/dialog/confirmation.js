import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
        fontWeight: 'bold'
    },
    message: {
        fontSize: '18px'
    }   
});

function ConfirmationDialog(props) {
    const classes = useStyles();
    const { open, title, message, agreeButtonText, disagreeButtonText, handleDisagree, handleAgree, ...other } = props;

    return (
        <Dialog maxWidth="xs" aria-labelledby="confirmation-dialog-title" open={open} {...other}>
            <DialogTitle className={classes.title} id="confirmation-dialog-title">{title}</DialogTitle>
            <DialogContent dividers>
                <div className={classes.message}>{message}</div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDisagree} color="primary">{disagreeButtonText}</Button>
                <Button onClick={handleAgree} color="primary">{agreeButtonText}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;