import create from 'zustand'
import { persist } from 'zustand/middleware'
const packageJson = require('../../package.json');

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
    bg: {
      type: BG_TYPE.IMAGE,
      filename: null,
    },
    mode: MODE.INIT,
    version: process.env.NEXT_PUBLIC_VERSION,
    screenWidth: '',
    screenHeight: '',
    tab: 0,  // Add this line
    isOpenSetting: false,
    setMode: (_mode) => set(() => ({ mode: _mode })),
    setScreenWidth: (_width) => set(() => ({ screenWidth: _width })),
    setScreenHeight: (_height) => set(() => ({ screenHeight: _height })),
    setTabValue: (_tab) => set(() => ({ tab: _tab })),  // Add this line
    setBoxArr: (_boxArr) => set((state) => ({ boxArr: _boxArr })),
    setModeToEdit: () => set(() => ({ mode: MODE.EDIT })),
    setModeToDisplay: () => set(() => ({ mode: MODE.DISPLAY })),
    setModeToTest: () => set(() => ({ mode: MODE.TEST })),
    hideWhenDisplaying: () => get().mode !== MODE.DISPLAY,
    showWhenEditing: () => get().mode === MODE.EDIT,
    setBg: (_bg) => set(() => ({ bg: _bg })),  // Add this line
    openSetting: () => set(() => ({ isOpenSetting: true })),  // Open the settings
    closeSetting: () => set(() => ({ isOpenSetting: false })),  // Close the settings
  }),
  {
    name: 'global-storage',
    getStorage: () => localStorage,
  }
));


export default useGlobalStore;
