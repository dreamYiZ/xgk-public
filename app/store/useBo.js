import { create } from 'zustand'

const useBoxStore = create((set) => ({
  boxArr: [],
  setBoxArr: (_boxArr) => set((state) => ({ boxArr: _boxArr })),
  add: (box) => set((state) => ({ boxArr: [...state.boxArr, box] })),
  delById: (id) => set((state) => ({ boxArr: state.boxArr.filter((box) => box.id !== id) })),
  empty: () => set((state) => ({ boxArr: [] })),
}))

export default useBoxStore;


const createBox = ({ position, zIndex, groupId, width, height, opacity, sub }) => {
  return {
    position,
    zIndex,
    groupId,
    width,
    height,
    opacity,
    sub,
  };
};

export {
  createBox
};



