import React, { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const {
    dataAll,
    uniqueSessions,
    uniqueZones,
    uniqueIndustries,
    uniqueTags,
    filter,
    setFilter,
    setDataFiltered,
    setDataOrdered,
  } = useContext(PressReaderContext);

  // Functions to handle the onChange events in the Form
  const selectSession = (e) => {
    setFilter({
      ...filter,
      session: [...e.target.selectedOptions].map((a) => a.value),
    });
  };

  const selectStartDate = (e) => {
    setFilter({ ...filter, startDate: e.target.value });
  };

  const selectEndDate = (e) => {
    setFilter({ ...filter, endDate: e.target.value });
  };

  const selectZonesOR = (e) => {
    setFilter({
      ...filter,
      zonesOR: [...e.target.selectedOptions].map((a) => a.value),
    });
  };

  const selectZonesAND = (e) => {
    setFilter({
      ...filter,
      zonesAND: [...e.target.selectedOptions].map((a) => a.value),
    });
  };

  const selectSectorsOR = (e) => {
    setFilter({
      ...filter,
      sectorsOR: [...e.target.selectedOptions].map((a) => a.value),
    });
  };

  const selectSectorsAND = (e) => {
    setFilter({
      ...filter,
      sectorsAND: [...e.target.selectedOptions].map((a) => a.value),
    });
  };

  const selectTagsOR = (e) => {
    setFilter({
      ...filter,
      tagsOR: [...e.target.selectedOptions].map((a) => a.value),
    });
  };

  const selectTagsAND = (e) => {
    setFilter({
      ...filter,
      tagsAND: [...e.target.selectedOptions].map((a) => a.value),
    });
  };

  const handleTextChange = (e) => {
    setFilter({ ...filter, text: e.target.value });
  };

  // Logic of the filter
  const compose =
    (...fns) =>
    (x) =>
      fns.reduceRight((g, f) => f(g), x);

  // const trace = (value) => {
  //   console.log(value);
  //   return value;
  // };

  const applySessionFilter = ({ data, selection }) => {
    const filtered = data.filter((a) =>
      selection.session !== "all" ? selection.session.includes(a.session) : true
    );
    return { filtered, selection };
  };

  const applyTimeRangeFilter = ({ filtered: data, selection }) => {
    const startDate = !!selection.startDate
      ? selection.startDate
      : "0000-00-00";
    const endDate = !!selection.endDate ? selection.endDate : "9999-12-31";

    const filtered = data.filter(
      (a) => a.date >= startDate && a.date <= endDate
    );
    return { filtered, selection };
  };

  const logicFilter = (item, selection, target, type) => {
    const prop = target + type;

    if (type === "AND") {
      for (let a of selection[prop]) {
        if (a === "any") {
          return true;
        } else if (item[target].indexOf(a) < 0) {
          return false;
        }
      }
      return true;
    } else if (type === "OR") {
      for (let a of selection[prop]) {
        if (a === "all") {
          return true;
        } else if (item[target].indexOf(a) >= 0) {
          return true;
        }
      }
      return false;
    }
  };

  const applyZoneFilter = ({ filtered: data, selection }) => {
    const filtered = data
      .filter((item) => logicFilter(item, selection, "zones", "OR"))
      .filter((item) => logicFilter(item, selection, "zones", "AND"));
    return { filtered, selection };
  };

  const applySectorFilter = ({ filtered: data, selection }) => {
    const filtered = data
      .filter((item) => logicFilter(item, selection, "sectors", "OR"))
      .filter((item) => logicFilter(item, selection, "sectors", "AND"));
    return { filtered, selection };
  };

  const applyTagsFilter = ({ filtered: data, selection }) => {
    const filtered = data
      .filter((item) => logicFilter(item, selection, "tags", "OR"))
      .filter((item) => logicFilter(item, selection, "tags", "AND"));
    return { filtered, selection };
  };

  const applyTextFilter = ({ filtered: data, selection }) => {
    // Pending to be developed
    const filtered = data;
    return { filtered, selection };
  };

  const applyFilters = (data, selection) => {
    const { filtered } = compose(
      applyTextFilter,
      applyTagsFilter,
      applySectorFilter,
      // trace,
      applyZoneFilter,
      applyTimeRangeFilter,
      applySessionFilter
    )({ data, selection });
    setDataFiltered(filtered);
    setDataOrdered(filtered);
  };

  // Functions for the buttons
  const handleReset = (e) => {
    e.preventDefault();

    [...document.getElementsByTagName("select")].map((a) => (a.value = ""));
    [...document.getElementsByTagName("input")].map((a) => (a.value = ""));

    setFilter({
      session: "all",
      startDate: "",
      endDate: "",
      zonesOR: ["all"],
      zonesAND: ["any"],
      sectorsOR: ["all"],
      sectorsAND: ["any"],
      tagsOR: ["all"],
      tagsAND: ["any"],
      text: "",
    });
    applyFilters(dataAll, filter);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters(dataAll, filter);
    navigate(`/`);
  };

  return (
    <>
      <h1>Search</h1>
      <form action="#">
        <fieldset>
          <legend>Time</legend>
          <div className="horizontal justify-items-space-around ">
            <div className="horizontal justify-items-space-around vw-35">
              <label htmlFor="session">Session</label>
              <select
                onChange={selectSession}
                name="sessions"
                id="session"
                multiple
                value={filter.session}
              >
                <option value="all">all</option>
                {uniqueSessions.map((session, i) => (
                  <option key={+session + i} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>

            <div className="vertical">
              <div className="horizontal justify-items-space-around vw-35">
                <label htmlFor="start-date">Start</label>
                <input
                  onChange={selectStartDate}
                  name="start-date"
                  type="date"
                  value={filter.startDate}
                />
              </div>
              <div className="horizontal justify-items-space-around ">
                <label htmlFor="end-date">End</label>
                <input
                  onChange={selectEndDate}
                  name="end-date"
                  type="date"
                  value={filter.endDate}
                />
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Zone</legend>
          <div className="horizontal justify-items-space-around ">
            <div className="vw-35  horizontal justify-items-space-around  ">
              <label htmlFor="zone">OR</label>
              <select
                onChange={selectZonesOR}
                name="zone"
                id="zone"
                multiple
                value={filter.zonesOR}
              >
                <option value="all">all</option>
                {uniqueZones.map((zone, i) => (
                  <option key={+i} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>
            <div className="vw-35  horizontal justify-items-space-around  ">
              <label htmlFor="zone">AND</label>
              <select
                onChange={selectZonesAND}
                name="zone"
                id="zone"
                multiple
                value={filter.zonesAND}
              >
                <option value="any">any</option>
                {uniqueZones.map((session, i) => (
                  <option key={+i} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Sector</legend>
          <div className="horizontal justify-items-space-around ">
            <div className="vw-35  horizontal justify-items-space-around  ">
              <label htmlFor="zone">OR</label>
              <select
                onChange={selectSectorsOR}
                name="zone"
                id="zone"
                multiple
                value={filter.sectorsOR}
              >
                <option value="all">all</option>
                {uniqueIndustries.map((session, i) => (
                  <option key={+i} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
            <div className="vw-35  horizontal justify-items-space-around  ">
              <label htmlFor="zone">AND</label>
              <select
                onChange={selectSectorsAND}
                name="zone"
                id="zone"
                multiple
                value={filter.sectorsAND}
              >
                <option value="any">any</option>
                {uniqueIndustries.map((session, i) => (
                  <option key={+i} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Tags</legend>
          <div className="horizontal justify-items-space-around ">
            <div className="vw-35  horizontal justify-items-space-around  ">
              <label htmlFor="zone">OR</label>
              <select
                onChange={selectTagsOR}
                name="zone"
                id="zone"
                multiple
                value={filter.tagsOR}
              >
                <option value="all">all</option>
                {uniqueTags.map((session, i) => (
                  <option key={+i} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
            <div className="vw-35  horizontal justify-items-space-around  ">
              <label htmlFor="zone">AND</label>
              <select
                onChange={selectTagsAND}
                name="zone"
                id="zone"
                multiple
                value={filter.tagsAND}
              >
                <option value="any">any</option>
                {uniqueTags.map((session, i) => (
                  <option key={+i} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Text</legend>
          <input type="text" onChange={handleTextChange} />
        </fieldset>
      </form>
      <div className="horizontal margin-lines" style={{ position: "relative" }}>
        <button className="btn-touch btn-left horizontal align-items-center justify-items-center" onClick={handleReset}>
          Clear
        </button>
        <button className="btn-touch btn-right horizontal align-items-center justify-items-center" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Search;
