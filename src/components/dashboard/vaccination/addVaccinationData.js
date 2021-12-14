import React, { useState, useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadVaccinationData,
  setSlotCount,
  setSlotTimeCount,
} from "../../../store/actions/vaccination";
import InputField from "../../inputfield";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import { vaccineList } from "../../../utility/commonTexts";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";
import { TocSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paper: {
    margin: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  vaccinePicker: {
    width: "150px",
  },
  slotCount: {
    maxWidth: "80px",
  },
  datePicker: {
    width: "100%",
  },
  timePicker: {
    width: "100%",
    padding: theme.spacing(1),
  },
  errorField: {
    color: "red",
    marginTop: theme.spacing(1),
  },
  addMoreBtn: {
    margin: theme.spacing(1),
  },
  paperForTime: {
    margin: theme.spacing(1),
  },
  fieldset: {
    maxWidth: "100%",
    marginBottom: 10,
    padding: 10,
    border: "1px solid #ddd",
    borderRadius: 5,
  },
  timePickerMain:{
    display: "flex",
    width:"100%",
   // justifyContent: "center",
    flexWrap: "wrap"
  }
}));

function AddVaccinationData(props) {
  const { open, onClose } = props;
  const dispatch = useDispatch();
  const { hospitalBranchId } = useSelector((store) => store.auth);

  const classes = useStyles();

  const defaultVaccinationSlot = React.useMemo(
    () => ({
      "vaccine-type": "",
      count: "",
      dateOfAvailablity: "",

      Slots: [
        {
          "Slot-Start-Time": "",
          "Slot-End-Time": "",
        },
      ],
    }),

    []
  );

  const validationSchema = Yup.object().shape({
    slots: Yup.array().of(
      Yup.object().shape({
        "vaccine-type": Yup.string().required("Required"),
        count: Yup.number().min(0).required("Required"),
        dateOfAvailablity: Yup.date().required("Required"),
      })
    ),
  });

  // Handle closing of the dialog
  const handleClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  // Handle vaccination update
  const handleSubmit = (data) => {
    const reqBody = {
      branchId: hospitalBranchId,
      Vaccines: data.slots.map((slot) => ({
        ...slot,
        dateOfAvailablity: slot.dateOfAvailablity
          .split("-")
          .reverse()
          .join("-"),
      })),
    };
  //  console.log(reqBody, "Request data");
    dispatch(uploadVaccinationData(reqBody));
    handleClose();
  };

  const initialValues = {
    slots: [{ ...defaultVaccinationSlot }],
    // phNumbers: [],
  };

  //Jisha

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg">
      <DialogTitle>Add Vaccination Slots</DialogTitle>
      <Formik
        enableReinitialize={true}
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="slots">
              {({ insert, remove, push, form, ...fieldArrayHelpers }) => (
                <DialogContent>
                  {values.slots.map((slotData, index) => (
                    <Paper
                      elevation={1}
                      square
                      key={`main-${index}`}
                      id={`main-${index}`}
                      name={`main-${index}`}
                      className={classes.paper}
                    >
                      <FormControl className={classes.formControl}>
                        <InputField
                          label="Vaccine"
                          id={`slots.${index}.vaccine-type`}
                          name={`slots.${index}.vaccine-type`}
                          type="select"
                          options={vaccineList}
                          classes={classes}
                          className={classes.vaccinePicker}
                        />
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputField
                          label="Count"
                          type="number"
                          id={`slots.${index}.count`}
                          name={`slots.${index}.count`}
                          classes={classes}
                          inputProps={{ min: 0 }}
                          className={classes.slotCount}
                        />
                      </FormControl>

                      <FormControl className={classes.formControl}>
                        <InputField
                          id={`slots.${index}.dateOfAvailablity`}
                         // label="Availibility Date"
                          type="date"
                          name={`slots.${index}.dateOfAvailablity`}
                          classes={classes}
                          className={classes.datePicker}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </FormControl>
                      {/**********TIME SLOT STARTED***********/}
                      <Paper
                        key={`${index}`}
                        elevation={1}
                        square
                        className={classes.paper}
                      >
                        <FormControl component="fieldset" className="fieldset">
                          <FormLabel component="Legend">Time Slots</FormLabel>
                          <FormGroup row>
                            <FieldArray name={`slots[${index}].Slots`}>
                              {(fieldArrayProps) => {
                                //console.log(
                                  //fieldArrayProps.form.values.slots,
                               //   "fieldArrayProps"
                               // );
                                const { push, remove, form } = fieldArrayProps;
                                const { values } = form;
                                const { slots } = values;

                                return (
                                  
                                    <div className={classes.timePickerMain}>
                                      {slots[index].Slots.map((Slots, id) => {
                                        return (
                                          <Paper
                                            key={`${Slots}.${id}`}
                                            name={`${Slots}.${id}`}
                                            elevation={1}
                                            square
                                            className={classes.paper}
                                          >
                                            <InputField
                                              id={`slots.${index}.Slots.${id}.Slot-Start-Time`}
                                              label="Time From"
                                             // defaultValue="09:00:00"
                                              type="time"
                                              name={`slots.${index}.Slots.${id}.Slot-Start-Time`}
                                              classes={classes}
                                              className={classes.timePicker}
                                              inputProps={{
                                                step: 2,
                                               
                                              }}
                                              InputLabelProps={{
                                                shrink: true,
                                              }}
                                            />

                                            <InputField
                                              id={`slots.${index}.Slots.${id}.Slot-End-Time`}
                                              name={`slots.${index}.Slots.${id}.Slot-End-Time`}
                                             // defaultValue="10:00:00"
                                              label="Time To"
                                              type="time"
                                              classes={classes}
                                              className={classes.timePicker}
                                              InputLabelProps={{
                                                shrink: true,
                                              }}
                                              inputProps={{
                                                step: 2,
                                               // min: "08:00:00",
                                               // max: "20:00:00",
                                              }}
                                            />
                                          </Paper>
                                        );
                                      })}
                                      <div  className={classes.vaccButton}>
                                      <IconButton
                                        type="button"
                                        onClick={() => {
                                          push("");
                                        }}
                                      >
                                        <AddIcon fontSize="small" />
                                      </IconButton>

                                      <IconButton
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        <RemoveIcon fontSize="small" />
                                      </IconButton>
                                    </div>
                                    </div>
                                );
                              }}
                            </FieldArray>
                          </FormGroup>
                        </FormControl>
                      </Paper>
                      {/**********TIME SLOT END***********/}
                      <IconButton
                        onClick={() => remove(index)}
                        className={classes.errorField}
                        disabled={values.slots.length === 1}
                      >
                        <RemoveCircleOutlineIcon fontSize="small" />
                      </IconButton>
                    </Paper>
                  ))}
                  <Button
                    onClick={() => {
                      push({ ...defaultVaccinationSlot });

                     // console.log(JSON.stringify(values));
                    }}
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.addMoreBtn}
                  >
                    Add More
                  </Button>
                </DialogContent>
              )}
            </FieldArray>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Upload
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default AddVaccinationData;
