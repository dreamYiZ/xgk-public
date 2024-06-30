import { SUB_TYPE } from "../util/util";

import EditSubText from "./editSubText";

const MAP_SUB_EDIT = {
  [SUB_TYPE.TEXT]: EditSubText
}

function EditSub({ sub, activeBox }) {
  const Component = MAP_SUB_EDIT[sub.type];
  if (Component) {
    return <Component sub={sub} activeBox={activeBox} />
  }

  return <div>
    TYPE NOT FOUND!
  </div>
}

export default EditSub;
