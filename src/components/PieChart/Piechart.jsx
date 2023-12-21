import React, { useEffect, useState } from "react";
import "./Piechart.css";
import axios from "axios";
import BASE_URL from "../../config";
import {ResponsiveContainer, Tooltip, PieChart, Pie} from "recharts";

function Piechart({ month }) {
  const [showPie, setshowPie] = useState(false);
  const [data, setData] = useState([]);
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
    let query = `${BASE_URL}/ecomm/api/v1/products/pieChart`;

    if (month) {
      query += "?month=" + month;
    }

    axios
      .get(query)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err.message));

    // eslint-disable-next-line
  }, [month, showPie]);

  return (
    <div className="bar-container">
      <button
        className="chartBtn"
        onClick={() => {
          setshowPie(true);
        }}
      >
        <i className="fa-solid fa-chart-pie"></i> Pie Chart
      </button>

      {showPie && (
        <div className="outerchart flex">
          <div className="barChart piechart flex">
                <div className="head-close flex">
                    <div className="head">
                    Pie Chart for - {month == 0 && "All month"}
                    {months[month - 1]}
                    </div>
                    <button
                    className="closebtn"
                    onClick={() => {
                        setshowPie(false);
                    }}
                    >
                    <i class="fa-regular fa-circle-xmark"></i>
                    </button>
                </div>
                <ResponsiveContainer width="60%" aspect={1.5}>
                    <PieChart width={740} height={600}>
                        <Tooltip />
                        <Pie data={data} dataKey="count" nameKey="category" outerRadius={80} fill="#004fc5" label isAnimationActive={true} />
                    </PieChart>
                </ResponsiveContainer>
                <div className="chartdata flex">
                    {
                        data && data.map((items,i)=>{
                            return (
                                <div key={i}>
                                    <div className="value">{items.count}</div>
                                    <div className="tag">{items.category}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default Piechart;
