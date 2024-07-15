import React, { useState, useEffect } from 'react';
import { TIME_TYPE, MARQUEE_TYPE, ppplog } from "../util/util";
import classes from "./SubRenderMarquee.module.sass";
import { Box } from '@mui/system';  // 引入 Box 组件
import RenderBasicTable from "./RenderBasicTable";

export default function (
  { box, sub }

) {


  return <div style={{ width: box.width, height: box.height, }} >
      <RenderBasicTable sub={sub} />
  </div>
}


