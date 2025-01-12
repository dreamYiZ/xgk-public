import useBoxStore from '../store/useBo';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useGlobalStore from '../store/useGlobal';
import { SUB_TYPE_DISPLAY } from "../util/util";

function EditPage() {
  const boxArr = useBoxStore((state) => state.boxArr);  // Access the 'boxArr' state
  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state
  const setActiveBoxId = useBoxStore((state) => state.setActiveBoxId);  // Access the 'setActiveBoxId' function
  const setTabValue = useGlobalStore((state) => state.setTabValue);  // Access the 'setTabValue' function
  const { changeById } = useBoxStore();

  const handleEditClick = (boxid) => {
    setActiveBoxId(boxid);
    setTabValue(1);  // Switch to the "组件" tab
  };

  const handleItemClick = (boxid) => {
    setActiveBoxId(boxid);
  };

  const handleToggleHidden = (boxid, hidden) => {
    changeById(boxid, { hidden: !hidden });
  };

  return (
    <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 270px)' }}>
      <List>
        {boxArr.map((box) => (
          <ListItem key={box.boxid}>
            <IconButton onClick={() => handleToggleHidden(box.boxid, box.hidden)}>
              {box.hidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
            <ListItemText
              primary={`${SUB_TYPE_DISPLAY[box?.sub?.type]}:${(box?.name || '').slice(0, 10)}: ${box.boxid}`}
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
