import useBoxStore from '../store/useBo';
import useGlobalStore from '../store/useGlobal';
import ppplog from "ppplog";
import EditSub from "./editSub";
import { TextField, Button } from '@mui/material';
import EditTabContainer from "./editTabContainer";

function EditBox() {
  const boxArr = useBoxStore((state) => state.boxArr);  // Access the 'boxArr' state
  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state
  const changeById = useBoxStore((state) => state.changeById);  // Access the 'changeById' function
  const { screenWidth, screenHeight } = useGlobalStore();  // Access the 'screenWidth' and 'screenHeight' states

  // Find the active box in the 'boxArr' array
  const activeBox = boxArr.find((box) => box.boxid === activeBoxId);

  ppplog('activeBox', '123', boxArr, activeBoxId, activeBox)

  const handleInputChange = (event, property) => {
    changeById(activeBoxId, { [property]: event.target.value });
  };

  const handleCenterClick = () => {
    changeById(activeBoxId, { x: screenWidth / 2, y: screenHeight / 2 });
  };

  return (
    <EditTabContainer>
      {activeBox ? (
        <>
          <h2>Active Box</h2>
          <br />

          <TextField label="Box ID" value={activeBox.boxid} onChange={(event) => handleInputChange(event, 'boxid')} />
          <br />
          <br />

          <TextField label="Z-Index" value={activeBox.zIndex} onChange={(event) => handleInputChange(event, 'zIndex')} />
          <br />
          <br />

          <TextField label="Width" value={activeBox.width} onChange={(event) => handleInputChange(event, 'width')} />
          <br />
          <br />
          <TextField label="Height" value={activeBox.height} onChange={(event) => handleInputChange(event, 'height')} />
          <br />
          <br />
          <TextField label="Opacity" value={activeBox.opacity} onChange={(event) => handleInputChange(event, 'opacity')} />
          <br />
          <br />
          <TextField label="X" value={activeBox.x} onChange={(event) => handleInputChange(event, 'x')} />
          <br />
          <br />
          <TextField label="Y" value={activeBox.y} onChange={(event) => handleInputChange(event, 'y')} />
          <br />
          <br />

          <Button variant="contained" color="primary" onClick={handleCenterClick}>
            居中
          </Button>

          <EditSub sub={activeBox.sub} activeBox={activeBox} />
        </>
      ) : (
        <p>No active box selected.</p>
      )}
    </EditTabContainer>
  );

}

export default EditBox;
