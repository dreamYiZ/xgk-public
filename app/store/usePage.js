import create from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';



const type_page = {
  bo: [],
  name: ''
}

export const PAGE_STORAGE_KEY = 'page-storage';

const useBoxStore = create(persist(
  (set, get) => ({
    pageList: [

    ],
    currentPage: null,
    currentPageId: null,

    addPage: (page) => set(state => ({
      pageList: [...state.pageList, page],
      currentPage: page,
      currentPageId: page.id,
    })),

    getPageById: (id) => {
      const page = get().pageList.find(page => page.id === id);
      return page;
    },

    getFirstPage: () => {
      const firstPage = get().pageList[0];
      return firstPage;
    },

    deletePageById: (id) => set(state => {
      const updatedPageList = state.pageList.filter(page => page.id !== id);
      return {
        pageList: updatedPageList,
      };
    }),

    deleteAllPages: () => set({
      pageList: [],
      currentPage: null,
      currentPageId: null,
    }),
    updatePageOrder: (updatedPageList) => set({ pageList: updatedPageList }),

    updatePageName: (id, newName) => set(state => ({
      pageList: state.pageList.map(page =>
        page.id === id ? { ...page, name: newName } : page
      )
    })),
    updatePage: (id, updatedData) => set(state => ({
      pageList: state.pageList.map(page =>
        page.id === id ? { ...page, ...updatedData } : page
      ),
      currentPage: { ...get().currentPage, ...updatedData }
    })),
  }),
  {
    name: PAGE_STORAGE_KEY,
    getStorage: () => localStorage,
  }
));

export default useBoxStore;
