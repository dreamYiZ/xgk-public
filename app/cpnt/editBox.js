import useBoxStore from '../store/useBo';
import useGlobalStore from '../store/useGlobal';
import ppplog from "ppplog";
import EditSub from "./editSub";
import { TextField, Button } from '@mui/material';
import EditTabContainer from "./editTabContainer";
import Box from '@mui/material/Box';
import { useState, useEffect, useMemo } from "react";

function EditBox() {
  const boxArr = useBoxStore((state) => state.boxArr);  // Access the 'boxArr' state
  const activeBoxId = useBoxStore((state) => state.activeBoxId);  // Access the 'activeBoxId' state
  const changeById = useBoxStore((state) => state.changeById);  // Access the 'changeById' function
  const delById = useBoxStore((state) => state.delById);  // Access the 'delById' function
  const { screenWidth, screenHeight } = useGlobalStore();  // Access the 'screenWidth' and 'screenHeight' states


  const [localActiveBoxId, setLocalActiveBoxId] = useState(activeBoxId);

  useEffect(() => {
    setLocalActiveBoxId(activeBoxId);
  }, [activeBoxId]);

  // Find the active box in the 'boxArr' array

  const activeBox = useMemo(() => {
    return boxArr.find((box) => box.boxid === activeBoxId);
  }, [boxArr, localActiveBoxId]);  // Recompute activeBox when boxArr or activeBoxId changes

  ppplog('activeBox', '123', boxArr, activeBoxId, activeBox)

  const handleInputChange = (event, property) => {
    changeById(activeBoxId, { [property]: event.target.value });
  };

  const handleCenterClick = () => {
    changeById(activeBoxId, { x: screenWidth / 2, y: screenHeight / 2 });
  };

  const handleFocusClick = () => {
    ppplog('聚焦')
    const mainElement = document.getElementById('framework-to-put-main-render-box');  // 使用 id 来获取元素
    if (mainElement && activeBox) {
      ppplog('聚焦2')
      ppplog(activeBox)

      let { x, y, height } = activeBox;
      // 如果 x, y, height 是字符串，则移除 'px' 并转换为数字
      x = typeof x === 'string' ? Number(x.replace('px', '')) : x;
      y = typeof y === 'string' ? Number(y.replace('px', '')) : y;
      height = typeof height === 'string' ? Number(height.replace('px', '')) : height;

      // 如果 x 或 y 为 0，则滚动到视野的顶部或左边
      const targetX = x === 0 ? 0 : x - screenWidth / 2;
      const targetY = y === 0 ? 0 : y - screenHeight / 2 + height / 2;

      ppplog(x, y, screenWidth, screenHeight, targetX, targetY)
      mainElement.scrollTo(targetX, targetY);  // 调整 y 值
    }
  };

  const handleAutoSizeClick = () => {
    const boxElement = document.getElementById(activeBox.boxid);
    if (boxElement) {
      const contentElement = boxElement.firstChild;
      if (contentElement) {
        const { width, height } = contentElement.getBoundingClientRect();
        changeById(activeBoxId, { width: `${width}px`, height: `${height}px` });
      }
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm('确定要删除此元素吗?')) {
      delById(activeBoxId);  // Delete the active box
    }
  };


  return (
    <EditTabContainer>
      {activeBox ? (
        <>
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

          <Box display="flex" alignItems="center">  {/* 设置为 flex 布局 */}
            <Box mr={2}>  {/* 添加右边距 */}
              <Button variant="contained" color="primary" onClick={handleCenterClick}>
                居中
              </Button>
            </Box>
            <Box mr={2}>  {/* 添加右边距 */}
              <Button variant="contained" color="secondary" onClick={handleFocusClick}>
                聚焦
              </Button>
            </Box>
            <Box mr={2}>  {/* 添加右边距 */}
              <Button variant="contained" color="success" onClick={handleAutoSizeClick}>  {/* 修改颜色为 'success' */}
                自动尺寸
              </Button>
            </Box>

          </Box>


          <EditSub />

          <br />
          <Button variant="contained" color="error" onClick={handleDeleteClick}>  {/* 修改颜色为 'error' */}
            删除
          </Button>
        </>
      ) : (
        <p>No active box selected.</p>
      )
      }
    </EditTabContainer >
  );

}

export default EditBox;