export const TYPES = {
    SHOW_ALERT: 'SHOW_ALERT',
    HIDE_ALERT: 'HIDE_ALERT'
}

export const setAlert = (value) => ({
    type: TYPES.SHOW_ALERT, payload: value
});

export const clearAlert = () => ({
    type: TYPES.HIDE_ALERT
});

