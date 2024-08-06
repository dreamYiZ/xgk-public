import { createBoxPayload, SUB_TYPE } from "./util";

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
