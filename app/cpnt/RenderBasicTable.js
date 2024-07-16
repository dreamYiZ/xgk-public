import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ChartMuiTheme from "./ChartMuiTheme";
import { useEffect, useState, useRef } from "react";


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable({
  sub
}) {

  const [tableData, setTableData] = useState([]);
  const [currentTableData, setCurrentTableData] = useState([]);
  const [displayDataLength, setDisplayDataLength] = useState(5);
  const [timeoutDuration, setTimeoutDuration] = useState(6);
  const currentIndex = useRef(0)
  const timeoutId = useRef(null)


  const { tableHead, data } = sub;

  useEffect(() => {

    let pageTotal = Math.ceil((tableData.length / displayDataLength));

    const refreshTableData = () => {

      if (currentIndex.current < pageTotal) {

      } else {
        currentIndex.current = 0;
      }
      let _displayData = tableData.slice(currentIndex.current * displayDataLength, (currentIndex.current + 1) * displayDataLength)

      setCurrentTableData(_displayData)

      timeoutId.current = setTimeout(() => {
        currentIndex.current++;
        refreshTableData()
      }, timeoutDuration * 1000);
    }



    refreshTableData();


    return () => {
      clearTimeout(timeoutId.current);
    }
  }, [tableData, displayDataLength, timeoutDuration])


  useEffect(() => {
    setTableData(sub?.data)
    currentIndex.current = 0;
  }, [sub?.tableHead, sub?.data])

  return (
    <ChartMuiTheme>

      <TableContainer component={Paper} sx={{ backgroundColor: "transparent", color: "#FFF" }}>
        <Table sx={{ minWidth: 150 }} aria-label="simple table">
          <TableHead>
            <TableRow>

              {tableHead.map((th, idx) => {
                if (idx === 0) {
                  return <TableCell key={idx}>{th}</TableCell>
                }
                return <TableCell key={idx} align="right">{th}</TableCell>
              })}
              {/* <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTableData.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {row.map((i, idx) => {
                  if (idx === 0) {
                    return <TableCell key={idx} component="th" scope="row">
                      {i}
                    </TableCell>
                  }
                  return <TableCell align="right" key={idx}>{i}</TableCell>
                })}
                {/* <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ChartMuiTheme>

  );
}
