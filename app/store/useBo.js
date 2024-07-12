import create from 'zustand'
import { persist } from 'zustand/middleware'

const useBoxStore = create(persist(
  (set, get) => ({
    boxArr: [],
    activeBoxId: null,  // Add this line
    setBoxArr: (_boxArr) => set((state) => ({ boxArr: _boxArr })),
    add: (box) => set((state) => {
      if (!Array.isArray(state.boxArr)) {
        return { boxArr: [box] };
      }
      return { boxArr: [...state.boxArr, box] };
    }),
    delById: (boxid) => set((state) => ({ boxArr: state.boxArr.filter((box) => box.boxid !== boxid) })),

    empty: () => set(() => ({ boxArr: [] })),
    isEmpty: () => {
      if (Array.isArray(get().boxArr)) {
        return get().boxArr.length === 0;
      } else {
        state().empty();
        return false;
      }
    },
    getActiveBox: () => get().boxArr.find((box) => box.boxid === get().activeBoxId),
    getById: (id) => get().boxArr.find((box) => box.boxid === id),
    changeById: (id, changes) => set((state) => ({
      boxArr: state.boxArr.map((box) => box.boxid === id ? { ...box, ...changes } : box)
    })),
    setActiveBoxId: (id) => set(() => ({ activeBoxId: id })),  // Add this line
    clearActiveId: () => set(() => ({ activeBoxId: null })), // Remove this line

  }),
  {
    name: 'box-storage', // unique name
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  }
));

export default useBoxStore;




const createBox = ({ boxid, position, zIndex, groupId, width, height, opacity, sub, x, y }) => {
  return {
    boxid,
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



