import React from 'react';
import { Dialog, DialogActions, DialogContent, Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { setVaccinationSuccessModalState } from '../../store/actions/schedulevaccination/index';

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        width: '480px',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderBottom: '2px solid black'
    },
    rowItemDiv: {
        border: '2px solid black',
        borderBottom: 'none',
        display: 'flex'
    },
    labelDiv: {
        padding: '5px',
        fontSize: '16px',
        fontWeight: 'bold',
        width: '150px',
        borderRight: '2px solid black'
    },
    successIcon: {
        height: '2em',
        width: '2em',
        color: 'green'
    },
    iconDiv: {
        marginLeft: 'auto',
        justifyContent: 'center',
        display: 'flex'
    },
    successText: {
        color: 'green',
        fontSize: '20px',
        margin: '10px 0px 25px 15px'
    },
    dataDiv: {
        padding: '5px',
        fontSize: '16px'
    }
}));

function ScheduleVaccinationConfirmModal({ data, open }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setVaccinationSuccessModalState(false));
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
            {data && (
                <DialogContent>
                    <div className={classes.iconDiv}>
                        <CheckCircleIcon className={classes.successIcon} />
                        <div className={classes.successText}>Success</div>
                    </div>
                    <div className={classes.mainDiv}>
                        <div className={classes.rowItemDiv}>
                            <div className={classes.labelDiv}>Adhaar</div>
                            <div className={classes.dataDiv}>{data["PatientAdhar"] ? data["PatientAdhar"] : null}</div>
                        </div>
                        <div className={classes.rowItemDiv}>
                            <div className={classes.labelDiv}>Name</div>
                            <div className={classes.dataDiv}>{data["PatientName"] ? data["PatientName"] : null}</div>
                        </div>
                        <div className={classes.rowItemDiv}>
                            <div className={classes.labelDiv}>Branch Name</div>
                            <div className={classes.dataDiv}>{data["branch-name"] ? data["branch-name"] : null}</div>
                        </div>
                        <div className={classes.rowItemDiv}>
                            <div className={classes.labelDiv}>City</div>
                            <div className={classes.dataDiv}>{data["cityName"] ? data["cityName"] : null}</div>
                        </div>
                        <div className={classes.rowItemDiv}>
                            <div className={classes.labelDiv}>Hospital</div>
                            <div className={classes.dataDiv}>{data["hospital-name"] ? data["hospital-name"] : null}</div>
                        </div>
                        <div className={classes.rowItemDiv}>
                            <div className={classes.labelDiv}>Booking ID</div>
                            <div className={classes.dataDiv}>{data["vaccine-booking-id"] ? data["vaccine-booking-id"] : null}</div>
                        </div>
                        <div className={classes.rowItemDiv}>
                            <div className={classes.labelDiv}>Dose Type</div>
                            <div className={classes.dataDiv}>{data.dose[0] ? (data.dose[0]["dose-name"] ? data.dose[0]["dose-name"] : null) : null}</div>
                        </div>
                        <div className={classes.rowItemDiv}>
                            <div className={classes.labelDiv}>Dose Date</div>
                            <div className={classes.dataDiv}>{data.dose[0] ? (data.dose[0]["date"] ? data.dose[0]["date"] : null) : null}</div>
                        </div>
                        <div className={classes.rowItemDiv}>
                            <div className={classes.labelDiv}>Status</div>
                            <div className={classes.dataDiv}>{data.dose[0] ? (data.dose[0]["status"] ? data.dose[0]["status"] : null) : null}</div>
                        </div>
                        <div className={classes.rowItemDiv}>
                            <div className={classes.labelDiv}>Vaccine Type</div>
                            <div className={classes.dataDiv}>{data.dose[0] ? (data.dose[0]["vaccine-type"] ? data.dose[0]["vaccine-type"] : null) : null}</div>
                        </div>
                    </div>
                </DialogContent>
            )}
            <DialogActions>
                <Button onClick={handleClose} color="primary">OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ScheduleVaccinationConfirmModal;
