import { useState, useRef, useEffect } from "react";
import { maybeNumberOr, ppplog, TIME_TYPE, MARQUEE_TYPE } from "../util/util";

export default function useRollOne(
  {
    data,
    perPage,
    timeDuration,
  }
) {


  const idTimeoutChangePageIndex = useRef(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [displayData, setDisplayData] = useState([]);


  useEffect(() => {
    if (data && Array.isArray(data)) {

      if (data.length < perPage) {
        setDisplayData(data);
      } else {
        if (currentPageIndex + perPage < data.length) {
          setDisplayData(data.slice(currentPageIndex, ((currentPageIndex) + perPage)));
        } else {
          setDisplayData([...data.slice(currentPageIndex, ((currentPageIndex) + perPage)),
          ...data.slice(0, (((currentPageIndex) + perPage - data.length)))
          ]);

        }
      }
    }

    return () => {

    }
  }, [data, perPage, currentPageIndex])



  useEffect(() => {
    if (data.length > perPage) {

      let nextPageFunc = () => {
        ppplog('currentPageIndex.current * perPage', currentPageIndex * perPage, data.length)
        // if (currentPageIndex * perPage < data.length) {
        //   setCurrentPageIndex(pre => pre + 1);
        // } else {
        //   setCurrentPageIndex(0);
        // }

        setCurrentPageIndex(pre => {
          if (pre + 1 < data.length) {
            return pre + 1;
          } else {
            return 0;
          }
        });



        idTimeoutChangePageIndex.current = setTimeout(() => {
          nextPageFunc();
        }, timeDuration * 1000)
      }



      idTimeoutChangePageIndex.current = setTimeout(() => {
        nextPageFunc();
      }, timeDuration * 1000)
      // nextPageFunc();
    }


    return () => {
      clearTimeout(idTimeoutChangePageIndex.current);
      setCurrentPageIndex(0);
    }
  }, [timeDuration, data])

  return {
    displayData

  }
}
