import { SUB_TYPE } from "./util/util";
import SubRenderText from "./cpnt/subRenderText";
import SubRenderImage from "./cpnt/subRenderImage";

const MAP_SUB_RENDER = {
  [SUB_TYPE.TEXT]: SubRenderText,
  [SUB_TYPE.IMAGE]: SubRenderImage
}


function subRender(sub, box) {
  const Component = MAP_SUB_RENDER[sub.type];
  if (Component) {
    return <Component {...sub} box={box} />
  }

  return <div>
    TYPE NOT FOUND!
  </div>
}

export default subRender;
