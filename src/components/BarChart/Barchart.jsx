import React, { useEffect, useState } from "react";
import "./Barchart.css";
import axios from "axios";
import BASE_URL from "../../config";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Barchart({ month }) {
  const [showBar, setShowBar] = useState(false);
  const [data, setData] = useState([]);
  const [forData, setForData] = useState([]);
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
  useEffect(() => {
    let query = `${BASE_URL}/ecomm/api/v1/products/barChart`;

    if (month) {
      query += "?month=" + month;
    }

    axios
      .get(query)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err.message));

    const convertDataFormat = (data) => {
      const new_data = [];

      for (let i = 0; i < data.length; i++) {
        if (typeof data[i].priceRange === "string") {
          new_data.push(data[i]);
        } else {
          const currentRange = data[i].priceRange;
          const nextRange = data[i].priceRange + 100;
          if (
            typeof currentRange === "number" &&
            typeof nextRange === "number"
          ) {
            const newRange = `${currentRange}-${nextRange}`;
            new_data.push({ count: data[i].count, priceRange: newRange });
          }
        }
      }

      setForData(new_data);
    };
    convertDataFormat(data);
    // eslint-disable-next-line
  }, [month, showBar]);

  return (
    <div className="bar-container">
      <button
        className="chartBtn"
        onClick={() => {
          setShowBar(true);
        }}
      >
        <i className="fa-solid fa-chart-simple"></i> Bar Graph
      </button>

      {showBar && (
        <div className="outerchart flex">
          <div className="barChart flex">
            <div className="head-close flex">
              <div className="head">
                Bar Graph for - {month == 0 && "All month"}
                {months[month - 1]}
              </div>
              <button
                className="closebtn"
                onClick={() => {
                  setShowBar(false);
                }}
              >
                <i class="fa-regular fa-circle-xmark"></i>
              </button>
            </div>
            <div className="xtag">No. of items</div>
            <div className="ytag">Price ranges</div>
            <ResponsiveContainer width="80%" aspect={2}>
              <BarChart data={forData} width={740} height={500}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priceRange" />
                <YAxis dataKey="count" />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#004fc5"
                  label={{ fill: "#ffffff", fontSize: 20 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default Barchart;
