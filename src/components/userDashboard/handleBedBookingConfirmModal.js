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


const useStyles = makeStyles((theme) => ({
    
  }));

function ConfirmBedBookingDetails(props) {
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
    })

    // Handle vaccination update
    const handleSubmit = () => {
            handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm"> 
        <DialogTitle>Bed Booking Confirmation Detail</DialogTitle>
        <DialogContent>
         <h2>Booking ID : 128990 </h2>
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

export default ConfirmBedBookingDetails;