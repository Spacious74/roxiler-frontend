import React, { useEffect, useState } from "react";
import "./Stats.css";
import axios from "axios";
import BASE_URL from "../../config";

function Stats({ month }) {
  const [stats, setStats] = useState({});
  const months = [
    "January","February","March","April","May","June","July","August","September","October","November","December",
  ];
  useEffect(() => {
    let query = `${BASE_URL}/ecomm/api/v1/products/month`;
    if (month) {
      query += `?month=${month}`;
    }

    axios
      .get(query)
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err.message));
  },[month]);

  return (
    <div className="stats-cont">
      <div className="stathead">
        Statistics - {month == 0 && "All month"}
        {months[month - 1]}
      </div>

      <div className="stats-box flex">
        <div className="stats">
          <div className="value">
            ${stats.totalSale && stats.totalSale.toFixed(2)}
          </div>
          <div className="tag">Total Sale Amount</div>
        </div>
        <div className="stats">
          <div className="value">
            {stats.soldItems}
          </div>
          <div className="tag">Sold Items</div>
        </div>
        <div className="stats">
          <div className="value">
            {stats.unSoldItems}
          </div>
          <div className="tag">Unsold Items</div>
        </div>
        <div className="stats">
          <div className="value">
            {stats.unSoldItems + stats.soldItems}
          </div>
          <div className="tag">Total Items</div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
