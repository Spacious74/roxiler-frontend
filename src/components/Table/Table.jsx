import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.css";
import BASE_URL from "../../config";

function Table({ searchText, month }) {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  //eslint-disable-next-line
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [load, setLoading] = useState(true);
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
    setLoading(true);
    let query = `${BASE_URL}/ecomm/api/v1/products/all`;

    if (searchText && month) {
      query = query + `?searchText=${searchText}&month=${month}`;
    } else if (searchText) {
      query = query + `?searchText=${searchText}`;
    } else if (month) {
      query = query + `?month=${month}`;
    }

    axios
      .get(query)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setLoading(false);
      });
  }, [searchText, month,]);

  const indexOfLastItem = data ? currentPage * itemsPerPage : 0;
  const indexOfFirstItem = data ? indexOfLastItem - itemsPerPage : 0;
  const currentItems = data && data.slice(indexOfFirstItem, indexOfLastItem);



  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (load) {
    return <p>Loading Data...</p>;
  }

  return (
    <div className="table-container">

      <div className="pagination-cont flex">
      <div className="tablehead">
        {month == 0 && "All month"}
        {months[month - 1]}'s transaction entries
      </div>
        <div className="pagebtns flex">
          <button onClick={prevPage} disabled={currentPage === 1}>
            <i className="fa-solid fa-chevron-left"></i> Previous
          </button>

          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          >
            Next <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length <= 0 ? (
            <tr className="notfound">
              <td><i class="fa-regular fa-folder-open"></i> Data not found</td>
            </tr>
          ) : (
            currentItems &&
            currentItems.map((item) => {
              return (
                <tr className="restRow" key={item.id}>
                  <td className="firstColumn">{item.id}</td>
                  <td className="title">{item.title.substring(0, 15)}...</td>
                  <td className="desc">
                    {item.description.substring(0, 20)}...
                  </td>
                  <td className="price">${item.price}</td>
                  <td className="category">{item.category}</td>
                  <td className="sold">
                    {item.sold === true ? "true" : "false"}
                  </td>
                  <td className="image">
                    <img src={item.image} alt="" className="tableimg" />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
