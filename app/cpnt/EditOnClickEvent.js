import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import ChartEditorLayout from "./DrawerEditLayout";
import EditOnClickEventItem from "./EditOnClickEventItem";
import { v4 as uuidv4 } from 'uuid';
import { CMD_TIME } from "../util/util";


export default function EditOnClickEvent() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = React.useState(false);
  const [beList, setBeList] = useState([]);

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          be: beList
        },
      });
    }
  };

  useEffect(() => {
    if (sub?.be) {
      if (Array.isArray(sub.be)) {
        setBeList(sub.be);
      }
    }
  }, [sub?.be]);

  const addNewBeFromEmpty = () => {
    setBeList(prev => {
      const _newBe = {
        id: uuidv4(),
        time: CMD_TIME.NOW,
        target: null,
        code: null,
      };
      return [...prev, _newBe];
    });
  };

  const updateBeItem = (updatedBeItem) => {
    setBeList(prev => prev.map(be => be.id === updatedBeItem.id ? updatedBeItem : be));
  };

  return (
    <ChartEditorLayout saveChange={saveChange} isOpen={isOpen} setIsOpen={setIsOpen} buttonText="点击事件">
      <Box sx={{ padding: 2 }}>
        {beList.map(beItem => (
          <EditOnClickEventItem
            key={beItem.id}
            beItem={beItem}
            updateBeItem={updateBeItem}
            updateBeList={setBeList}
          />
        ))}
      </Box>
      <Button onClick={addNewBeFromEmpty} variant="contained">添加新事件</Button>
      <Box mb={2} />
    </ChartEditorLayout>
  );
}
