import useBoxStore from '../store/useBo';
import { useState, useMemo, useEffect } from 'react';
import { Box } from '@mui/system';
import DrawerEditLayout from "./DrawerEditLayout";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditOnClickEvent from "./EditOnClickEvent";
import ColorField from "./ColorField";
import ChooseImage from "./ChooseImage";
import { FONT_WEIGHT, BORDER_STYLE, TEXT_ALIGN } from "../util/constant";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputAdornment } from '@mui/material';
import {
  renderWithoutUnit, getUnitFromSomeSizeValue,
  setSomeSizeWithUnit
} from "../util/numberUtil";

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
  const [borderWidthUnit, setBorderWidthUnit] = useState('px');

  const [showEditOnClickEvent, setShowEditOnClickEvent] = useState(false);
  const [showSelectImage, setShowSelectImage] = useState(false);
  const [textIndent, setTextIndent] = useState(sub?.textIndent || '');
  const [textIndentUnit, setTextIndentUnit] = useState('px');


  const saveChange = () => {
    if (sub) {
      changeById(activeBox.boxid, {
        sub: {
          ...sub,
          buttonText,
          backgroundImage,
          backgroundColor,
          borderRadius: `${renderWithoutUnit(borderRadius)}${borderRadiusUnit}`,
          borderWidth: `${renderWithoutUnit(borderWidth)}${borderWidthUnit}`,
          borderStyle,
          borderColor,
          fontSize: `${renderWithoutUnit(fontSize)}${fontSizeUnit}`,
          fontWeight,
          textAlign,
          color,
          letterSpacing: `${renderWithoutUnit(letterSpacing)}${letterSpacingUnit}`,
          textIndent: `${renderWithoutUnit(textIndent)}${textIndentUnit}`,
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


      setLetterSpacingUnit(getUnitFromSomeSizeValue(letterSpacing));
      setBorderWidthUnit(getUnitFromSomeSizeValue(borderWidth));
      setFontSizeUnit(getUnitFromSomeSizeValue(fontSize));
      setBorderRadiusUnit(getUnitFromSomeSizeValue(borderRadius));
      setTextIndentUnit(getUnitFromSomeSizeValue(textIndent));
    }
  }, [activeBoxId]);

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

              label="按钮文本"
              value={buttonText}
              placeholder="请输入按钮文本"
              onChange={(event) => setButtonText(event.target.value)}
            />
          </Box>
          <Box mb={1}>
            <TextField
              fullWidth
              maxRows={10}
              multiline
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
          <Box mt={2}></Box>

          {backgroundImage && <img src={backgroundImage} alt="预览" style={{ maxWidth: '100px' }} />}

          <Box mt={2}></Box>

          <Box mb={2}>
            <ColorField label="背景颜色" value={backgroundColor} onChange={(event) => setBackgroundColor(event)} />
          </Box>
          <Box mb={2} sx={{ display: "flex" }}>
            <TextField

              label="边框半径"
              value={renderWithoutUnit(borderRadius)}
              placeholder="请输入边框半径"
              onChange={(event) => setBorderRadius(setSomeSizeWithUnit(event.target.value, borderRadiusUnit))}
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

              label="边框宽度"
              value={renderWithoutUnit(borderWidth)}
              placeholder="请输入边框宽度"
              onChange={(event) => setBorderWidth(setSomeSizeWithUnit(event.target.value, borderWidthUnit))}
              InputProps={{
                endAdornment: <UnitSuffix unit={borderWidthUnit} />,
              }}
            />

          </Box>
          <Box mb={2}>
            <Box>边框样式</Box>
            <Select

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
          <Box mb={2} sx={{ display: "flex" }}>
            <TextField
              label="字体大小"
              value={renderWithoutUnit(fontSize)}
              placeholder="请输入字体大小"
              onChange={(event) => setFontSize(setSomeSizeWithUnit(event.target.value, fontSizeUnit))}
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
            <Box>字体粗细</Box>

            <Select

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
            <Box>文本对齐</Box>
            <Select

              label="文本对齐"
              value={textAlign}
              onChange={(event) => setTextAlign(event.target.value)}
            >
              {Object.keys(TEXT_ALIGN).map((key) => (
                <MenuItem key={key} value={TEXT_ALIGN[key]}>
                  {TEXT_ALIGN[key]}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box mb={2}>
            <ColorField label="颜色" value={color} onChange={(event) => setColor(event)} />
          </Box>
          <Box mb={2} sx={{ display: "flex" }}>
            <TextField
              label="字母间距"
              value={renderWithoutUnit(letterSpacing)}
              placeholder="请输入字母间距"
              onChange={(event) => setLetterSpacing(setSomeSizeWithUnit(event.target.value, letterSpacingUnit))}
            />
            <Select
              value={letterSpacingUnit}
              onChange={(event) => setLetterSpacingUnit(event.target.value)}
            >
              <MenuItem value="px">px</MenuItem>
              <MenuItem value="em">em</MenuItem>

            </Select>
          </Box>

          <Box mb={2}>
            <TextField

              label="文本缩进"
              value={renderWithoutUnit(textIndent)}
              placeholder="请输入文本缩进"
              onChange={(event) => setTextIndent(setSomeSizeWithUnit(event.target.value, textIndentUnit))}
              InputProps={{
                endAdornment: <UnitSuffix unit={textIndentUnit} />,
              }}
            />
            <Select
              value={textIndentUnit}
              onChange={(event) => setTextIndentUnit(event.target.value)}
            >
              <MenuItem value="px">px</MenuItem>
              <MenuItem value="em">em</MenuItem>
              <MenuItem value="rem">rem</MenuItem>
              <MenuItem value="%">%</MenuItem>
            </Select>
          </Box>
        </Box>
      </DrawerEditLayout>
    </Box>
  );
}


