import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
export default function Details(props) {
  const [statedetails, setstatedetails] = useState(null || {});
  useEffect(() => {
    const getdata = async () => {
      await fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
        .then((response) => response.json())
        .then((data) => setstatedetails(data));
    };
    getdata();
  }, []);

  const details = props.location.state;
  const statename = window.location.pathname.split("/")[2];
  let data;
  data = Object.keys(statedetails[statename].dates);
  console.log(Object.keys(statedetails[statename].dates));
  const [searchbydate, setsearchbydate] = useState(new Date());
  const [sortval, setsortval] = useState("");
  const [sortdis, setsortdis] = useState("");
  const options = [
    { id: 1, Label: "Sort By", value: "asce" },
    { id: 2, Label: "Ascending", value: "asce" },
    { id: 3, Label: "Descending", value: "desce" },
  ];
  let searchdata = [];
  if (searchbydate.length > 0) {
    searchdata = Object.keys(statedetails[statename].dates).filter(
      (x) => x == searchbydate
    );
  }
  if (sortval == "asce") {
    data.sort(function (a, b) {
      return new Date(a) - new Date(b);
    });
    console.log(data);
  } else {
    data.sort(function (a, b) {
      return new Date(b) - new Date(a);
    });
    console.log(data);
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
                        <td>{x}</td>
                        <td>
                          {" "}
                          {statedetails[statename].dates[x].total == undefined
                            ? 0
                            : statedetails[statename].dates[x].total.confirmed
                            ? statedetails[statename].dates[x].total.confirmed
                            : 0}
                        </td>
                        <td>
                          {" "}
                          {statedetails[statename].dates[x].total == undefined
                            ? 0
                            : statedetails[statename].dates[x].total.recovered
                            ? statedetails[statename].dates[x].total.recovered
                            : 0}
                        </td>
                        <td>
                          {" "}
                          {statedetails[statename].dates[x].total == undefined
                            ? 0
                            : statedetails[statename].dates[x].total.deceased
                            ? statedetails[statename].dates[x].total.deceased
                            : 0}
                        </td>
                        <td>
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
                        <td>
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
                      <td>{x}</td>
                      <td>
                        {" "}
                        {statedetails[statename].dates[x].total == undefined
                          ? 0
                          : statedetails[statename].dates[x].total.confirmed
                          ? statedetails[statename].dates[x].total.confirmed
                          : 0}
                      </td>
                      <td>
                        {" "}
                        {statedetails[statename].dates[x].total == undefined
                          ? 0
                          : statedetails[statename].dates[x].total.recovered
                          ? statedetails[statename].dates[x].total.recovered
                          : 0}
                      </td>
                      <td>
                        {" "}
                        {statedetails[statename].dates[x].total == undefined
                          ? 0
                          : statedetails[statename].dates[x].total.deceased
                          ? statedetails[statename].dates[x].total.deceased
                          : 0}
                      </td>
                      <td>
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
                      <td>
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
