import React, { useState, useEffect } from 'react';
import { TIME_TYPE, TIME_TYPE_MOMENT, ppplog } from "../util/util";
import moment from 'moment';
import 'moment/locale/zh-cn';

export default function (
  { box, sub }

) {


  const [subStyle, setSubStyle] = useState({});
  const [timeType, setTimeType] = useState(TIME_TYPE.YYYY_MM_DD_HH_MM_SS);

  const [timeString, setTimeString] = useState('');



  useEffect(() => {

    if (sub.timeType) {
      setTimeType(sub.timeType)
    }

    const _subStyle = {
    }

    if (sub.color) {
      _subStyle.color = sub.color
    }
    if (sub.fontSize) {
      _subStyle.fontSize = `${sub.fontSize}px`
    }



    setSubStyle(_subStyle);

  }, [sub?.color, sub?.fontSize, sub?.timeType])


  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      let timeString;
      switch (timeType) {
        case TIME_TYPE.YYYY_MM_DD_HH_MM_SS:
          timeString = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}点${now.getMinutes()}分${now.getSeconds()}秒`;
          break;
        // Add more cases if you have other time formats
        default:
          timeString = now.toString();
      }

      if (Object.keys(TIME_TYPE_MOMENT).includes(timeType)) {


        moment.locale('cn');

        timeString = moment().format(TIME_TYPE_MOMENT[timeType]);;
      }


      setTimeString(timeString);
    }, 1000); // Update every second

    return () => {
      clearInterval(timer); // Clear the interval when the component unmounts
    }
  }, [timeType]);



  return <div style={{ width: box.width, height: box.height, ...subStyle }} >
    {timeString}
  </div>
}
