import React, { useEffect, useState, useRef, memo } from 'react';
import Box from '@mui/material/Box';
import useBoxStore from '../store/useBo';
import useBeFactory from "../hooks/useBeFactory";
import VideoJS from './videoJsWrap'; // Assuming you have a VideoJS wrapper component
import { ANIMATE_TYPE_MARQUEE_IMAGE_VIDEO } from '../util/util'; // Your constants
import { ppplog, pxToNumber } from "../util/util";
import MarqueeImageVideoGoLeft from "./MarqueeImageVideoGoLeft";
import RenderSlowUp from "./RenderSlowUpContainer";
import RenderSlowUpTextItemTwoColumn from './RenderSlowUpTextItemTwoColumn';

const ANIMATION_INTERVAL = 100; // Adjust as needed, faster for smoother animation

const MemoizedRenderSlowUpTextItemTwoColumn = memo(RenderSlowUpTextItemTwoColumn);

export default function SubRenderSlowUpText({ box, sub }) {
  return (
    <div style={{ width: box.width, height: box.height, overflow: 'hidden', position: 'relative' }} >
      <RenderSlowUp animationTime={sub.animationTime} rowHeight={sub.rowHeight}>
        {sub.data.map(i => {
          return <MemoizedRenderSlowUpTextItemTwoColumn sub={sub} slowRow={i} key={i.id} />
        })}
      </RenderSlowUp>
    </div>
  );
}
