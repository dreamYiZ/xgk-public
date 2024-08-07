import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const BOX_STORAGE_KEY = 'box-storage';

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

    hideBoxById: (id) => set((state) => ({
      boxArr: state.boxArr.map((box) => box.boxid === id ? { ...box, hidden: true } : box)
    })),
    showBoxById: (id) => set((state) => ({
      boxArr: state.boxArr.map((box) => box.boxid === id ? { ...box, hidden: false } : box)
    })),
    toggleShowHideBoxById: (id) => set((state) => ({
      boxArr: state.boxArr.map((box) => box.boxid === id ? { ...box, hidden: !box.hidden } : box)
    })),

  }),
  {
    name: BOX_STORAGE_KEY, // unique name
    storage: createJSONStorage(() => localStorage),
  }
));

export default useBoxStore;

// 参考：
// export const createBoxPayload = (sub) => ({
//   boxid: uuidv4(),
//   position: 'absolute',
//   zIndex: 1,
//   groupId: 'group1',
//   width: '100px',
//   height: '30px',
//   x: 0,
//   y: 0,
//   disableMove: false,
//   disableResize: false,

//   hidden: false,
//   opacity: 1,
//   sub: sub,
// });



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



