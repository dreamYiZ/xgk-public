import { MAP_SUB_RENDER } from "./subRenderMap";

function subRender(sub, box) {
  const Component = MAP_SUB_RENDER[sub.type];
  if (Component) {
    return <Component sub={sub} box={box} />
  }

  return <div>
    TYPE NOT FOUND!{`[${sub.type}]`}
  </div>
}

export default subRender;
