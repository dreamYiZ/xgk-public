import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';


// export const NEXT_MODE_PAGE = {
//   AUTO: 'AUTO',
//   CUSTOM: 'CUSTOM',
// }

const type_page = {
  bo: [],
  name: '',
  notChangeBg: false,
  nextTime: 10,
}

export const PAGE_STORAGE_KEY = 'page-storage';

const usePageStore = create(persist(
  (set, get) => ({
    pageList: [

    ],
    currentPage: null,
    currentPageId: null,
    // nextMode: NEXT_MODE_PAGE.AUTO,


    setPageList: (newPageList) => set({
      pageList: newPageList,
    }),

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
    storage: createJSONStorage(() => localStorage),
  }
));

export default usePageStore;
