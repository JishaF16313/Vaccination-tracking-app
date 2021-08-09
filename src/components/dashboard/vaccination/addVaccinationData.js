import React, {useState, useEffect} from 'react'
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import {makeStyles} from "@material-ui/core/styles"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Paper from '@material-ui/core/Paper';
import {useDispatch} from "react-redux"
import {updateVaccinationDetail} from "../../../store/actions/vaccination"
import InputField  from "../../inputfield" 
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from "@material-ui/core/IconButton"
import {vaccineList} from "../../../utility/commonTexts"

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    paper:{
        margin: theme.spacing(1),
        display: "flex",
        alignItems: "center"
    },
    vaccinePicker:{
        width: "150px"
    },
    slotCount: {
        maxWidth: "80px"
    },
    datePicker: {
        width: "100%"
    },
    errorField: {
        color: 'red',
        marginTop: theme.spacing(1)
    },
    addMoreBtn: {
        margin: "10px 0px"
    }
  }));

function AddVaccinationData(props) {
    const {open, onClose} = props
    const dispatch = useDispatch()
    const classes = useStyles()

    const [saving, setsaving] = useState(false)

    const defaultVaccinationSlot = React.useMemo(() => ({
        vaccineType: "",
        noOfSlots: "",
        date: ""
    }), [])


    const validate = Yup.object({
        vaccineType: Yup.string().max(100).required("Required"),
        noOfSlots: Yup.number().required("Required"),
        date: Yup.date().required("Required")
    });

   
    // Handle closing of the dialog
    const handleClose = React.useCallback(() => {
        onClose()}, [onClose])


    // Handle vaccination update
    const handleSubmit = (data) => {
        setsaving(true)
        console.log(data);
    }

    const initialValues = {
        slots: [{
            vaccineType: "",
            noOfSlots: "",
            date: ""
        }]
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm"> 
        <DialogTitle>Add Vaccination Slots</DialogTitle>
        <Formik validationSchema={validate} initialValues={initialValues} onSubmit={handleSubmit}>
        { ({values}) => <Form>
                <FieldArray name="slots">
                    {({insert, remove, push, }) => <DialogContent>
                        { values.slots.map((slotData, index) => (
                        <Paper elevation={1} square key={index} className={classes.paper}>
                        <FormControl className={classes.formControl}>
                            <InputField label="Vaccine" id={`slots.${index}.vaccineType`} name={`slots.${index}.vaccineType`} type="select" options={vaccineList} classes={classes} className={classes.vaccinePicker} />               
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputField label="Slots" type="number" id={`slots.${index}.noOfSlots`} name={`slots.${index}.noOfSlots`} classes={classes} inputProps={{min: 0}} className={classes.slotCount}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                        <InputField
                            id={`slots.${index}.date`}
                            label="Availibility Date"
                            type="date"
                            name={`slots.${index}.date`}
                            classes={classes}
                            className={classes.datePicker}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </FormControl>
                        <IconButton onClick={() => values.slots.length > 1 &&  remove(index)} className={classes.errorField} disabled={values.slots.length === 1}><RemoveCircleOutlineIcon/></IconButton>
                    </Paper>
                        ))}                
            <Button onClick={() => push({...defaultVaccinationSlot})} variant="contained" color="primary" size="small" className={classes.addMoreBtn}>Add More</Button>
            </DialogContent>
        }
        </FieldArray>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" disabled={saving}>
            Cancel
          </Button>
          <Button type="submit"  color="primary" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
        </Form>
        }
        </Formik>
      </Dialog>
    )
}


export default AddVaccinationData

