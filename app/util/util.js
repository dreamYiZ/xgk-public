import { SUB_TYPE } from "./subType";
import { v4 as uuidv4 } from 'uuid';





export const createBoxPayload = (sub) => ({
    boxid: uuidv4(),
    position: 'absolute',
    zIndex: 1,
    groupId: 'group1',
    width: '100px',
    height: '100px',
    x: 0,
    y: 0,
    opacity: 1,
    sub: sub,
});

console.log('SUB_TYPE', SUB_TYPE);
export const createSubPayload = () => ({
    type: SUB_TYPE.TEXT,
    fontSize: '25px',
    fontWeight: 900,
    content: "Hello, world"
});







export { SUB_TYPE }
