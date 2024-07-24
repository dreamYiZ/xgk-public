import create from 'zustand';
import { persist } from 'zustand/middleware';
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

const useAutoStore = create(persist(
  (set, get) => ({
    autoList: [
      AUTO_NEXT_PAGE
    ],
    setAutoList: (newAutoList) => set({ autoList: [...newAutoList] }),
  }),
  {
    name: PAGE_STORAGE_KEY,
    getStorage: () => localStorage,
  }
));

export default useAutoStore;
