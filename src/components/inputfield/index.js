import { useField, ErrorMessage } from 'formik';
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
const filter = createFilterOptions();

function InputField({ label, classes, ...props }) {
    const [field, meta] = useField(props);

    const textBoxField = () => {
        return (
            <TextField label={label} onChange={props.onChange} className={`form-control ${meta.touched && meta.error && 'is-valid'}`} {...field} {...props} autoComplete="off"
             InputLabelProps={{
                classes: {
                  asterisk: classes.asterisk
                }
              }}/>
        )
    };

    const textAreaField = () => {
        return (
            <TextField label={label} multiline maxRows={3} onChange={props.onChange} className={`form-control ${classes.addressField} ${meta.touched && meta.error && 'is-valid'}`} {...field} {...props} autoComplete="off" />
        )
    };

    const selectField = () => {
        return (
            <FormControl>
                <InputLabel id="select-label">{label}{props.required ? <span className={classes.ddlAsterisk}>*</span> : null} </InputLabel>
                <Select labelId="select-label" className={classes.ddl} onChange={props.onChange} {...field} {...props} autocomplete="off">
                    {props.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    };

    const autoCompleteField = () => {
        return (
            <Autocomplete className={classes.autocompleteField} value={props.value} {...field} {...props}
                onChange={props.onChange}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            label: `Add "${params.inputValue}"`,
                        });
                    }
                    return filtered;
                }}
                options={props.options}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.label;
                }}
                renderOption={(option) => option.label}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label={props.required ? <div>{label}<span className={classes.ddlAsterisk}>*</span></div> : label}/>
                )}
            />
        )
    }

    const errorMessageField = () => {
        return (
            <ErrorMessage component="div" name={field.name} className={classes.errorField} />
        )
    }

    return (
        <div>
            {(props.type === 'text' || props.type === 'password' || props.type === 'number' || props.type === "date" || props.type === "time") && (
               textBoxField()
            )}
            {props.type === 'textarea' && (
                textAreaField()
            )}
            {props.type === 'select' && (
                selectField()
            )}
            {props.type === 'autocomplete' && (
                autoCompleteField()
            )}
            {errorMessageField()}
        </div>
    )
}

export default InputField;
