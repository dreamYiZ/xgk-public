import create from 'zustand'
import { persist } from 'zustand/middleware'


export const GLOBAL_STORAGE_KEY = 'global-storage'

export const BG_TYPE = {
  IMAGE: 'image',
  VIDEO: 'video',
}

export const MODE = {
  EDIT: 'edit',
  DISPLAY: 'display',
  TEST: 'test',
  LOADING: 'loading',
  INIT: 'init',
}

const useGlobalStore = create(persist(
  (set, get) => ({
    scaleToFill: false,
    themePaletteMode: 'dark',
    api: '',
    bg: {
      type: BG_TYPE.IMAGE,
      filename: null,
    },
    bgVideo: null,
    mode: MODE.INIT,
    version: process.env.NEXT_PUBLIC_VERSION,
    screenWidth: 1920,
    screenHeight: 1080,
    isFullScreenAutoBoolean: false,
    tab: 0,
    license: '',
    setMode: (_mode) => set(() => ({ mode: _mode })),
    setScreenWidth: (_width) => set(() => ({ screenWidth: _width })),
    setScreenHeight: (_height) => set(() => ({ screenHeight: _height })),
    setTabValue: (_tab) => set(() => ({ tab: _tab })),
    setBoxArr: (_boxArr) => set((state) => ({ boxArr: _boxArr })),
    setModeToEdit: () => set(() => ({ mode: MODE.EDIT })),
    setModeToDisplay: () => set(() => ({ mode: MODE.DISPLAY })),
    setModeToTest: () => set(() => ({ mode: MODE.TEST })),
    hideWhenDisplaying: () => get().mode !== MODE.DISPLAY,
    getIsTestOrDisplay: () => get().mode === MODE.DISPLAY || get().mode === MODE.TEST,
    showWhenEditing: () => get().mode === MODE.EDIT,
    setBg: (_bg) => set(() => ({ bg: _bg })),
    openSetting: () => set(() => ({ isOpenSetting: true })),
    closeSetting: () => set(() => ({ isOpenSetting: false })),
    setLicense: (license) => set(() => ({ license: license })),
    setThemePaletteMode: (_themePaletteMode) => set(() => ({ themePaletteMode: _themePaletteMode })),
    toggleScaleToFill: () => set((state) => ({ scaleToFill: !state.scaleToFill })),
    setApi: (api) => set(() => ({ api: api })),
    setBgVideo: (bgVideo) => set(() => ({ bgVideo: bgVideo })),
    setIsFullScreenAutoBoolean: (isFullScreenAuto) => set(() => ({ isFullScreenAutoBoolean: isFullScreenAuto })),
    setVersion: (version) => set(() => ({ version: version })),
    setGlobal: (global) => set(() => ({
      ...global
    }))
  }),
  {
    name: GLOBAL_STORAGE_KEY,
    getStorage: () => localStorage,
  }
));



export default useGlobalStore;
