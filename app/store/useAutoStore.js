import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';
import { CMD } from "../util/util";

export const PAGE_STORAGE_KEY = 'auto-storage';

export const AUTO_NEXT_PAGE = {
  be: {
    cmd: CMD.NEXT_PAGE
  },
  duration: 10,
  id: uuidv4(),
  disabled: true,
}

export const AUTO_NEXT_PAGE_CUSTOM = {
  be: {
    cmd: CMD.NEXT_PAGE_CUSTOM
  },
  duration: 10,
  booster: true,
  id: uuidv4(),
  disabled: true,
}

const useAutoStore = create(persist(
  (set, get) => ({
    autoList: [
      AUTO_NEXT_PAGE,
      AUTO_NEXT_PAGE_CUSTOM,
    ],
    setAutoList: (newAutoList) => set({ autoList: [...newAutoList] }),
    disableAutoNextPage: () => {
      const updatedAutoList = get().autoList.map(item => {
        if (item.be.cmd === CMD.NEXT_PAGE) {
          return { ...item, disabled: true };
        }
        return item;
      });
      set({ autoList: updatedAutoList });
    },
    enableAutoNextPage: () => {
      const updatedAutoList = get().autoList.map(item => {
        if (item.be.cmd === CMD.NEXT_PAGE) {
          return { ...item, disabled: false };
        }
        return item;
      });
      set({ autoList: updatedAutoList });
    },
    disableAutoNextPageCustom: () => {
      const updatedAutoList = get().autoList.map(item => {
        if (item.be.cmd === CMD.NEXT_PAGE_CUSTOM) {
          return { ...item, disabled: true };
        }
        return item;
      });
      set({ autoList: updatedAutoList });
    },
    enableAutoNextPageCustom: () => {
      const updatedAutoList = get().autoList.map(item => {
        if (item.be.cmd === CMD.NEXT_PAGE_CUSTOM) {
          return { ...item, disabled: false };
        }
        return item;
      });
      set({ autoList: updatedAutoList });
    }
  }),
  {
    name: PAGE_STORAGE_KEY,
    storage: createJSONStorage(() => localStorage),
  }
));

export default useAutoStore;
