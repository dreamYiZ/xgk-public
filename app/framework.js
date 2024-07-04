"use client";
import classes from "./layout.module.sass";
import ControlView from "./cpnt/controlView.js"
import useGlobalStore from './store/useGlobal';
import { MODE } from './store/useGlobal';
import { useEffect, useMemo } from "react";
import useBoxStore from './store/useBo';
import { usePathname } from 'next/navigation';

import { ppplog } from "./util/util";

function Framework({ children }) {
  const { mode, scaleToFill } = useGlobalStore();
  const { clearActiveId } = useBoxStore();  // Access the 'boxArr' state

  // todo: when scaleToFill=true and mode!== MODE.EDIT, make this [<div id="framework-to-put-main-render-box" className={pageContentClass} style={pageContentStyle}>]
  // overflow hidden

  // 根据 'mode' 的值动态地添加类名
  const controlPanelClass = `${classes['control-panel']} ${mode === MODE.EDIT ? 'control-panel-editing' : ''}`;
  const pageContentClass = `${classes['page-content']} ${mode === MODE.EDIT ? classes['editing'] : ''}`;

  // 根据 'mode' 和 'scaleToFill' 的值动态地设置样式
  const pageContentStyle = useMemo(() => {
    if (scaleToFill && mode !== MODE.EDIT) {
      return { overflow: 'hidden', left: '0px', width: '100vw', height: '100vh' };
    } else if (mode === MODE.EDIT) {
      return { left: '300px', width: 'calc(100vw - 300px)', height: '100vh' };
    } else {
      return { left: '0px', width: '100vw', height: '100vh' };
    }
  }, [mode, scaleToFill]);


  useEffect(() => {
    if (mode !== MODE.EDIT) {
      clearActiveId();
    }
  }, [mode]);


  const pathname = usePathname()


  // Check if pathname starts with '/m'
  if (pathname.startsWith('/m')) {
    return <div className={classes['management']}>
      {children}
    </div>;
  }

  return (
    <div className={classes['framework']}>
      <div id="framework-to-put-main-render-box" className={pageContentClass} style={pageContentStyle}>
        {children}
      </div>
      <div className={controlPanelClass}>
        <ControlView />
      </div>
    </div>
  );
}

export default Framework;
