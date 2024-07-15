import React, { useState, useEffect } from 'react';
import { TIME_TYPE } from "../util/util";
import SubRenderVideojs from "./subRenderVideojs"

export default function (
  { box, sub }

) {


  return <div style={{ width: box.width, height: box.height, }} >
    <SubRenderVideojs sub={sub} />
  </div>
}
