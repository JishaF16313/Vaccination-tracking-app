import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    loaderDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: '45%',
        left: '45%'
    },
    loaderMessage: {
        marginLeft: '10px'
    }
}));

function Loader({ message, ...props }) {
    const storeData = useSelector((store) => {
        return {
            data: store.loader
        }
    })
    const classes = useStyles();

    return (
        <div>
            {storeData.data.showLoader && (
                <div className={classes.loaderDiv}>
                    <CircularProgress color="secondary" />
                    <div className={classes.loaderMessage}>{storeData.data.message}</div>
                </div>
            )}
        </div>
    );
}

export default Loader;
