import { create } from 'zustand'

const useEventStore = create((set) => ({
  eventArr: [],
  setEventArr: (_eventArr) => set((state) => ({ eventArr: _eventArr })),
  addEvent: (event) => set((state) => ({ eventArr: [...state.eventArr, event] })),
  delEventById: (id) => set((state) => ({ eventArr: state.eventArr.filter((event) => event.id !== id) })),
  emptyEvents: () => set((state) => ({ eventArr: [] })),
}))

export default useEventStore;
