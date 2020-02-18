import React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 10,
    maxWidth: 5000,
    maxHeight: 200
  },
});

function createData(position: number, name: String, totalTime: number) {
    var convertedTime = Math.floor(totalTime/60)
    console.log(convertedTime)
    return { position, name, totalTime };
}

function createTime(totalTime: number) {
    var hours = Math.floor(totalTime / 3600)
    var inter = totalTime - hours * 3600 // inter has the seconds remaining minus number of hours
    var minutes = Math.floor(inter / 60)
    inter = inter - (minutes * 60) // inter has the seconds remaining minus minutes
    var seconds = Math.floor(inter)
    var milliseconds = Math.floor((inter - seconds) * 100)
    var text = hours + ":" + minutes + ":" + seconds + "." + milliseconds

    return text
}

function test() {
    var hours = 0
    return 0
}


const rows = [
  createData(0, 'V. Bottas', 5127.325),
  createData(1, 'L. Hamilton', 5148.211),
  createData(2, 'M. Verstappen', 5149.845),
  createData(3, 'S. Vettel', 5184.434),
  createData(4, 'C. Leclerc', 5185.555),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell align="left">Driver</TableCell>
            <TableCell align="right">Total Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.position}>
              <TableCell component="th" scope="row">
                {row.position}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right">{createTime(row.totalTime)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}