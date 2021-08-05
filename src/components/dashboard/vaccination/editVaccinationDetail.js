import React, {useState, useEffect} from 'react'
import PropTypes from "prop-types"
import {makeStyles} from "@material-ui/core/styles"
import  Typography  from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Paper from '@material-ui/core/Paper';
import {useDispatch} from "react-redux"
import {updateVaccinationDetail} from "../../../store/actions/vaccination"

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    doseDetails: {
        margin: "15px 0px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRight: "8px solid #ccc"
    }
  }));

function EditVaccinationDetail(props) {
    const {open, onClose, details} = props
    const dispatch = useDispatch()

    const [saving, setsaving] = useState(false)

    // Maintaing local copy of the dose details in a state
    const [localDetails, setlocalDetails] = useState(null)

    // Updating the local state on change of the props
    useEffect(() => {
        if(details)
            setlocalDetails({...details})
    }, [details])

    // Handle closing of the dialog
    const handleClose = React.useCallback(() => onClose(), [onClose])

    // Handle change in the dose data
    const handleDoseUpdate = React.useCallback((dose, data
    ) =>{ 
        const doseKey = dose === 1 ? "dose1" : "dose2" 
        setlocalDetails({...localDetails, [doseKey] : {...data}})
    },[localDetails])

    // Handle vaccination update
    const handleSubmit = () => {
        setsaving(true)
        dispatch(updateVaccinationDetail(localDetails)).then(res => {
            handleClose()
            setsaving(false)
        })
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm"> 
        <DialogTitle>Edit Vaccination Detail</DialogTitle>
        <DialogContent>
         {details && localDetails && <DoseDetails dose={1} data={localDetails.dose1} complete={details.dose1.status === "done"} onChange={handleDoseUpdate}/> }
         {details && localDetails && <DoseDetails dose={2} data={localDetails.dose2} complete={details.dose2.status === "done"} disabled={details.dose1.status === "pending"} onChange={handleDoseUpdate} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}  color="primary" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    )
}

const DoseDetails = ({dose, data, complete, disabled, onChange}) =>{ 
    const classes = useStyles()

    const {status, vaccine} = data

    // Handle input change
    const handleChange = React.useCallback((event) => {
        const { value, name } = event.target
        onChange(dose, {...data, [name]: value } )
    },[dose, data, onChange])

    return <Paper elevation={3} className={classes.doseDetails} style={{borderColor: complete ? "#81c784" : disabled ? "#ccc" : "#ffb74d" }}>
    <Typography variant="body1">Dose {dose}</Typography>
        <FormControl className={classes.formControl}>
        <InputLabel id={`dose${dose}-status-label`}>Status</InputLabel>
            <Select
            labelId={`dose${dose}-status-label`}
            id={`dose${dose}-status-select`}
            value={status}
            name="status"
            onChange={handleChange}
            disabled={complete || disabled}
            >
            <MenuItem value={"done"}>Done</MenuItem>
            <MenuItem value={"pending"}>Pending</MenuItem>
            </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
        <InputLabel id={`${dose}-vaccine-label`}>Vaccine</InputLabel>
            <Select
            labelId={`dose${dose}-vaccine-label`}
            id={`dose${dose}-vaccine-select`}
            name="vaccine"
            value={vaccine}
            onChange={handleChange}
            disabled={complete || disabled || status === "pending"}
            >
            <MenuItem value={"covishield"}>Covishield</MenuItem>
            <MenuItem value={"covaxine"}>Covaxine</MenuItem>
            <MenuItem value={"sputnikv"}>Sputnik V</MenuItem>
            </Select>
        </FormControl>
    </Paper>
}

DoseDetails.propTypes = {
    dose : PropTypes.number.isRequired, //Dose Number
    data: PropTypes.object.isRequired, //Dose details
    complete: PropTypes.bool.isRequired, //Complition status of the dose
    disabled: PropTypes.bool.isRequired, //Disable 2nd dose if 1st dose is pending
    onChange: PropTypes.func.isRequired, //Handle update of dose details
}

EditVaccinationDetail.propTypes = {
    open: PropTypes.bool.isRequired, //Flag to show/hide the modal
    onClose: PropTypes.func.isRequired, //Handle closing of the modal
    details: PropTypes.object.isRequired, //Details of the vaccination appointment
}

export default EditVaccinationDetail

