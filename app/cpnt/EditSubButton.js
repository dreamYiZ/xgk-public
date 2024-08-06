import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';
import DrawerEditLayout from "./DrawerEditLayout";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditOnClickEvent from "./EditOnClickEvent";
import ColorField from "./ColorField";
import ChooseImage from "./chooseImage";
import { FONT_WEIGHT, BORDER_STYLE } from "../util/constant";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputAdornment } from '@mui/material';

const UnitSuffix = ({ unit }) => (
  <InputAdornment position="end">{unit}</InputAdornment>
);

export default function EditButtonPayload() {
  const boxArr = useBoxStore((state) => state.boxArr);
  const activeBoxId = useBoxStore((state) => state.activeBoxId);
  const activeBox = useMemo(() => boxArr.find((box) => box.boxid === activeBoxId), [boxArr, activeBoxId]);
  const sub = useMemo(() => activeBox?.sub, [activeBox, activeBoxId]);
  const changeById = useBoxStore(state => state.changeById);

  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState(sub?.buttonText || '');
  const [backgroundImage, setBackgroundImage] = useState(sub?.backgroundImage || '');
  const [backgroundColor, setBackgroundColor] = useState(sub?.backgroundColor || '');
  const [borderRadius, setBorderRadius] = useState(sub?.borderRadius || '');
  const [borderRadiusUnit, setBorderRadiusUnit] = useState('px');
  const [borderWidth, setBorderWidth] = useState(sub?.borderWidth || '');
  const [borderStyle, setBorderStyle] = useState(sub?.borderStyle || '');
  const [borderColor, setBorderColor] = useState(sub?.borderColor || '');
  const [fontSize, setFontSize] = useState(sub?.fontSize || '');
  const [fontSizeUnit, setFontSizeUnit] = useState('px');
  const [fontWeight, setFontWeight] = useState(sub?.fontWeight || '');
  const [textAlign, setTextAlign] = useState(sub?.textAlign || '');
  const [color, setColor] = useState(sub?.color || '');
  const [letterSpacing, setLetterSpacing] = useState(sub?.letterSpacing || '');
  const [letterSpacingUnit, setLetterSpacingUnit] = useState('px');

  const [showEditOnClickEvent, setShowEditOnClickEvent] = useState(false);
  const [showSelectImage, setShowSelectImage] = useState(false);

  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          buttonText,
          backgroundImage,
          backgroundColor,
          borderRadius: `${borderRadius}${borderRadiusUnit}`,
          borderWidth,
          borderStyle,
          borderColor,
          fontSize: `${fontSize}${fontSizeUnit}`,
          fontWeight,
          textAlign,
          color,
          letterSpacing: `${letterSpacing}${letterSpacingUnit}`,
        },
      });
    }
  }

  useEffect(() => {
    if (sub) {
      setButtonText(sub.buttonText || '');
      setBackgroundImage(sub.backgroundImage || '');
      setBackgroundColor(sub.backgroundColor || '');
      setBorderRadius(sub.borderRadius || '');
      setBorderWidth(sub.borderWidth || '');
      setBorderStyle(sub.borderStyle || '');
      setBorderColor(sub.borderColor || '');
      setFontSize(sub.fontSize || '');
      setFontWeight(sub.fontWeight || '');
      setTextAlign(sub.textAlign || '');
      setColor(sub.color || '');
      setLetterSpacing(sub.letterSpacing || '');
    }
  }, [sub, activeBoxId]);

  const selectImage = () => {
    setShowSelectImage(true);
  }

  const handleChoose = ({ image }) => {
    setBackgroundImage(image);
    setShowSelectImage(false);
  }

  return (
    <Box my={2}>
      <EditOnClickEvent setShowEditOnClickEvent={setShowEditOnClickEvent}
        showEditOnClickEvent={showEditOnClickEvent} />

      <Box mt={1}></Box>

      <DrawerEditLayout saveChange={saveChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonText="编辑数据"
        title="按钮编辑"
      >
        <Box mb={2}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="按钮文本"
              value={buttonText}
              placeholder="请输入按钮文本"
              onChange={(event) => setButtonText(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="背景图片"
              value={backgroundImage}
              placeholder="请输入背景图片地址"
              onChange={(event) => setBackgroundImage(event.target.value)}
            />
          </Box>

          <Button component="span" onClick={selectImage}>
            选择图片
          </Button>
          <ChooseImage handleChoose={handleChoose} show={showSelectImage} handleClose={() => {
            setShowSelectImage(false);
          }} />

          <Box mb={2}>
            <ColorField label="背景颜色" value={backgroundColor} onChange={(event) => setBackgroundColor(event)} />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="边框半径"
              value={borderRadius}
              placeholder="请输入边框半径"
              onChange={(event) => setBorderRadius(event.target.value)}
              InputProps={{
                endAdornment: <UnitSuffix unit={borderRadiusUnit} />,
              }}
            />
            <Select
              value={borderRadiusUnit}
              onChange={(event) => setBorderRadiusUnit(event.target.value)}
            >
              <MenuItem value="px">px</MenuItem>
              <MenuItem value="em">em</MenuItem>
              <MenuItem value="rem">rem</MenuItem>
              <MenuItem value="%">%</MenuItem>
            </Select>
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="边框宽度"
              value={borderWidth}
              placeholder="请输入边框宽度"
              onChange={(event) => setBorderWidth(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Select
              fullWidth
              label="边框样式"
              value={borderStyle}
              onChange={(event) => setBorderStyle(event.target.value)}
            >
              {Object.keys(BORDER_STYLE).map((key) => (
                <MenuItem key={key} value={BORDER_STYLE[key]}>
                  {BORDER_STYLE[key]}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box mb={2}>
            <ColorField label="边框颜色" value={borderColor} onChange={(event) => setBorderColor(event)} />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="字体大小"
              value={fontSize}
              placeholder="请输入字体大小"
              onChange={(event) => setFontSize(event.target.value)}
            />
            <Select
              value={fontSizeUnit}
              onChange={(event) => setFontSizeUnit(event.target.value)}
            >
              <MenuItem value="px">px</MenuItem>
              <MenuItem value="em">em</MenuItem>
              <MenuItem value="rem">rem</MenuItem>
            </Select>
          </Box>
          <Box mb={2}>
            <Select
              fullWidth
              label="字体粗细"
              value={fontWeight}
              onChange={(event) => setFontWeight(event.target.value)}
            >
              {Object.keys(FONT_WEIGHT).map((key) => (
                <MenuItem key={key} value={FONT_WEIGHT[key]}>
                  {FONT_WEIGHT[key]}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="文本对齐"
              value={textAlign}
              placeholder="请输入文本对齐方式"
              onChange={(event) => setTextAlign(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <ColorField label="颜色" value={color} onChange={(event) => setColor(event)} />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="字母间距"
              value={letterSpacing}
              placeholder="请输入字母间距"
              onChange={(event) => setLetterSpacing(event.target.value)}
            />
            <Select
              value={letterSpacingUnit}
              onChange={(event) => setLetterSpacingUnit(event.target.value)}
            >
              <MenuItem value="px">px</MenuItem>
              <MenuItem value="em">em</MenuItem>

            </Select>
          </Box>
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}


