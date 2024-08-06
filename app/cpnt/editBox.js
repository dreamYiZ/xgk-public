import useBoxStore from '../store/useBo';
import useGlobalStore from '../store/useGlobal';
import ppplog from "ppplog";
import EditSub from "./editSub";
import { TextField, Button, Autocomplete, FormControl, Switch, FormControlLabel } from '@mui/material';
import EditTabContainer from "./editTabContainer";
import Box from '@mui/material/Box';
import { useState, useEffect, useMemo, lazy } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FRAMEWORK_ID_SELECTOR } from "../util/util";
import { IconButton } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Typography from '@mui/material/Typography';
import { ANIMATE_CSS_CLASS, ANIMATE_CSS_CLASS_DISPLAY } from "../util/animateCssType";


const EditSubTypeDisplay = lazy(() => import("./EditSubTypeDisplay"));

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
    return boxArr.find((box) => box.boxid === localActiveBoxId);
  }, [boxArr, localActiveBoxId]);  // Recompute activeBox when boxArr or localActiveBoxId changes

  const handleInputChange = (event, property) => {
    changeById(activeBoxId, { [property]: event.target.value });
  };

  const handleSwitchChange = (event, property) => {
    changeById(activeBoxId, { [property]: event.target.checked });
  };


  const handleCenterClick = () => {
    changeById(activeBoxId, { x: screenWidth / 2, y: screenHeight / 2 });
  };

  const handleFocusClick = () => {
    const mainElement = document.querySelector(FRAMEWORK_ID_SELECTOR);  // 使用 id 来获取元素
    if (mainElement && activeBox) {
      let { x, y, height } = activeBox;
      // 如果 x, y, height 是字符串，则移除 'px' 并转换为数字
      x = typeof x === 'string' ? Number(x.replace('px', '')) : x;
      y = typeof y === 'string' ? Number(y.replace('px', '')) : y;
      height = typeof height === 'string' ? Number(height.replace('px', '')) : height;

      // 如果 x 或 y 为 0，则滚动到视野的顶部或左边
      const targetX = x === 0 ? 0 : x - screenWidth / 2;
      const targetY = y === 0 ? 0 : y - screenHeight / 2 + height / 2;

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

  const [open, setOpen] = useState(false);  // 新增状态变量

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    handleClickOpen();  // 打开弹窗
  };

  const handleConfirmDelete = () => {
    delById(activeBoxId);  // 删除元素
    handleClose();  // 关闭弹窗
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(activeBox.boxid);
  };

  const handleAnimateCssChange = (event, newValue) => {
    changeById(activeBoxId, { animateCssClass: newValue || '' });
  };

  return (
    <EditTabContainer>
      {activeBox ? (
        <>
          <br />

          <TextField
            label="Box ID"
            value={activeBox.boxid}
            onChange={(event) => handleInputChange(event, 'boxid')}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleCopyClick}>
                  <FileCopyIcon />
                </IconButton>
              ),
            }}
          />
          <br />

          <EditSubTypeDisplay />
          <TextField label="box名" value={activeBox.name} onChange={(event) => handleInputChange(event, 'name')} />
          <br />
          <br />

          <FormControlLabel
            control={
              <Switch
                checked={activeBox.disableMove}
                onChange={(event) => handleSwitchChange(event, 'disableMove')}
                name="disableMove"
                color="primary"
              />
            }
            label="固定位置"
          />
          <br />
          <br />


          <FormControlLabel
            control={
              <Switch
                checked={activeBox.hidden}
                onChange={(event) => handleSwitchChange(event, 'hidden')}
                name="hidden"
                color="primary"
              />
            }
            label="隐藏"
          />
          <br />
          <br />


          <TextField label="Z-层级" value={activeBox.zIndex} onChange={(event) => handleInputChange(event, 'zIndex')} />
          <br />
          <br />

          <TextField label="宽度" value={activeBox.width} onChange={(event) => handleInputChange(event, 'width')} />
          <br />
          <br />
          <TextField label="高度" value={activeBox.height} onChange={(event) => handleInputChange(event, 'height')} />
          <br />
          <br />
          <TextField label="透明度" value={activeBox.opacity} onChange={(event) => handleInputChange(event, 'opacity')} />
          <br />
          <br />
          <TextField label="x-横坐标" value={activeBox.x} onChange={(event) => handleInputChange(event, 'x')} />
          <br />
          <br />
          <TextField label="y-纵坐标" value={activeBox.y} onChange={(event) => handleInputChange(event, 'y')} />
          <br />
          <br />
          <Box>
            <TextField label="缩放" value={activeBox.scale} onChange={(event) => handleInputChange(event, 'scale')} />
          </Box>
          <br />
          <br />

          <Box mr={2} mb={2}> {/* 添加右边距 */}
            <FormControl variant="outlined" fullWidth>
              <Autocomplete
                id="animate-css-class"
                options={Object.values(ANIMATE_CSS_CLASS)}
                getOptionLabel={(option) => ANIMATE_CSS_CLASS_DISPLAY[option]}
                value={activeBox.animateCssClass}
                onChange={handleAnimateCssChange}
                renderInput={(params) => <TextField {...params} label="动画效果" variant="outlined" />}
                freeSolo
              />
            </FormControl>
          </Box>

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
                resize
              </Button>
            </Box>
          </Box>

          <EditSub />

          <Box sx={{ paddingTop: 1 }} />
          <Button variant="contained" color="error" onClick={handleDeleteClick}>
            删除
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            onKeyUp={(e) => {
              const ENTER = 13;
              if (e.keyCode === ENTER) {
                handleConfirmDelete();
              }
            }}
          >
            <DialogTitle>{"删除元素"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                确定要删除此元素吗?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>
                取消
              </Button>
              <Button onClick={handleConfirmDelete} color="error">
                确定
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <p style={{ opacity: .6 }}>没有选中的组件.</p>
      )}
    </EditTabContainer>
  );
}

export default EditBox;
