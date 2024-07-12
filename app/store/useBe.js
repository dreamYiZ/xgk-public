import { create } from 'zustand'


// run ={
//   cmd: CMD.XXX,
//   target: boxid,
//   time: timestamp
// }


const useEventStore = create((set) => ({
  eventArr: [],
  setEventArr: (_eventArr) => set((state) => ({ eventArr: _eventArr })),
  addEvent: (event) => set((state) => ({ eventArr: [...state.eventArr, event] })),
  delEventById: (id) => set((state) => ({ eventArr: state.eventArr.filter((event) => event.id !== id) })),
  emptyEvents: () => set((state) => ({ eventArr: [] })),
  addEventSortByTime: (event) => set((state) => ({
    eventArr: [...state.eventArr, event].sort(function (x, y) {
      return x.timestamp - y.timestamp;
    })
  })),

}))

export default useEventStore;
