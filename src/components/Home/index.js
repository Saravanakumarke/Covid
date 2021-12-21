import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  const [details, setDetails] = useState(null || {});
  const [searchvalue, setsearchvalue] = useState("");
  const [searchbydate, setsearchbydate] = useState(new Date());
  const [sortval, setsortval] = useState("asce");
  const [districts, setdistricts] = useState("");
  let data = [];

  useEffect(() => {
    const getdata = async () => {
      await fetch("https://data.covid19india.org/v4/min/data.min.json")
        .then((response) => response.json())
        .then((data) => setDetails(data));
    };

    getdata();
  }, []);

  let searchdata = [];
  data = Object.keys(details);

  const options = [
    { id: 1, Label: "Sort By", value: "" },
    { id: 2, Label: "Ascending", value: "asce" },
    { id: 3, Label: "Descending", value: "desce" },
  ];

  //Navigate to details page
  const handlepage = (x) => {
    console.log(details[x]);
    history.push({
      pathname: `/state/${x}`,
      state: details[x],
    });
  };

  //Search functionality
  if (searchvalue.length > 0) {
    searchdata = data.filter((x) => x == searchvalue.toUpperCase());
    console.log(searchdata);
  }

  let renderUI = () => {
    return (
      <div>
        <nav>
          <div className={styles.heading}>Covid Tracker - INDIA</div>
        </nav>
        <div className={styles.container}>
          <div className={styles.searchbar}>States</div>
          <div className={styles.searchbar}>
            <input
              type="text"
              className={styles.search}
              placeholder="Search Name…"
              value={searchvalue}
              onChange={(e) => setsearchvalue(e.target.value)}
            />
          </div>
          <div className={styles.searchbar}>
            <input
              type="date"
              className={styles.search}
              placeholder="Search Name…"
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
        </div>
        {searchvalue.length > 0 ? (
          <div className={styles.flexwrapper}>
            {searchdata.map((x, i) => {
              if (details[x].districts) {
                return (
                  <div className={styles.card}>
                    <div className={styles.heading}>
                      <p
                        className={styles.statename}
                        onClick={() => handlepage(x)}
                      >
                        {x}
                      </p>
                      <select
                        className={styles.selectone}
                        value={districts}
                        onChange={(e) => setdistricts(e.target.value)}
                      >
                        {Object.keys(details[x].districts).map((y) => {
                          return <option value={y}>{y}</option>;
                        })}
                      </select>
                    </div>

                    <div className={styles.content}>
                      {Object.keys(details[x].districts).map((y, index) => {
                        if (index == i) {
                          return (
                            <>
                              <p>
                                Confirmed :{" "}
                                {details[x].districts[y].total == undefined
                                  ? 0
                                  : details[x].districts[y].total.confirmed
                                  ? details[x].districts[y].total.confirmed
                                  : 0}
                              </p>
                              <p>
                                Recovered :{" "}
                                {details[x].districts[y].total == undefined
                                  ? 0
                                  : details[x].districts[y].total.recovered
                                  ? details[x].districts[y].total.recovered
                                  : 0}
                              </p>
                              <p>
                                Deceased :{" "}
                                {details[x].districts[y].total == undefined
                                  ? 0
                                  : details[x].districts[y].total.deceased
                                  ? details[x].districts[y].total.deceased
                                  : 0}
                              </p>
                            </>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <div className={styles.flexwrapper}>
            {sortval == "asce" || sortval == ""
              ? data.map((x, i) => {
                  if (details[x].districts) {
                    return (
                      <div className={styles.card}>
                        <div className={styles.heading}>
                          <p
                            className={styles.statename}
                            onClick={() => handlepage(x)}
                          >
                            {x}
                          </p>
                          <select
                            className={styles.selectone}
                            value={districts}
                            onChange={(e) => setdistricts(e.target.value)}
                          >
                            {Object.keys(details[x].districts).map((y) => {
                              return <option value={y}>{y}</option>;
                            })}
                          </select>
                        </div>

                        <div className={styles.content}>
                          {Object.keys(details[x].districts).map((y, index) => {
                            if (index == i) {
                              return (
                                <>
                                  <p>
                                    Confirmed :{" "}
                                    {details[x].districts[y].total == undefined
                                      ? 0
                                      : details[x].districts[y].total.confirmed
                                      ? details[x].districts[y].total.confirmed
                                      : 0}
                                  </p>
                                  <p>
                                    Recovered :{" "}
                                    {details[x].districts[y].total == undefined
                                      ? 0
                                      : details[x].districts[y].total.recovered
                                      ? details[x].districts[y].total.recovered
                                      : 0}
                                  </p>
                                  <p>
                                    Deceased :{" "}
                                    {details[x].districts[y].total == undefined
                                      ? 0
                                      : details[x].districts[y].total.deceased
                                      ? details[x].districts[y].total.deceased
                                      : 0}
                                  </p>
                                </>
                              );
                            }
                          })}
                        </div>
                      </div>
                    );
                  }
                })
              : data
                  .sort()
                  .reverse()
                  .map((x, i) => {
                    if (details[x].districts) {
                      return (
                        <div className={styles.card}>
                          <div className={styles.heading}>
                            <p
                              className={styles.statename}
                              onClick={() => handlepage(x)}
                            >
                              {x}
                            </p>
                            <select
                              className={styles.selectone}
                              value={sortval}
                              onChange={(e) => setsortval(e.target.value)}
                            >
                              {Object.keys(details[x].districts).map((y) => {
                                return <option value={y}>{y}</option>;
                              })}
                            </select>
                          </div>

                          <div className={styles.content}>
                            {Object.keys(details[x].districts).map(
                              (y, index) => {
                                if (index == i) {
                                  return (
                                    <>
                                      <p>
                                        Confirmed :{" "}
                                        {details[x].districts[y].total ==
                                        undefined
                                          ? 0
                                          : details[x].districts[y].total
                                              .confirmed
                                          ? details[x].districts[y].total
                                              .confirmed
                                          : 0}
                                      </p>
                                      <p>
                                        Recovered :{" "}
                                        {details[x].districts[y].total ==
                                        undefined
                                          ? 0
                                          : details[x].districts[y].total
                                              .recovered
                                          ? details[x].districts[y].total
                                              .recovered
                                          : 0}
                                      </p>
                                      <p>
                                        Deceased :{" "}
                                        {details[x].districts[y].total ==
                                        undefined
                                          ? 0
                                          : details[x].districts[y].total
                                              .deceased
                                          ? details[x].districts[y].total
                                              .deceased
                                          : 0}
                                      </p>
                                    </>
                                  );
                                }
                              }
                            )}
                          </div>
                        </div>
                      );
                    }
                  })}
          </div>
        )}
      </div>
    );
  };

  return <div>{details ? renderUI() : null}</div>;
}
