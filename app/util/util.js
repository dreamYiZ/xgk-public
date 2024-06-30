import { SUB_TYPE, SUB_TYPE_DISPLAY, } from "./subType";
import { v4 as uuidv4 } from 'uuid';
import ppplog from "ppplog";
export { p } from "./cfg"




export const createBoxPayload = (sub) => ({
  boxid: uuidv4(),
  position: 'absolute',
  zIndex: 1,
  groupId: 'group1',
  width: '100px',
  height: '30px',
  x: 0,
  y: 0,
  opacity: 1,
  sub: sub,
});


export const createSubPayload = () => ({
  type: SUB_TYPE.TEXT,
  fontSize: '25px',
  fontWeight: 900,
  content: "Hello, world",
  color: '#FFFFFF',
});



export const createBoxText = () => {
  return createBoxPayload(createSubPayload())
}

export const createMarketList = () => {
  return Object.entries(SUB_TYPE).map(([type, value]) => {
    return {
      type: value,
      typeName: SUB_TYPE_DISPLAY[value],
    };
  });
};


export const MAP_TYPE_FACTORY = {
  [SUB_TYPE.TEXT]: createBoxText
};


export const createMarketTemplates = () => {
  return []
}

export { SUB_TYPE, ppplog }
