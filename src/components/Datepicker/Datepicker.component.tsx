import React, { useEffect, useState } from "react";
import { addDays, format, subDays, parse } from "date-fns";

const Datepicker = ({ dateValue, callback }) => {
  const dateFormat = "yyyy-MM-dd";

  // Parse the date value if it has a value. Otherwise, spawna datestamp for now.
  if (dateValue) {
    dateValue = parse(dateValue, dateFormat, new Date());
  }

  const [date, setDate] = useState(dateValue || new Date());

  const incrementDate = () => {
    setDate(addDays(date, 1));
  };

  const decrementDate = () => {
    setDate(subDays(date, 1));
  };

  const formatDate = () => {
    return format(date, dateFormat);
  };

  useEffect(() => {
    callback(format(date, dateFormat));
  }, [callback, date]);

  return (
    <div className="Datepicker">
      <span className="Datepicker-arrow" onClick={decrementDate}>
        &#9664;
      </span>
      <input type="text" value={formatDate()} readOnly />
      <span className="Datepicker-arrow" onClick={incrementDate}>
        &#9654;
      </span>
    </div>
  );
};

export default Datepicker;
