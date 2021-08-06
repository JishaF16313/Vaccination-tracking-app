import React, {useState, useEffect} from 'react'
import PropTypes from "prop-types"
import {makeStyles} from "@material-ui/core/styles"
import  Typography  from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import {useDispatch} from "react-redux"
import {updateVaccinationDetail} from "../../../store/actions/vaccination";


const useStyles = makeStyles((theme) => ({

    inputField: {
      width: '100%',
      margin: '0 0 22px 0'
    }
  }));

function EditBedDetail(props) {
    const {open, onClose, details} = props
    const dispatch = useDispatch()

    const [saving, setsaving] = useState(false)

    const [localDetails, setlocalDetails] = useState(null)

    useEffect(() => {
        if(details)
            setlocalDetails({...details})
    }, [details])

    const handleClose = React.useCallback(() => onClose(), [onClose])


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
          {details && <BedDetails details={details}/>}
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

const BedDetails = ({details}) => {
  const {name, address, normalBed, oxygenBed, ventilatorBed} = details;
  const classes = useStyles()
  const [bedData, setBedData] = useState({
    normalBed,
    oxygenBed,
    ventilatorBed
  });

  const handleBedValueChange = (event) => {
    if(event.target.name === "normal") {
     setBedData({...bedData, normalBed : event.target.value});
    }
    else if(event.target.name === "oxygen") {
      setBedData({...bedData, oxygenBed : event.target.value});
    }
    else if(event.target.name === "ventilator") {
      setBedData({...bedData, ventilatorBed : event.target.value});
    }
    else return null;
  };

  console.log("bedData", bedData);

  return (
    <>
      <form noValidate autoComplete="off">
        <TextField disabled value={name} className={classes.inputField} id="standard-basic" label="Hospital Name" />
        <TextField disabled value={address} className={classes.inputField} id="standard-basic" label="Address" />
        <TextField type="number" onChange={(event) => handleBedValueChange(event)} name="normal" value={bedData.normalBed} className={classes.inputField} id="standard-basic" label="Normal Bed" />
        <TextField type="number" onChange={(event) => handleBedValueChange(event)} name="oxygen" value={bedData.oxygenBed} className={classes.inputField} id="standard-basic" label="Oxygen Bed" />
        <TextField type="number" onChange={(event) => handleBedValueChange(event)} name="ventilator" value={bedData.ventilatorBed} className={classes.inputField} id="standard-basic" label="Ventilator Bed" />
      </form>
    </>
  )
}


export default EditBedDetail

