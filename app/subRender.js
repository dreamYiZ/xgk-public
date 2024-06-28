import { SUB_TYPE } from "./util/util";

function subRender(sub) {
    if (sub.type === SUB_TYPE.TEXT) {
        return <div>
            {sub.content}
        </div>
    }

    return <div>
        TYPE NOT FOUND!
    </div>
}

export default subRender;