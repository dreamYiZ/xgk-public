import { create } from 'zustand';
import { isDev } from "../util/util";
import moment from 'moment';

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
  addEventSortByTime: (event) => {
    set((state) => {
      const updatedEventArr = [...state.eventArr, event].sort((x, y) => x.time - y.time);
      if (isDev) {
        window.be = updatedEventArr;

        const currentTime = moment();
        const eventTime = moment(event.time);
        const secondsUntilEvent = eventTime.diff(currentTime, 'seconds');

        console.log(`Event will be triggered in ${secondsUntilEvent} seconds.`);
      }
      return { eventArr: updatedEventArr };
    });
  },
  consumeBe: () => set((state) => ({ eventArr: state.eventArr.slice(1) })),
}));

export default useEventStore;
