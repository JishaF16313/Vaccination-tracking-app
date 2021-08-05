import React,  {useCallback, useState, useMemo}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditBedModel from './editBedDetails';

import Table from '../../table'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  display_Inline: {
    display: 'inline',
  },
  availability_status: {
 

},
  
}));

export default function BedForm() {
  const classes = useStyles();

  const [modal, setmodal] = useState({
      type: null,
      data: null
  })

const handleBedEdit = useCallback( (details) => setmodal({type: "edit", data: details}), [])

const handleBedDelete = useCallback( details => console.log("Delete", details), [])

const handleModalClose = useCallback(() => setmodal({type: null, data: null}),[])

      const columnMap = useMemo(  () => [{
        title: "Hospital ID",
        field: "id"
    },{
        title: "Hospital Name",
        field: "name"
    },{
        title: "Address",
        field: "address"
    },{
      title: "Normal Bed",
      field: "normalBed"
    },{
        title: "Oxygen Bed",
        field: "oxygenBed"
    },{
        title: "Ventilator Bed",
        field: "ventilatorBed"
    }], [])

  

  const rows = data


  
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="availability_status"
        >
        <Typography className={classes.heading}>Bed Summary </Typography>
        </AccordionSummary>
        <AccordionDetails className="display_Inline">
          <Typography>
          <Table  columnMap={columnMap} rows={rows} onEdit={handleBedEdit} onDelete={handleBedDelete} />
          <EditBedModel open={modal.type === "edit"} details={modal.data} onClose={handleModalClose}></EditBedModel>
          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}

const data = [{
  id: 111,
  name: "LNJP",
  address: "Banglore",
  normalBed: 1000,
  oxygenBed: 2000,
  ventilatorBed: 500
},{
  id: 222,
  name: "AIMMS",
  address: "Delhi",
  normalBed: 100,
  oxygenBed: 200,
  ventilatorBed: 50}]