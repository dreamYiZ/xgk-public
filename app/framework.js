"use client";
import classes from "./layout.module.sass";
import ControlView from "./cpnt/controlView.js"
import useGlobalStore from './store/useGlobal';
import { MODE } from './store/useGlobal';
import { useEffect, useMemo, useState } from "react";
import useBoxStore from './store/useBo';
import { usePathname } from 'next/navigation';
import { FRAMEWORK_ID, addWindowErrorHandler } from "./util/util";
import ErrorBoundary from './cpnt/errorBoundary';
import useApiToRefreshData from "./hooks/useApiToRefreshData";

function Framework({ children }) {
  const [isClient, setIsClient] = useState(false)
  const [isManagePage, setIsManagePage] = useState(false);  // 新增的状态

  const { mode, scaleToFill, showWhenEditing } = useGlobalStore();
  const { clearActiveId } = useBoxStore();  // Access the 'boxArr' state


  useApiToRefreshData();

  // useEffect(() => {
  //   addWindowErrorHandler();
  //   return () => {
  //     window.onerror = null;  // 在组件卸载时删除错误处理器
  //   };
  // },[])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const pathname = usePathname()

  useEffect(() => {
    setIsManagePage(pathname.startsWith('/m'));  // 更新isManagePage状态
  }, [pathname]);

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

  if (isManagePage) {
    return <div className={classes['management']}>
      {children}
    </div>;
  }

  if (!isClient) {
    return '';
  }

  return (
    process.env.NODE_ENV === 'development' ? (
      <div className={classes['framework']}>
        <div id={`${FRAMEWORK_ID}`} className={pageContentClass} style={pageContentStyle}>
          {children}
        </div>
        <div className={controlPanelClass}>
          {showWhenEditing && <ControlView />}
        </div>
      </div>
    ) : (
      <ErrorBoundary>
        <div className={classes['framework']}>
          <div id={`${FRAMEWORK_ID}`} className={pageContentClass} style={pageContentStyle}>
            {children}
          </div>
          <div className={controlPanelClass}>
            {showWhenEditing && <ControlView />}
          </div>
        </div>
      </ErrorBoundary>
    )
  );

}

export default Framework;

