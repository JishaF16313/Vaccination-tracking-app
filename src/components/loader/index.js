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
    },
    overlay: {
        position: 'fixed',
        display: 'block',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: '2',
        cursor: 'pointer'
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
                <div className={classes.overlay}>
                    <div className={classes.loaderDiv}>
                        <CircularProgress color="secondary" />
                        <div className={classes.loaderMessage}>{storeData.data.message}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Loader;
