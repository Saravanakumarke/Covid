import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
export default function Details(props) {
  const [statedetails, setstatedetails] = useState(null || {});
  const [searchbydate, setsearchbydate] = useState(new Date());
  const [sortval, setsortval] = useState("");
  const [sortdis, setsortdis] = useState("");
  const details = props.location.state;
  const statename = window.location.pathname.split("/")[2];
  const options = [
    { id: 1, Label: "Sort By", value: "" },
    { id: 2, Label: "Ascending", value: "asce" },
    { id: 3, Label: "Descending", value: "desce" },
  ];
  let searchdata = [];
  let data = [];

  useEffect(() => {
    const getdata = async () => {
      await fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
        .then((response) => response.json())
        .then((data) => setstatedetails(data));
    };
    getdata();
  }, []);

  if (statedetails[statename]) {
    localStorage.setItem(
      "State",
      JSON.stringify(Object.keys(statedetails[statename].dates))
    );
    data = localStorage.getItem("State");
    data = JSON.parse(data);
  }

  //Date Filter
  if (searchbydate.length > 0) {
    searchdata = Object.keys(statedetails[statename].dates).filter(
      (x) => x == searchbydate
    );
  }

  // Sorting Filter
  if (sortval == "asce") {
    data.sort(function (a, b) {
      return new Date(a) - new Date(b);
    });
  } else {
    data.sort(function (a, b) {
      return new Date(b) - new Date(a);
    });
  }
  let renderUI = () => {
    return (
      <div>
        {" "}
        <nav>
          <div className={styles.heading}>Covid Tracker - INDIA</div>
        </nav>
        <div className={styles.container}>
          <div className={styles.statename}>{statename}</div>
          <div className={styles.searchbar}>
            <input
              type="date"
              className={styles.search}
              value={searchbydate}
              onChange={(e) => setsearchbydate(e.target.value)}
            />
          </div>
          <div className={styles.searchbar}>
            <select
              className={styles.select}
              value={sortval}
              onChange={(e) => setsortval(e.target.value)}
            >
              {options.map((option) => {
                return <option value={option.value}>{option.Label}</option>;
              })}
            </select>
          </div>
          <div className={styles.searchbar}>
            <select
              className={styles.select}
              value={sortdis}
              onChange={(e) => setsortdis(e.target.value)}
            >
              {Object.keys(details["districts"]).map((option) => {
                return <option value={option}>{option}</option>;
              })}
            </select>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Confirmed</th>
                <th>Recovered</th>
                <th>Deceased</th>
                <th>Delta</th>
                <th>Delta7</th>
              </tr>
            </thead>
            {searchbydate.length > 0 ? (
              <tbody>
                {searchdata.length > 0 ? (
                  searchdata.map((x) => {
                    return (
                      <tr>
                        <td data-column="Date">{x}</td>
                        <td data-column="Confirmed">
                          {" "}
                          {statedetails[statename].dates[x].total == undefined
                            ? 0
                            : statedetails[statename].dates[x].total.confirmed
                            ? statedetails[statename].dates[x].total.confirmed
                            : 0}
                        </td>
                        <td data-column="Recovered">
                          {" "}
                          {statedetails[statename].dates[x].total == undefined
                            ? 0
                            : statedetails[statename].dates[x].total.recovered
                            ? statedetails[statename].dates[x].total.recovered
                            : 0}
                        </td>
                        <td data-column="Deceased">
                          {" "}
                          {statedetails[statename].dates[x].total == undefined
                            ? 0
                            : statedetails[statename].dates[x].total.deceased
                            ? statedetails[statename].dates[x].total.deceased
                            : 0}
                        </td>
                        <td data-column="Delta">
                          <p>
                            Confirmed :{" "}
                            {statedetails[statename].dates[x].delta == undefined
                              ? 0
                              : statedetails[statename].dates[x].delta.confirmed
                              ? statedetails[statename].dates[x].delta.confirmed
                              : 0}
                          </p>
                          <p>
                            Recovered :{" "}
                            {statedetails[statename].dates[x].delta == undefined
                              ? 0
                              : statedetails[statename].dates[x].delta.recovered
                              ? statedetails[statename].dates[x].delta.recovered
                              : 0}
                          </p>
                          <p>
                            Deceased :{" "}
                            {statedetails[statename].dates[x].delta == undefined
                              ? 0
                              : statedetails[statename].dates[x].delta.deceased
                              ? statedetails[statename].dates[x].delta.deceased
                              : 0}
                          </p>
                        </td>
                        <td data-column="Delta7">
                          <p>
                            Confirmed :{" "}
                            {statedetails[statename].dates[x].delta7 ==
                            undefined
                              ? 0
                              : statedetails[statename].dates[x].delta7
                                  .confirmed
                              ? statedetails[statename].dates[x].delta7
                                  .confirmed
                              : 0}
                          </p>
                          <p>
                            Recovered :{" "}
                            {statedetails[statename].dates[x].delta7 ==
                            undefined
                              ? 0
                              : statedetails[statename].dates[x].delta7
                                  .recovered
                              ? statedetails[statename].dates[x].delta7
                                  .recovered
                              : 0}
                          </p>
                          <p>
                            Deceased :{" "}
                            {statedetails[statename].dates[x].delta7 ==
                            undefined
                              ? 0
                              : statedetails[statename].dates[x].delta7.deceased
                              ? statedetails[statename].dates[x].delta7.deceased
                              : 0}
                          </p>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <>
                    <div className={styles.nodata}>No Data Found </div>
                  </>
                )}
              </tbody>
            ) : (
              <tbody>
                {data.map((x) => {
                  return (
                    <tr>
                      <td data-column="Date">{x}</td>
                      <td data-column="Confirmed">
                        {" "}
                        {statedetails[statename].dates[x].total == undefined
                          ? 0
                          : statedetails[statename].dates[x].total.confirmed
                          ? statedetails[statename].dates[x].total.confirmed
                          : 0}
                      </td>
                      <td data-column="Recovered">
                        {" "}
                        {statedetails[statename].dates[x].total == undefined
                          ? 0
                          : statedetails[statename].dates[x].total.recovered
                          ? statedetails[statename].dates[x].total.recovered
                          : 0}
                      </td>
                      <td data-column="Deceased">
                        {" "}
                        {statedetails[statename].dates[x].total == undefined
                          ? 0
                          : statedetails[statename].dates[x].total.deceased
                          ? statedetails[statename].dates[x].total.deceased
                          : 0}
                      </td>
                      <td data-column="Delta">
                        <p>
                          Confirmed :{" "}
                          {statedetails[statename].dates[x].delta == undefined
                            ? 0
                            : statedetails[statename].dates[x].delta.confirmed
                            ? statedetails[statename].dates[x].delta.confirmed
                            : 0}
                        </p>
                        <p>
                          Recovered :{" "}
                          {statedetails[statename].dates[x].delta == undefined
                            ? 0
                            : statedetails[statename].dates[x].delta.recovered
                            ? statedetails[statename].dates[x].delta.recovered
                            : 0}
                        </p>
                        <p>
                          Deceased :{" "}
                          {statedetails[statename].dates[x].delta == undefined
                            ? 0
                            : statedetails[statename].dates[x].delta.deceased
                            ? statedetails[statename].dates[x].delta.deceased
                            : 0}
                        </p>
                      </td>
                      <td data-column="Delta7">
                        <p>
                          Confirmed :{" "}
                          {statedetails[statename].dates[x].delta7 == undefined
                            ? 0
                            : statedetails[statename].dates[x].delta7.confirmed
                            ? statedetails[statename].dates[x].delta7.confirmed
                            : 0}
                        </p>
                        <p>
                          Recovered :{" "}
                          {statedetails[statename].dates[x].delta7 == undefined
                            ? 0
                            : statedetails[statename].dates[x].delta7.recovered
                            ? statedetails[statename].dates[x].delta7.recovered
                            : 0}
                        </p>
                        <p>
                          Deceased :{" "}
                          {statedetails[statename].dates[x].delta7 == undefined
                            ? 0
                            : statedetails[statename].dates[x].delta7.deceased
                            ? statedetails[statename].dates[x].delta7.deceased
                            : 0}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    );
  };
  return <div>{data ? renderUI() : null}</div>;
}
