import React, { useState, useEffect } from "react";
import styles from "./style.module.css";

export default function Cards({ item, districts }) {
  const [details, setDetails] = useState(null || {});
  const [option, setoption] = useState(null || []);
  useEffect(() => {
    const getdata = async () => {
      await fetch("https://data.covid19india.org/v4/min/data.min.json")
        .then((response) => response.json())
        .then((data) => setDetails(data));
    };
    getdata();
  }, []);
  console.log(`${details}`);
  let temp = details;
  for (let key of Object.keys(details)) {
    console.log(`${key} => ${details.key}`);
  }
  let distemp = details.districts;
  //   for (let [key, value] of Object.entries(details.districts)) {
  //     console.log(key);
  //   }

  //   function handleoption() {
  //     let temp = Object.keys(details.districts);
  //     console.log(temp);
  //     //  temp.map((x, i) => {
  //     //    option.push({ value: x, label: x, id: i + 1 });
  //     //  });
  //   }
  //console.log(option);

  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        <p className={styles.statename}>{item}</p>
        <select
          className={styles.select}
          // value={sortval}
          // onChange={handledropdown}
        >
          {option.map((x) => {
            return <option value={x.value}>{x.Label}</option>;
          })}
        </select>
      </div>
      <div className={styles.content}>
        <p>SASASA</p>
        <p>SASASA</p>
        <p>SASASA</p>
      </div>
    </div>
  );
}
