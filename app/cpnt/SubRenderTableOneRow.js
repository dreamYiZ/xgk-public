import React from 'react';
import { TIME_TYPE, MARQUEE_TYPE, ppplog } from "../util/util";
import classes from "./SubRenderMarquee.module.sass";
import RenderBasicTable from "./RenderBasicTable";
import { useEffect, useState, useRef } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';







export default function (
  { box, sub }

) {
  const { tableHead, pageRowCount, data: tableData, timeDuration, color, borderColor, headFontSize,

    fontSize, lineHeight, isEndFollowStart } = sub;



  const [currentTableData, setCurrentTableData] = useState([]);
  const currentIndex = useRef(0)
  const timeoutId = useRef(null)
  const animateTimeoutIdRef = useRef(null)

  const [animateClassName, setAnimateClassName] = useState('');
  const [animateRestClassName, setRestAnimateClassName] = useState('');
  const [animateComeOnClassName, setComeOnAnimateClassName] = useState('');
  const [comeOnData, setComeOnData] = useState([]);

  const [borderStyle, setBorderStyle] = useState({
    // border: `1px solid ${borderColor}`,
    // borderCollapse: 'collapse'

    // fontSize,

  })




  useEffect(() => {

    const refreshTableData = (isFirst) => {

      if (currentIndex.current < tableData.length) {

      } else {
        currentIndex.current = 0;
        isFirst = true;
      }



      if (!isFirst) {
        setAnimateClassName('animate__animated animate__fadeOutUp')
        setRestAnimateClassName(
          'animate__animated animate__slideOutUp visible-important'
        )

        setComeOnData(tableData[currentIndex.current + pageRowCount - 1])
        setComeOnAnimateClassName(
          'animate__animated animate__fadeInUp'
        )
      } else {
        let _displayData = tableData.slice(currentIndex.current, currentIndex.current + pageRowCount)
        setCurrentTableData(_displayData)
      }


      animateTimeoutIdRef.current = setTimeout(() => {
        setAnimateClassName('animate__animated');
        setRestAnimateClassName('animate__animated');
        setComeOnAnimateClassName('animate__animated');
        setComeOnData([]);

        let _displayData

        if (currentIndex.current + pageRowCount >= tableData.length) {

          if (isEndFollowStart) {

            _displayData = [...tableData.slice(currentIndex.current, tableData.length), ...tableData.slice(0, (currentIndex.current + pageRowCount) - tableData.length)]
          } else {
            _displayData = [...tableData.slice(currentIndex.current, tableData.length)]
          }


        } else {
          _displayData = tableData.slice(currentIndex.current, currentIndex.current + pageRowCount)

        }
        setCurrentTableData(_displayData)
      }, timeDuration * 1000 - 30)




      timeoutId.current = setTimeout(() => {
        currentIndex.current++;
        refreshTableData()
      }, timeDuration * 1000);
    }



    refreshTableData(true);


    return () => {
      clearTimeout(timeoutId.current);
      clearTimeout(animateTimeoutIdRef.current);
    }
  }, [sub]);




  return <div style={{ width: box.width, height: box.height, }} >
    <table style={{ width: "100%", ...borderStyle }}>

      <tr>
        {tableHead.map((th, idx) => {
          return <th style={{ ...borderStyle, textAlign: "center", fontSize: `${headFontSize}px` }} key={idx}>{th}</th>
        })}

      </tr>


      {currentTableData.map((tr, idx) => {

        if (idx === 0) {
          return <tr key={idx} className={animateClassName}
            style={{
              minHeight: `${lineHeight}px`,
            }}
          >
            {
              tr.map((td, __idx) => {
                return <td style={{ textAlign: "center", ...borderStyle }} key={__idx}>
                  <TableCellTd lineHeight={lineHeight} color={color} fontSize={fontSize}>{td}</TableCellTd>
                </td>
              })
            }
          </tr>
        }

        return <tr key={idx} className={animateRestClassName}
          style={{
            minHeight: `${lineHeight}px`,

          }}>
          {/* return <tr key={idx} > */}
          {
            tr.map((td, __idx) => {
              return <td
                style={{
                  textAlign: "center",
                  ...borderStyle
                }}
                key={__idx}>
                <TableCellTd lineHeight={lineHeight} color={color} fontSize={fontSize}>{td}</TableCellTd>
              </td>
            })
          }
        </tr>
      })}

      {
        comeOnData && comeOnData.length > 0 && <tr className={animateComeOnClassName}

          style={{
            minHeight: `${lineHeight}px`,

          }}
        >
          {
            comeOnData.map((td, __idx) => {
              return <td style={{
                textAlign: "center",
                transform: "translateY(-100%)",
                ...borderStyle
              }} key={__idx}>
                <TableCellTd lineHeight={lineHeight} color={color} fontSize={fontSize}>{td}</TableCellTd>
              </td>
            })
          }
        </tr >
      }

    </table >
  </div >
}


const TableCellTd = ({ children, lineHeight, color, fontSize }) => {
  return <Box sx={{
    display: "block",
    minHeight: `${lineHeight}px`,
    lineHeight: `${lineHeight}px`,
    color,
    fontSize: `${fontSize}px`
  }}>
    {children}
  </Box>
}


