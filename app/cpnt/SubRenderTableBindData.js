import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import 'animate.css';

export default function TableComponent({ box, sub }) {
  const {
    tableHeadArray = [],
    tableBodyArray = [],
    tableBodyColor: color,
    borderColor,
    tableHeadColor,
    tableHeadFontSize: headFontSize,
    tableBodyFontSize: fontSize,
    lineHeight,
  } = sub;

  const [currentTableData, setCurrentTableData] = useState(tableBodyArray);
  const [animateRowIndex, setAnimateRowIndex] = useState(null);
  const previousTableDataRef = useRef(tableBodyArray);
  const animationTimeoutRef = useRef(null);

  const [borderStyle, setBorderStyle] = useState({});

  useEffect(() => {
    const previousTableData = previousTableDataRef.current;

    const changedRowIndex = tableBodyArray.findIndex((row, index) => {
      if (!previousTableData[index]) return false;
      return row.some((cell, cellIndex) => cell !== previousTableData[index][cellIndex]);
    });

    if (changedRowIndex !== -1) {
      setAnimateRowIndex(changedRowIndex);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      animationTimeoutRef.current = setTimeout(() => {
        setAnimateRowIndex(null);
        setCurrentTableData(tableBodyArray);
      }, 600); // 1 second animation duration
    } else {
      setAnimateRowIndex(null);
      setCurrentTableData(tableBodyArray);
    }

    previousTableDataRef.current = tableBodyArray;
  }, [tableBodyArray]);

  useEffect(() => {
    const { showBorder } = sub;

    if (showBorder) {
      setBorderStyle({
        border: `1px solid ${borderColor}`,
        borderCollapse: 'collapse',
      });
    } else {
      setBorderStyle({});
    }
  }, [sub, borderColor]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div style={{ width: box.width, height: box.height }}>
      <table style={{ width: "100%", ...borderStyle }}>
        <thead>
          <tr>
            {tableHeadArray.map((th, idx) => (
              <th style={{ ...borderStyle, textAlign: "center", fontSize: `${headFontSize}px`, color: tableHeadColor }} key={idx}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((tr, idx) => (
            <tr key={idx} className={animateRowIndex === idx ? 'animate__animated animate__fadeOutUp' : ''}
              style={{ minHeight: `${lineHeight}px` }}>
              {tr.map((td, __idx) => (
                <td style={{ textAlign: "center", ...borderStyle }} key={__idx}>
                  <TableCellTd lineHeight={lineHeight} color={color} fontSize={fontSize}>{td}</TableCellTd>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TableCellTd = ({ children, lineHeight, color, fontSize }) => {
  return (
    <Box sx={{
      display: "block",
      minHeight: `${lineHeight}px`,
      lineHeight: `${lineHeight}px`,
      color,
      fontSize: `${fontSize}px`
    }}>
      {children}
    </Box>
  );
};
