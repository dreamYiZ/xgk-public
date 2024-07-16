import React from 'react';
import { TIME_TYPE, MARQUEE_TYPE, ppplog } from "../util/util";
import classes from "./SubRenderMarquee.module.sass";
import { Box } from '@mui/system';  // 引入 Box 组件
import RenderBasicTable from "./RenderBasicTable";
import { useEffect, useState, useRef } from "react";

const TR_MIN_HEIGHT = 40;



export default function (
  { box, sub }

) {
  const { tableHead, pageRowCount, data, timeDuration } = sub;

  const tableData = data;


  const [currentTableData, setCurrentTableData] = useState([]);
  const currentIndex = useRef(0)
  const timeoutId = useRef(null)

  const [animateClassName, setAnimateClassName] = useState('');
  const [animateRestClassName, setRestAnimateClassName] = useState('');
  const [animateComeOnClassName, setComeOnAnimateClassName] = useState('');
  const [comeOnData, setComeOnData] = useState([]);

  const [borderStyle, setBorderStyle] = useState({
    // border: '1px solid black',
    // borderCollapse: 'collapse'
  })


  useEffect(() => {
    let pageTotal = Math.ceil((tableData.length / pageRowCount));

    const refreshTableData = (isFirst) => {

      if (currentIndex.current < tableData.length) {

      } else {
        currentIndex.current = 0;
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


      setTimeout(() => {
        setAnimateClassName('animate__animated');
        setRestAnimateClassName('animate__animated');
        setComeOnAnimateClassName('animate__animated');
        setComeOnData([]);

        let _displayData = tableData.slice(currentIndex.current, currentIndex.current + pageRowCount)
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
    }
  }, []);




  return <div style={{ width: box.width, height: box.height, }} >
    <table style={{ width: "100%", ...borderStyle }}>

      <tr>
        {tableHead.map((th, idx) => {
          return <th style={{ ...borderStyle, textAlign: "center" }} key={idx}>{th}</th>
        })}

      </tr>


      {currentTableData.map((tr, idx) => {

        if (idx === 0) {
          return <tr key={idx} className={animateClassName}
            style={{
              minHeight: `${TR_MIN_HEIGHT}px`,
            }}
          >
            {
              tr.map((td, __idx) => {
                return <td style={{ textAlign: "center", ...borderStyle }} key={__idx}>
                  <TableCellTd>{td}</TableCellTd>
                </td>
              })
            }
          </tr>
        }

        return <tr key={idx} className={animateRestClassName}
          style={{
            minHeight: `${TR_MIN_HEIGHT}px`,

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
                <TableCellTd>{td}</TableCellTd>
              </td>
            })
          }
        </tr>
      })}

      {
        comeOnData && comeOnData.length > 0 && <tr className={animateComeOnClassName}

          style={{
            minHeight: `${TR_MIN_HEIGHT}px`,

          }}
        >
          {
            comeOnData.map((td, __idx) => {
              return <td style={{
                textAlign: "center",
                transform: "translateY(-100%)",
                ...borderStyle

              }} key={__idx}>
                <TableCellTd>{td}</TableCellTd>
              </td>
            })
          }
        </tr >
      }

    </table >
  </div >
}


const TableCellTd = ({ children }) => {
  return <Box sx={{
    display: "block",
    minHeight: `${TR_MIN_HEIGHT}px`,
    lineHeight: `${TR_MIN_HEIGHT}px`,
  }}>
    {children}
  </Box>
}


