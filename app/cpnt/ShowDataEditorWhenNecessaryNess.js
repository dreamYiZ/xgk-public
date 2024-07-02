import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import SeriesRecordEdit from "./SeriesRecordEdit";
import ppplog from "ppplog";

export default function ShowDataEditorWhenNecessaryNess() {
  const [isOpen, setIsOpen] = React.useState(false);

  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [series, setSeries] = useState(null);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  useEffect(() => {
    if (sub) {
      if (sub?.series && Array.isArray(sub.series)) {
        setSeries(sub.series)
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
      changeById(activeBox.boxid, {
        ...activeBox,
        sub: {
          ...sub,
          series
        },
      });
    }
  }


  return (
    <div>
      <Button color="info" variant="outlined" onClick={toggleDrawer(true)}>编辑数据</Button>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)} >
        <Box sx={{ width: 650, padding: 2 }}>
          <Box>
            {series.map((seriesRecord, idx) => {

              return <SeriesRecordEdit seriesRecord={seriesRecord} key={idx} onUpdate={(updatedRecord) => handleUpdate(idx, updatedRecord)} />
            })}
          </Box>

          {/* 在这里添加你的内容 */}
          <div>
            <Button onClick={saveChange}>保存</Button>
            <Button onClick={toggleDrawer(false)}>关闭Drawer</Button>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}
