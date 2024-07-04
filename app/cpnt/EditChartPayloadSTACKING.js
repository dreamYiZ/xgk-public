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
import ChartLabelEdit from "./ChartLabelEdit";
import { BASIC_PAYLOAD_BAR_CHART } from "../util/util";

export default function EditChartPayload() {

  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [series, setSeries] = useState(null);
  const [colorArray, setColorArray] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const [labels, setLabels] = useState([]);



  useEffect(() => {
    ppplog('useEffect-sub')
    if (sub) {
      if (sub?.series && Array.isArray(sub.series)) {
        let _colorArray = [];
        sub.series.forEach(element => {
          if (element.color) {
            _colorArray.push(element.color);
          }
        });
        if (_colorArray.length) {
          setColorArray(_colorArray);
        }

        setLabels(sub.series.map(e=>e.label));
        setSeries(sub.series);
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
      ppplog('colorArray 1', colorArray)

      if (colorArray && Array.isArray(colorArray)) {
        ppplog('newSub colorArray', colorArray)

        newSub.series = newSub.series.map((s, idx) => {
          if (colorArray[idx]) {
            s.color = colorArray[idx];
          }
          return s;
        });

        newSub.series = newSub.series.map((s, idx) => {
          if (labels[idx]) {
            s.label = labels[idx];
          }
          return s;
        });
      }


      // if (newSub.xAxis && newSub.xAxis.length) {
      //   newSub.xAxis[0].data = labels;
      // }

      ppplog('newSub', newSub)

      changeById(activeBox.boxid, {
        ...activeBox,
        sub: newSub,
      });
    }
  }

  const addNewBarSeriesFromBasic = () => {
    setSeries(preSeries => {
      return [...preSeries, BASIC_PAYLOAD_BAR_CHART.series[0]]
    })
  }

  if (!series) {
    return null;
  }


  return (
    <ShowDataEditorWhenNecessaryNessLayout saveChange={saveChange}
      isOpen={isOpen}
      setIsOpen={setIsOpen}>

      <Box>
        {series.map((seriesRecord, idx) => {
          return <SeriesRecordEdit seriesRecord={seriesRecord} key={idx} onUpdate={(updatedRecord) => handleUpdate(idx, updatedRecord)} />
        })}
        <Box my={2}>

          <Button variant="contained" color="primary" onClick={addNewBarSeriesFromBasic}>
            添加新的系列
          </Button>
        </Box>

        <ChartColorEdit colorArray={colorArray} setColorArray={setColorArray} />

        <ChartLabelEdit
          barLabels={labels}
          setBarLabels={setLabels}
        />

      </Box>

    </ShowDataEditorWhenNecessaryNessLayout>
  );
}