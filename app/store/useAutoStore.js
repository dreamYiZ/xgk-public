import create from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { CMD } from "../util/util"





export const PAGE_STORAGE_KEY = 'auto-storage';

const useAutoStore = create(persist(
  (set, get) => ({
    autoList: [
      {
        be: {
          cmd: CMD.NEXT_PAGE
        },
        duration: 10,
        id: uuidv4(),
        disabled: true,
      }
    ],
  }),
  {
    name: PAGE_STORAGE_KEY,
    getStorage: () => localStorage,
  }
));

export default useAutoStore;
