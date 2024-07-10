import React, { useEffect, useState } from "react";
import { createMarketList, createMarketTemplates, MAP_TYPE_FACTORY } from "../util/util";
import useMarket from "../store/useMarket";
import useBoxStore from "../store/useBo";
import { List, ListItem, ListItemText, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditTabContainer from "./editTabContainer";
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';


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
      const newBox = MAP_TYPE_FACTORY[type]();
      useBoxStore.getState().add(newBox);
    } else {
      setOpen(true);
      console.error(`No factory function found for type "${type}"`);
    }
  };


  return (
    <EditTabContainer>
      <br />
      <TextField label="筛选" value={filter} onChange={(event) => setFilter(event.target.value)} />
      <List>
        {marketList.filter(item => item.typeName.includes(filter) || item.type.includes(filter)).map((item) => (
          <ListItem key={item.type}>
            <ListItemText primary={`${item.typeName}`} />
            <IconButton onClick={() => addNewBoxByType(item.type)}>
              <AddIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
          没有此组件构造方法
        </Alert>
      </Snackbar>
    </EditTabContainer>
  );
}

export default EditMarket;
