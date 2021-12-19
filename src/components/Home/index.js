import React, { useState, useEffect } from "react";
import Cards from "../Cards";
import styles from "./styles.module.css";

export default function Home() {
  const [details, setDetails] = useState(null || {});
  const [dataval, setdataval] = useState(null);
  useEffect(() => {
    const getdata = async () => {
      await fetch("https://data.covid19india.org/v4/min/data.min.json")
        .then((response) => response.json())
        .then((data) => setDetails(data));
    };

    getdata();
    //   getdataone();
  }, []);

  const options = [
    { id: 1, Label: "Sort By", value: "" },
    { id: 1, Label: "Ascending", value: "asce" },
    { id: 2, Label: "Descending", value: "desce" },
  ];
  const [searchvalue, setsearchvalue] = useState("");
  const [searchbydate, setsearchbydate] = useState(new Date());
  const [sortval, setsortval] = useState("");
  const onInputchange = (e) => {
    setsearchvalue(e.target.value);
  };
  const handledropdown = (e) => {
    setsortval(e.target.value);
  };
  const handledate = (e) => {
    setsearchbydate(e.target.value);
  };
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
            onChange={onInputchange}
            // onKeyDown={_onKeydown}
          />
        </div>
        <div className={styles.searchbar}>
          <input
            type="date"
            className={styles.search}
            placeholder="Search Name…"
            value={searchbydate}
            onChange={handledate}
          />
        </div>
        <div className={styles.searchbar}>
          <select
            className={styles.select}
            value={sortval}
            onChange={handledropdown}
          >
            {options.map((option) => {
              return <option value={option.value}>{option.Label}</option>;
            })}
          </select>
        </div>
      </div>

      {Object.keys(details).length > 0 ? (
        <div className={styles.flexwrapper}>
          {Object.keys(details).map((x) => (
            <div className={styles.card}>
              <div className={styles.heading}>
                <p className={styles.statename}>{x}</p>
                <select
                  className={styles.select}
                  // value={sortval}
                  // onChange={handledropdown}
                >
                  {details[x].districts.map((y) => {
                    return <option value={y}>{y}</option>;
                  })}
                </select>
              </div>
              <div className={styles.content}>
                <p>{details[x].delta.tested}</p>
                <p>SASASA</p>
                <p>SASASA</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
