import React, { useEffect } from "react";
import { createMarketList, createMarketTemplates, MAP_TYPE_FACTORY } from "../util/util";
import useMarket from "../store/useMarket";
import useBoxStore from "../store/useBo";
import { List, ListItem, ListItemText, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditTabContainer from "./editTabContainer";

function EditMarket() {
  const { setTemplates } = useMarket();
  const [marketList, setMarketList] = React.useState([]);
  const [filter, setFilter] = React.useState('');

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
    </EditTabContainer>
  );
}

export default EditMarket;
