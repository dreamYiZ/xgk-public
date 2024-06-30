import create from 'zustand'
import { persist } from 'zustand/middleware'
const packageJson = require('../../package.json');



const BG_TYPE = {
    IMAGE: 'image',
    VIDEO: 'video',
}

const MODE = {
    EDIT: 'edit',
    DISPLAY: 'display',
    TEST: 'test',
}

const useGlobalStore = create(persist(
    (set, get) => ({
        bg: {
            type: BG_TYPE.IMAGE
        },
        mode: MODE.EDIT,  // 默认为 'edit' 模式
        version: process.env.NEXT_PUBLIC_VERSION,
        setMode: (_mode) => set(() => ({ mode: _mode })),  // 添加一个新的动作来更新 'mode' 状态
        setBoxArr: (_boxArr) => set((state) => ({ boxArr: _boxArr })),
        setModeToEdit: () => set(() => ({ mode: MODE.EDIT })),  // 快捷动作，将 'mode' 状态改为 'edit'
        setModeToDisplay: () => set(() => ({ mode: MODE.DISPLAY })),  // 快捷动作，将 'mode' 状态改为 'display'
        setModeToTest: () => set(() => ({ mode: MODE.TEST })),  // 快捷动作，将 'mode' 状态改为 'test'
        hideWhenDisplaying: () => get().mode !== MODE.DISPLAY,  // 当模式为 'display' 时返回 true，否则返回 false

    }),

    {
        name: 'global-storage', // unique name
        getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
    }
))

export default useGlobalStore;
