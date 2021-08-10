import GeneralDashboard from '../generalDashboard/index';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import history from '../../../routes/history';

const useStyles = makeStyles({   
    buttonGroup: {
        margin: '20px',
        float: 'right'
    },
    marginLeft20: {
        marginLeft: '20px'
    },
    title: {
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px',
        fontSize: '20px',
        fontWeight: 'bold'
    }
});

function AdminDashboard() {
    const classes = useStyles();

    const handleAddHospitalClick = () => {
        history.push('/addupdatehospital');
    }

    const handleAddHospitalBranchClick = () => {
        history.push('/hospital/addupdatebranch');
    }

    const handleAddHospitalUserClick = () => {
        history.push('/hospital/addupdateuser');
    }

    return (
        <div>
            <div className={classes.title}>Admin Dashboard</div>
            <div className={classes.buttonGroup}>
                <Button className={classes.marginLeft20} onClick={handleAddHospitalClick} variant="contained" color="primary" size="medium" type="button">Add Hospital</Button>
                <Button className={classes.marginLeft20} onClick={handleAddHospitalBranchClick} variant="contained" color="primary" size="medium" type="button">Add Hospital Branch</Button>
                <Button className={classes.marginLeft20} onClick={handleAddHospitalUserClick} variant="contained" color="primary" size="medium" type="button">Add Hospital User</Button>
            </div>
            <GeneralDashboard hideBookBedAction={true}/>
        </div>
    )
}

export default AdminDashboard;