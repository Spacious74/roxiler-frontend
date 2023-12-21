import React, { useEffect, useState } from "react";
import "./Monthselec.css";

function Monthselec({onhandleMonthChange}) {
  const [selectedMonth, setSelectedMonth] = useState("");

  // eslint-disable-next-line
  useEffect(()=>{onhandleMonthChange(selectedMonth)},[selectedMonth])

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="select-cont">
      <select
        id="monthSelect"
        value={selectedMonth}
        onChange={handleMonthChange}
      >
        <option value="">All Months</option>
        {months.map((month, index) => (
          <option key={index} value={index+1}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Monthselec;
