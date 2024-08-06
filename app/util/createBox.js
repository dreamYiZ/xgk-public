import { createBoxPayload, SUB_TYPE } from "./util";
import { TEXT_ALIGN, FONT_WEIGHT, BORDER_STYLE } from "./constant";

export * from "./createEchart";


const PAYLOAD_IFRAME = {
  src: null, // iframe 的 src 地址
}

export const createBoxIFrame = () => {
  return {
    ...createBoxPayload(),
    zIndex: 12,
    width: 600,
    height: 400,
    sub: {
      type: SUB_TYPE.IFRAME,
      ...PAYLOAD_IFRAME
    }
  }
}



const PAYLOAD_BUTTON = {
  backgroundImage: '/static/bg9.jpeg',
  backgroundColor: '#00aa00',
  borderRadius: '10px',
  borderWidth: '2px',
  borderStyle: BORDER_STYLE.solid,
  borderColor: '#000000',
  buttonText: '按钮',
  fontSize: '16px',
  fontWeight: FONT_WEIGHT.bold,
  textAlign: TEXT_ALIGN.center,
  color: '#ffffff',
  letterSpacing: '2px',
}

export const createBoxButton = () => {
  return {
    ...createBoxPayload(),
    zIndex: 12,
    width: 200,
    height: 120,
    sub: {
      type: SUB_TYPE.BUTTON,
      ...PAYLOAD_BUTTON
    }
  }
}
