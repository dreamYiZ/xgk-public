import { MAP_SUB_RENDER } from "./subRenderMap";

function subRender(sub, box) {
  if (sub && MAP_SUB_RENDER.hasOwnProperty(sub.type)) {
    const Component = MAP_SUB_RENDER[sub.type];
    return <Component sub={sub} box={box} />;
  }

  return <div>
    TYPE NOT FOUND!{`[${sub?.type}]`}
  </div>;
}

export default subRender;
