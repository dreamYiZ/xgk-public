import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import SeriesRecordEdit from "./SeriesRecordEdit";
import ppplog from "ppplog";
import ShowDataEditorWhenNecessaryNessLayout from "./ChartEditorLayout";
import ChartColorEdit from "./ChartColorEdit";
import EditPieShape from "./EditPieShape";

export default function ShowDataEditorWhenNecessaryNess({  isOpen
  , setIsOpen }) {

  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);


  const changeById = useBoxStore(state => state.changeById);
  const [shape, setShape] = useState({});

  const [series, setSeries] = useState(null);
  const [colorArray, setColorArray] = useState([]);



  useEffect(() => {
    ppplog('useEffect-sub')
    if (sub) {
      if (sub?.series && Array.isArray(sub.series)) {
        setSeries(sub.series)

        if (sub.series.length) {
          setShape({
            innerRadius: sub.series[0].innerRadius,
            outerRadius: sub.series[0].outerRadius,
            paddingAngle: sub.series[0].paddingAngle,
            cornerRadius: sub.series[0].cornerRadius,
            startAngle: sub.series[0].startAngle,
            endAngle: sub.series[0].endAngle,
            cx: sub.series[0].cx,
            cy: sub.series[0].cy,
          })

        }
      }

      if (sub.color && Array.isArray(sub.color)) {
        setColorArray(sub.color);
      }
    }
  }, [sub])

  if (!series) {
    return null;
  }


  // handleUpdate函数在父组件中定义
  function handleUpdate(index, updatedRecord) {

    ppplog('handleUpdate', index, updatedRecord);
    // 使用函数形式的setState，因为我们依赖于旧状态
    setSeries(oldSeries => {
      // 创建新数组以保持不变性
      const newSeries = [...oldSeries];
      // 更新特定索引处的记录
      newSeries[index] = { ...oldSeries[index], data: updatedRecord };
      return newSeries;
    });
  }


  const saveChange = () => {
    ppplog('series', series)



    if (sub) {
      let newSub = {
        ...sub,
        series
      }

      newSub.series = newSub.series.map(s => {
        s = { ...s, ...shape }
        return s;
      })
      ppplog('colorArray 1', colorArray)

      if (colorArray && Array.isArray(colorArray) && colorArray.length) {
        ppplog('newSub colorArray', colorArray)

        newSub.color = colorArray;
      }

      ppplog('newSub', newSub)

      changeById(activeBox.boxid, {
        ...activeBox,
        sub: newSub,
      });
    }
  }


  const submitShape = (_shape) => {
    let __shape = {};

    // List of fields to check in _shape
    const fields = ['innerRadius', 'outerRadius', 'paddingAngle', 'cornerRadius', 'startAngle', 'endAngle', 'cx', 'cy'];

    // Iterate over each field
    fields.forEach(field => {
      // Check if the field in _shape is a number or can be converted to a number
      if (!isNaN(Number(_shape[field]))) {
        // If it is, assign it to __shape as a number
        __shape[field] = Number(_shape[field]);
      }
    });

    // Call setShape with __shape
    setShape(__shape);
  }

  if (!series) {
    return null;
  }




  return (
    <ShowDataEditorWhenNecessaryNessLayout saveChange={saveChange}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >

      <Box>
        {series.map((seriesRecord, idx) => {

          return <SeriesRecordEdit seriesRecord={seriesRecord} key={idx} onUpdate={(updatedRecord) => handleUpdate(idx, updatedRecord)} />
        })}


        <ChartColorEdit colorArray={colorArray} setColorArray={setColorArray} />


        <EditPieShape shape={shape} submitShape={submitShape} />

      </Box>


    </ShowDataEditorWhenNecessaryNessLayout>
  );
}
