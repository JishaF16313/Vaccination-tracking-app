import { useField, ErrorMessage } from 'formik';
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

function InputField({ label, classes, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div>
            {(props.type === 'text' || props.type === 'password') && (
                <TextField label={label} onChange={props.onChange} className={`form-control ${meta.touched && meta.error && 'is-valid'}`} {...field} {...props} autocomplete="off" />
            )}
            {props.type === 'textarea' && (
                <TextField label={label} multiline maxRows={3} onChange={props.onChange} className={`form-control ${classes.addressField} ${meta.touched && meta.error && 'is-valid'}`} {...field} {...props} autocomplete="off" />
            )}
            {props.type === 'select' && (
                <FormControl>
                    <InputLabel id="select-label">{label}</InputLabel>
                    <Select labelId="select-label" className={classes.ddl} onChange={props.onChange} {...field} {...props} autocomplete="off">
                        {props.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
            <ErrorMessage component="div" name={field.name} className={classes.errorField} />
        </div>
    )
}

export default InputField;
