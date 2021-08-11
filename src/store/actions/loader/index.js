export const TYPES = {
    SHOW_LOADER: 'SHOW_LOADER',
    HIDE_LOADER: 'HIDE_LOADER'
}
 
 export const startLoading = (value) => ({
    type: TYPES.SHOW_LOADER, payload: value
 });

 export const stopLoading = () => ({
    type: TYPES.HIDE_LOADER
 });

