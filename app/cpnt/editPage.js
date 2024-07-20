import useBoxStore from '../store/useBo';
import { List, ListItem, ListItemText } from '@mui/material';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import useGlobalStore from '../store/useGlobal';
import { SUB_TYPE_DISPLAY } from "../util/util";

function EditPage() {
  const boxArr = useBoxStore((state) => state.boxArr);  // Access the 'boxArr' state
  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state
  const setActiveBoxId = useBoxStore((state) => state.setActiveBoxId);  // Access the 'setActiveBoxId' function
  const setTabValue = useGlobalStore((state) => state.setTabValue);  // Access the 'setTabValue' function

  const handleEditClick = (boxid) => {
    setActiveBoxId(boxid);
    setTabValue(1);  // Switch to the "组件" tab
  };

  const handleItemClick = (boxid) => {
    setActiveBoxId(boxid);
  };

  return (
    <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 270px)' }}>
      <List>
        {boxArr.map((box) => (
          <ListItem key={box.boxid} >
            <ListItemText
              primary={`${SUB_TYPE_DISPLAY[box?.sub?.type]}:${box?.name?.slice(0,10)}: ${box.boxid}`}
              style={{ color: box.boxid === activeBoxId ? '#7CB9E8' : 'black', cursor: 'pointer' }}
              onClick={() => handleItemClick(box.boxid)}
            />
            <IconButton onClick={() => handleEditClick(box.boxid)}>
              <EditIcon style={{ cursor: 'pointer' }} />
            </IconButton>

          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default EditPage;
