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
  const [slideIndex, setSlideIndex] = useState(1);
  let check = "Total";
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

  //Slider functionality
  if (slideIndex == 1) {
    console.log(slideIndex, check);
    check = "Total";
  } else if (slideIndex == 2) {
    check = "Delta";
    console.log(slideIndex, check);
  } else {
    check = "Delta7";
    console.log(slideIndex, check);
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

        {/* States Cards */}
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
                              <div className={styles.slider}>
                                <div
                                  className={styles.arrow}
                                  onClick={() =>
                                    setSlideIndex(
                                      slideIndex === 3 ? 1 : slideIndex + 1
                                    )
                                  }
                                >
                                  {slideIndex == 1 ? null : (
                                    <i className="fas fa-chevron-left"></i>
                                  )}
                                </div>
                                <div>
                                  <p className={styles.subname}>{check}</p>
                                  <p>
                                    Confirmed :{" "}
                                    {details[x].districts[y][
                                      check.toLowerCase()
                                    ] == undefined
                                      ? 0
                                      : details[x].districts[y][
                                          check.toLowerCase()
                                        ].confirmed
                                      ? details[x].districts[y][
                                          check.toLowerCase()
                                        ].confirmed
                                      : 0}
                                  </p>
                                  <p>
                                    Recovered :{" "}
                                    {details[x].districts[y][
                                      check.toLowerCase()
                                    ] == undefined
                                      ? 0
                                      : details[x].districts[y][
                                          check.toLowerCase()
                                        ].recovered
                                      ? details[x].districts[y][
                                          check.toLowerCase()
                                        ].recovered
                                      : 0}
                                  </p>
                                  <p>
                                    Deceased :{" "}
                                    {details[x].districts[y][
                                      check.toLowerCase()
                                    ] == undefined
                                      ? 0
                                      : details[x].districts[y][
                                          check.toLowerCase()
                                        ].deceased
                                      ? details[x].districts[y][
                                          check.toLowerCase()
                                        ].deceased
                                      : 0}
                                  </p>
                                </div>
                                <div
                                  className={styles.arrow}
                                  onClick={() =>
                                    setSlideIndex(
                                      slideIndex === 1 ? 3 : slideIndex - 1
                                    )
                                  }
                                >
                                  {slideIndex == 2 ? null : (
                                    <i class="fas fa-chevron-right"></i>
                                  )}
                                </div>
                              </div>
                            </>
                          );
                        }
                      })}
                      <div
                        onClick={() =>
                          setSlideIndex(slideIndex === 1 ? 3 : slideIndex - 1)
                        }
                      >
                        {slideIndex == 2 ? null : (
                          <i className="fas fa-chevron-right"></i>
                        )}
                      </div>
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
                                  <div className={styles.slider}>
                                    <div
                                      className={styles.arrow}
                                      onClick={() =>
                                        setSlideIndex(
                                          slideIndex === 3 ? 1 : slideIndex + 1
                                        )
                                      }
                                    >
                                      {slideIndex == 1 ? null : (
                                        <i className="fas fa-chevron-left"></i>
                                      )}
                                    </div>
                                    <div>
                                      <p className={styles.subname}>{check}</p>
                                      <p>
                                        Confirmed :{" "}
                                        {details[x].districts[y][
                                          check.toLowerCase()
                                        ] == undefined
                                          ? 0
                                          : details[x].districts[y][
                                              check.toLowerCase()
                                            ].confirmed
                                          ? details[x].districts[y][
                                              check.toLowerCase()
                                            ].confirmed
                                          : 0}
                                      </p>
                                      <p>
                                        Recovered :{" "}
                                        {details[x].districts[y][
                                          check.toLowerCase()
                                        ] == undefined
                                          ? 0
                                          : details[x].districts[y][
                                              check.toLowerCase()
                                            ].recovered
                                          ? details[x].districts[y][
                                              check.toLowerCase()
                                            ].recovered
                                          : 0}
                                      </p>
                                      <p>
                                        Deceased :{" "}
                                        {details[x].districts[y][
                                          check.toLowerCase()
                                        ] == undefined
                                          ? 0
                                          : details[x].districts[y][
                                              check.toLowerCase()
                                            ].deceased
                                          ? details[x].districts[y][
                                              check.toLowerCase()
                                            ].deceased
                                          : 0}
                                      </p>
                                    </div>
                                    <div
                                      className={styles.arrow}
                                      onClick={() =>
                                        setSlideIndex(
                                          slideIndex === 1 ? 3 : slideIndex - 1
                                        )
                                      }
                                    >
                                      {slideIndex == 2 ? null : (
                                        <i className="fas fa-chevron-right"></i>
                                      )}
                                    </div>
                                  </div>
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
                              value={districts}
                              onChange={(e) => setdistricts(e.target.value)}
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
                                      <div className={styles.slider}>
                                        <div
                                          className={styles.arrow}
                                          onClick={() =>
                                            setSlideIndex(
                                              slideIndex === 3
                                                ? 1
                                                : slideIndex + 1
                                            )
                                          }
                                        >
                                          {slideIndex == 1 ? null : (
                                            <i className="fas fa-chevron-left"></i>
                                          )}
                                        </div>
                                        <div>
                                          <p className={styles.subname}>
                                            {check}
                                          </p>
                                          <p>
                                            Confirmed :{" "}
                                            {details[x].districts[y][
                                              check.toLowerCase()
                                            ] == undefined
                                              ? 0
                                              : details[x].districts[y][
                                                  check.toLowerCase()
                                                ].confirmed
                                              ? details[x].districts[y][
                                                  check.toLowerCase()
                                                ].confirmed
                                              : 0}
                                          </p>
                                          <p>
                                            Recovered :{" "}
                                            {details[x].districts[y][
                                              check.toLowerCase()
                                            ] == undefined
                                              ? 0
                                              : details[x].districts[y][
                                                  check.toLowerCase()
                                                ].recovered
                                              ? details[x].districts[y][
                                                  check.toLowerCase()
                                                ].recovered
                                              : 0}
                                          </p>
                                          <p>
                                            Deceased :{" "}
                                            {details[x].districts[y][
                                              check.toLowerCase()
                                            ] == undefined
                                              ? 0
                                              : details[x].districts[y][
                                                  check.toLowerCase()
                                                ].deceased
                                              ? details[x].districts[y][
                                                  check.toLowerCase()
                                                ].deceased
                                              : 0}
                                          </p>
                                        </div>
                                        <div
                                          className={styles.arrow}
                                          onClick={() =>
                                            setSlideIndex(
                                              slideIndex === 1
                                                ? 3
                                                : slideIndex - 1
                                            )
                                          }
                                        >
                                          {slideIndex == 2 ? null : (
                                            <i className="fas fa-chevron-right"></i>
                                          )}
                                        </div>
                                      </div>
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
