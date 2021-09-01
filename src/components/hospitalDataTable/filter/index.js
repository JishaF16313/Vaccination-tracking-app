import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import {  hospitalAvailbleBedListFilter_Pin } from '../../../store/actions/patientDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  button: {
    margin: theme.spacing(2),
  },
}));

export default function Filter() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [pincode,setPincode] = useState("");
  const [hospitalName,setHospitalName] = useState("");
  const storeData = useSelector((store) => {
    return {
        loggedInUserData: store.auth,
        hospitalAvailableBedList: store.hospitalAvailableBedList
    }
});

  const filterSubmit = () => {
    let token = storeData.loggedInUserData.token;   
    if(pincode){
      dispatch(hospitalAvailbleBedListFilter_Pin(pincode,token));
      }
    }
  
  
  return (
    <div>
     <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField label="Zip code" id="mui-theme-provider-standard-input" defaultValue="" size="small" onChange={(e)=>setPincode(e.target.value)} />
        <TextField label="Hospital" id="mui-theme-provider-standard-input" defaultValue=""  size="small" onChange={(e)=>setHospitalName(e.target.value)}/>
        <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<FilterListIcon />}
        onClick={filterSubmit}
      >
      Filter
    </Button>
      </div>
     </form>
     </div>
  );
}

