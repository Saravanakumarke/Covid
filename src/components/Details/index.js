import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
export default function Details() {
  const [details, setDetails] = useState(null || {});
  useEffect(() => {
    const getdata = async () => {
      await fetch("https://data.covid19india.org/v4/min/data.min.json")
        .then((response) => response.json())
        .then((data) => setDetails(data));
    };
    getdata();
  }, []);

  let states = Object.keys(details);
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
      {" "}
      <nav>
        <div className={styles.heading}>Covid Tracker - INDIA</div>
      </nav>
      <div className={styles.container}>
        <div className={styles.searchbar}>TN</div>
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
          <tbody>
            <tr>
              <td data-column="First Name">James</td>
              <td data-column="Last Name">Matman</td>
              <td data-column="Job Title">Chief Sandwich Eater</td>
              <td data-column="Twitter">@james</td>
              <td data-column="Job Title">
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
              </td>
              <td data-column="Twitter">
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
              </td>
            </tr>
            <tr>
              <td data-column="First Name">Andor</td>
              <td data-column="Last Name">Nagy</td>
              <td data-column="Job Title">Designer</td>
              <td data-column="Twitter">@andornagy</td>
              <td data-column="Job Title">
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
              </td>
              <td data-column="Twitter">
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
              </td>
            </tr>
            <tr>
              <td data-column="First Name">Tamas</td>
              <td data-column="Last Name">Biro</td>
              <td data-column="Job Title">Game Tester</td>
              <td data-column="Twitter">@tamas</td>
              <td data-column="Job Title">
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
              </td>
              <td data-column="Twitter">
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
              </td>
            </tr>
            <tr>
              <td data-column="First Name">Zoli</td>
              <td data-column="Last Name">Mastah</td>
              <td data-column="Job Title">Developer</td>
              <td data-column="Twitter">@zoli</td>
              <td data-column="Job Title">
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
              </td>
              <td data-column="Twitter">
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
              </td>
            </tr>
            <tr>
              <td data-column="First Name">Szabi</td>
              <td data-column="Last Name">Nagy</td>
              <td data-column="Job Title">Chief Sandwich Eater</td>
              <td data-column="Twitter">@szabi</td>
              <td data-column="Job Title">
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
              </td>
              <td data-column="Twitter">
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
                <p>dawclloekdoe</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
