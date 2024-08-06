import React, { useEffect, useState } from "react";
import { createMarketList, createMarketTemplates, MAP_TYPE_FACTORY } from "../util/util";
import useMarket from "../store/useMarket";
import useBoxStore from "../store/useBo";
import { List, ListItem, ListItemText, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditTabContainer from "./editTabContainer";
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import DragCreate from "./dragCreate";
import Box from '@mui/material/Box';
import { SUB_TYPE } from "../util/util";


function EditMarket() {
  const { setTemplates } = useMarket();
  const [marketList, setMarketList] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTemplates(createMarketTemplates());
    return () => { }
  }, [])

  useEffect(() => {
    setMarketList(createMarketList());
  }, [])

  const addNewBoxByType = (type) => {
    if (typeof MAP_TYPE_FACTORY[type] === 'function') {
      const newBox = MAP_TYPE_FACTORYtype;

      if (newBox.sub.type === SUB_TYPE.FABRIC_CANVAS) {
        if (
          useBoxStore.getState().boxArr.find(i => i.sub.type === SUB_TYPE.FABRIC_CANVAS)
        ) {
          alert("已存在Fabric画布")
        } else {
          useBoxStore.getState().add(newBox);
        }
      } else {
        useBoxStore.getState().add(newBox);
      }
    } else {
      setOpen(true);
      console.error(`No factory function found for type "${type}"`);
    }
  };

  const fuzzySearch = (text, search) => {
    const searchLower = search.toLowerCase();
    const textLower = text.toLowerCase();
    let searchIndex = 0;
    for (let i = 0; i < textLower.length; i++) {
      if (textLower[i] === searchLower[searchIndex]) {
        searchIndex++;
      }
      if (searchIndex === searchLower.length) {
        return true;
      }
    }
    return false;
  };

  return (
    <EditTabContainer>
      <Box sx={{
        display: "flex", flexDirection: 'column', maxHeight: "calc(-210px + 100vh)"
      }}>
        <Box>
          <br />
          <TextField label="筛选" value={filter} onChange={(event) => setFilter(event.target.value)} />
        </Box>
        <Box sx={{ paddingTop: 1 }} />
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <List>
            {marketList.filter(item => fuzzySearch(item.typeName, filter) || fuzzySearch(item.type, filter)).map((item) => (
              <ListItem key={item.type}>
                <ListItemText primary={`${item.typeName}`} />
                <DragCreate marketItem={item} setOpen={setOpen} />
                <IconButton onClick={() => addNewBoxByType(item.type)}>
                  <AddIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
          没有此组件构造方法
        </Alert>
      </Snackbar>
    </EditTabContainer>
  );
}

export default EditMarket;
