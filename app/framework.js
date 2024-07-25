"use client"
// src/components/Framework.js
import React, { useEffect, useRef, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import ControlView from "./cpnt/controlView.js"
import useGlobalStore from './store/useGlobal';
import useBoxStore from "./store/useBo";
import { MODE } from './store/useGlobal';
import { usePathname } from 'next/navigation';
import { xgkConsole, FRAMEWORK_ID } from "./util/util";
import ErrorBoundary from './cpnt/errorBoundary';
import useApiToRefreshData from "./hooks/useApiToRefreshData";
import { FabricProvider } from './context/FabricContext';
import * as fabric from 'fabric'; // v6
import classes from "./layout.module.sass";

const ANIMATION_INTERVAL = 100; // Adjust as needed, faster for smoother animation

function Framework({ children }) {
  const [isClient, setIsClient] = useState(false);
  const [isManagePage, setIsManagePage] = useState(false);
  const { mode, isFullScreenAutoBoolean, showWhenEditing, getIsTestOrDisplay } = useGlobalStore();
  const { clearActiveId } = useBoxStore();
  const [isTestOrDisplay, setIsTestOrDisplay] = useState(true);
  const [frameworkStyle, setFrameworkStyle] = useState({});
  const pathname = usePathname();
  const canvasEl = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);

  useApiToRefreshData();

  useEffect(() => {
    setIsTestOrDisplay(getIsTestOrDisplay());
  }, [mode]);

  useEffect(() => {
    let _style = {};
    if (!isTestOrDisplay) {
      _style.backgroundColor = '#FFFFFF';
    }
    setFrameworkStyle(_style);
  }, [isTestOrDisplay]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setIsManagePage(pathname.startsWith('/m'));
  }, [pathname]);

  useEffect(() => {
    if (mode !== MODE.EDIT) {
      clearActiveId();
    }
  }, [mode]);

  useEffect(() => {
    xgkConsole();
  }, []);

  useEffect(() => {
    const options = {};
    const canvas = new fabric.Canvas(canvasEl.current, options);
    setFabricCanvas(canvas);

    return () => {
      setFabricCanvas(null);
      canvas.dispose();
    };
  }, []);

  const controlPanelClass = `${classes['control-panel']} ${mode === MODE.EDIT ? 'control-panel-editing' : ''}`;
  const pageContentClass = `${classes['page-content']} ${mode === MODE.EDIT ? classes['editing'] : ''}`;

  const pageContentStyle = useMemo(() => {
    if (isFullScreenAutoBoolean && mode !== MODE.EDIT) {
      return { overflow: 'hidden', left: '0px', width: '100vw', height: '100vh' };
    } else if (mode === MODE.EDIT) {
      return { left: '300px', width: 'calc(100vw - 300px)', height: '100vh' };
    } else {
      return { left: '0px', width: '100vw', height: '100vh' };
    }
  }, [mode, isFullScreenAutoBoolean]);

  if (isManagePage) {
    return <div className={classes['management']}>{children}</div>;
  }

  if (!isClient) {
    return '';
  }

  return (
    process.env.NODE_ENV === 'development' ? (
      <FabricProvider>
        <div className={classes['framework']} style={{ ...frameworkStyle }}>
          <div id={`${FRAMEWORK_ID}`} className={pageContentClass} style={pageContentStyle}>
            {children}
          </div>
          <div className={controlPanelClass}>
            {showWhenEditing && <ControlView />}
          </div>
        </div>
      </FabricProvider>
    ) : (
      <ErrorBoundary>
        <FabricProvider>
          <div className={classes['framework']} style={{ ...frameworkStyle }}>
            <div id={`${FRAMEWORK_ID}`} className={pageContentClass} style={pageContentStyle}>
              {children}
            </div>
            <div className={controlPanelClass}>
              {showWhenEditing && <ControlView />}
            </div>
          </div>
        </FabricProvider>
      </ErrorBoundary>
    )
  );
}

export default Framework;
