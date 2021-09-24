import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { makeStyles,withStyles } from '@material-ui/core/styles';
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
import DoneIcon from '@material-ui/icons/Done';
import {get as getFromObject} from "lodash"
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  editIcon: {
    color: "#2196f3"
  },
  deleteIcon: {
    color: "#f44336"
  },
  doneIcon:{
    color: "#43a047"
  }
});


const styles = theme => ({
  tableRow: {
    "&$selected, &$selected:hover": {
      backgroundColor: "#d3d7ee"
    }
  },
  tableCell: {
    "$selected &": {
      color: "yellow"
    }
  },
  hover: {},
  selected: {}
});

function ActionableTable(props) {

    const {columnMap, rows, onEdit, onDelete, onDone, rowIdField } = props

    const classes = useStyles()
    const [selectedID, setSelectedID] = useState(0);
    const [page, setPage] =useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // Flag to show/hide the actions column
    const haveActions = onEdit || onDelete || onDone

    // Row edit handler
    const handleRowEdit = React.useCallback((row) => () => onEdit(row), [onEdit])

    // Row delete handler
    const handleRowDelete = React.useCallback((row) => () => onDelete(row), [onDelete]) 
    
    // Row done handler
    const handleRowDone = React.useCallback((row) => () => onDone(row), [onDone]) 
    

    //Row Click Handler
    const handleCellClick = (row) => {
      console.log("row",row);
  }

    //Funtion to get the display value
    const getDisplayValue = React.useCallback((row, field, type) => {
      const value = getFromObject(row, field, "--")
      if (value === "--" || value === "") return value
      switch(type)
      {
        case displayTypes.date:
          return new Date(value).toLocaleDateString()

        case displayTypes.BoolSuccessFailed:
          return value ? "Success" : "Failed"

        default:
          return value
      }
    })

    // ID field for table rows
    const rowID = rowIdField || "id"
    // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

    return (
      <TableContainer component={Paper} elevation={3}>
      <Table className={classes.table}>
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
          {rows
          .slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
          .map((row, index) =>(
            <TableRow key={`row-${index}`} hover
            key={row[rowID]}
            onClick={() => {
              setSelectedID(row[rowID])
            }}
            selected={selectedID === row[rowID]}
            classes={{ hover: classes.hover, selected: classes.selected }}
            className={classes.tableRow}>
                {columnMap.map( ({field, type}) => <TableCell component="th" scope="row" key={`row-${index}-${field}`}>
                {getDisplayValue(row, field, type)}
              </TableCell> )}
              {
                  haveActions && <TableCell component="th" scope="row">
                    <span style={{display: "flex", justifyContent: "space-evenly"}}>
                      {onDone && <IconButton size="small" onClick={handleRowDone(row)} > <DoneIcon fontSize="small" className={classes.doneIcon}/></IconButton>}
                      {onEdit && <IconButton size="small" onClick={handleRowEdit(row)} > <EditIcon fontSize="small" className={classes.editIcon} /></IconButton>}
                      {onDelete && <IconButton size="small" onClick={handleRowDelete(row)} > <DeleteIcon fontSize="small" className={classes.deleteIcon}/></IconButton>}
                    </span>
                  </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={3}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
       
      />
    </TableContainer>
       
    )
}

ActionableTable.propTypes = {
    columnMap: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    onEdit: PropTypes.func,
    odDelete: PropTypes.func
}

export const displayTypes = {
  date: "date",
  BoolSuccessFailed: "booleanSuccessFailed"
}

export default withStyles(styles)(ActionableTable);
