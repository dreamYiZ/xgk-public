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
  textIndent: '0px',
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


const PAYLOAD_IMAGE_ROLL = {
  images: ['/static/bg1.jpeg', '/static/bg2.jpeg', '/static/bg3.jpeg'],
  time: [6, 3, 1],
  fullscreen: false,
}

export const createBoxImageRoll = () => {
  return {
    ...createBoxPayload(),
    zIndex: 12,
    width: 360,
    height: 250,
    sub: {
      type: SUB_TYPE.IMAGE_ROLL,
      ...PAYLOAD_IMAGE_ROLL
    }
  }
}


const PAYLOAD_VIDEO_ROLL = {
  videoList: [],
  fullscreen: false,
}

export const createBoxVideoRoll = () => {
  return {
    ...createBoxPayload(),
    zIndex: 12,
    width: 360,
    height: 250,
    sub: {
      type: SUB_TYPE.VIDEO_ROLL,
      ...PAYLOAD_VIDEO_ROLL
    }
  }
}
