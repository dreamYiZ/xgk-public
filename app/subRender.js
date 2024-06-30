import { SUB_TYPE } from "./util/util";
import SubRenderText from "./cpnt/subRenderText";

const MAP_SUB_RENDER = {
  [SUB_TYPE.TEXT]: SubRenderText
}


function subRender(sub) {
  const Component = MAP_SUB_RENDER[sub.type];
  if (Component) {
    return <Component {...sub} />
  }

  return <div>
    TYPE NOT FOUND!
  </div>
}

export default subRender;
