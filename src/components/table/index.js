import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function ActionableTable(props) {
    const {columnMap, rows, onEdit, onDelete } = props

    // Flag to show/hide the actions column
    const haveActions = onEdit || onDelete

    // Row edit handler
    const handleRowEdit = React.useCallback((row) => () => onEdit(row), [onEdit])

    // Row delete handler
    const handleRowDelete = React.useCallback((row) => () => onDelete(row), [onDelete]) 


    return (
      <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
              {
                  columnMap.map(column => <TableCell key={column.field}><b>{column.title}</b></TableCell>)
              }
              {
                  haveActions && <TableCell align="center" style={{width: "100px"}}><b>Actions</b></TableCell>
              }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) =>(
            <TableRow key={`row-${index}`}>
                {columnMap.map( ({field}) => <TableCell component="th" scope="row" key={`row-${index}-${field}`}>
                {field.split(".").reduce((agg, val) => agg[val], row)}
              </TableCell> )}
              {
                  haveActions && <TableCell component="th" scope="row">
                    <span style={{display: "flex", justifyContent: "space-evenly"}}>
                      {onEdit && <IconButton size="small" onClick={handleRowEdit(row)} > <EditIcon fontSize="small" /></IconButton>}
                      {onDelete && <IconButton size="small" onClick={handleRowDelete(row)} > <DeleteIcon fontSize="small"/></IconButton>}
                    </span>
                  </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

ActionableTable.propTypes = {
    columnMap: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    onEdit: PropTypes.func,
    odDelete: PropTypes.func
}

export default ActionableTable