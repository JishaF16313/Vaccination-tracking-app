import React from 'react'
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
import {useDispatch, useSelector} from "react-redux"
import {uploadVaccinationData} from "../../../store/actions/vaccination"
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
        margin: theme.spacing(1)
    }
  }));

function AddVaccinationData(props) {
    const {open, onClose} = props
    const dispatch = useDispatch()
    const { hospitalBranchId} = useSelector(store => store.auth)
    const classes = useStyles()


    const defaultVaccinationSlot = React.useMemo(() => ({
        "vaccine-type": "",
        count: "",
        dateOfAvailablity: ""
    }), [])

    const validationSchema = Yup.object().shape({
        slots: Yup.array()
          .of(
            Yup.object().shape({
              "vaccine-type": Yup.string().required('Required'),
              count: Yup.number().min(0).required('Required'),
              dateOfAvailablity: Yup.date().required("Required")
            })
          )
      });

   
    // Handle closing of the dialog
    const handleClose = React.useCallback(() => {
        onClose()}, [onClose])


    // Handle vaccination update
    const handleSubmit = (data) => {
        const reqBody = {
          branchId: hospitalBranchId,
          Vaccines: [...data.slots]
        }
        dispatch(uploadVaccinationData(reqBody))
        handleClose();
    }

    const initialValues = {
        slots: [{...defaultVaccinationSlot}]
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm"> 
        <DialogTitle>Add Vaccination Slots</DialogTitle>
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
        { ({values}) => <Form>
                <FieldArray name="slots">
                    {({insert, remove, push, }) => <DialogContent>
                        { values.slots.map((slotData, index) => (
                        <Paper elevation={1} square key={index} className={classes.paper}>
                        <FormControl className={classes.formControl}>
                            <InputField label="Vaccine" id={`slots.${index}.vaccine-type`} name={`slots.${index}.vaccine-type`} type="select" options={vaccineList} classes={classes} className={classes.vaccinePicker} />               
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputField label="Slots" type="number" id={`slots.${index}.count`} name={`slots.${index}.count`} classes={classes} inputProps={{min: 0}} className={classes.slotCount}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                        <InputField
                            id={`slots.${index}.dateOfAvailablity`}
                            label="Availibility Date"
                            type="date"
                            name={`slots.${index}.dateOfAvailablity`}
                            classes={classes}
                            className={classes.datePicker}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </FormControl>
                        <IconButton onClick={() => remove(index)} className={classes.errorField} disabled={values.slots.length === 1}><RemoveCircleOutlineIcon fontSize="small"/></IconButton>
                    </Paper>
                        ))}                
            <Button onClick={() => push({...defaultVaccinationSlot})} variant="contained" color="primary" size="small" className={classes.addMoreBtn}>Add More</Button>
            </DialogContent>
        }
        </FieldArray>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" >
            Cancel
          </Button>
          <Button type="submit"  color="primary" >
            Upload
          </Button>
        </DialogActions>
        </Form>
        }
        </Formik>
      </Dialog>
    )
}


export default AddVaccinationData

