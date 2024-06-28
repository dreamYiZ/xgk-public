import create from 'zustand'
import { persist } from 'zustand/middleware'

const useBoxStore = create(persist(
  (set, get) => ({
    boxArr: [],
    setBoxArr: (_boxArr) => set((state) => ({ boxArr: _boxArr })),
    add: (box) => set((state) => {
      if (!Array.isArray(state.boxArr)) {
        return { boxArr: [box] };
      }
      return { boxArr: [...state.boxArr, box] };
    }),
    delById: (id) => set((state) => ({ boxArr: state.boxArr.filter((box) => box.id !== id) })),
    empty: () => set(() => ({ boxArr: [] })),
    isEmpty: (state) => {
      if (Array.isArray(get().boxArr)) {
        return get().boxArr.length === 0;
      } else {
        state.empty();
        return false;
      }
    },
    changeById: (id, changes) => set((state) => ({
      boxArr: state.boxArr.map((box) => box.id === id ? { ...box, ...changes } : box)
    })),
  }),
  {
    name: 'box-storage', // unique name
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  }
))

export default useBoxStore;




const createBox = ({ position, zIndex, groupId, width, height, opacity, sub, x, y }) => {
  return {
    position,
    zIndex,
    groupId,
    width,
    height,
    opacity,
    x, y,
    sub,
  };
};

export {
  createBox
};



