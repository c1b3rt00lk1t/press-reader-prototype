import React, { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";

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
    setFilter({ ...filter, session: e.target.value });
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

  const trace = (value) => {
    console.log(value);
    return value;
  };

  const applySessionFilter = ({ data, selection }) => {
    const filtered = data.filter((a) =>
      selection.session !== "all" ? a.session === selection.session : true
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

  const applyZoneFilter = ({ filtered: data, selection }) => {
    // Pending to be developed

    const ORfilter = (item) => {
      for (let zone of selection.zonesOR) {
        if (zone === "all"){
          return true;
        }
        else if (item.zone.indexOf(zone) >= 0) {
          return true;
        }
      }
      return false;
    };

    const filtered = data.filter((item) => ORfilter(item));

    return { filtered, selection };
  };

  const applySectorFilter = ({ filtered: data, selection }) => {
    // Pending to be developed
    const filtered = data;
    return { filtered, selection };
  };

  const applyTagsFilter = ({ filtered: data, selection }) => {
    // Pending to be developed
    const filtered = data;
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
      trace,
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
      zonesOR: [],
      zonesAND: [],
      sectorsOR: [],
      sectorsAND: [],
      tagsOR: [],
      tagsAND: [],
      text: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters(dataAll, filter);
  };

  return (
    <>
      <h1>Search</h1>
      <form action="#">
        <fieldset className="horizontal justify-items-space-around">
          <legend>Time</legend>
          <div>
            <div className="horizontal justify-items-space-between vw-35">
              <label htmlFor="session">Session</label>
              <select
                onChange={selectSession}
                name="sessions"
                id="session"
                value={filter.session}
              >
                <option value="all">all</option>
                {uniqueSessions.map((session) => (
                  <option key={+session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="vertical">
            <div className="horizontal justify-items-space-around vw-50">
              <label htmlFor="start-date">Start date</label>
              <input
                onChange={selectStartDate}
                name="start-date"
                type="date"
                value={filter.startDate}
              />
            </div>
            <div className="horizontal justify-items-space-around ">
              <label htmlFor="end-date">End date</label>
              <input
                onChange={selectEndDate}
                name="end-date"
                type="date"
                value={filter.endDate}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Zone</legend>
          <div className="horizontal justify-items-space-around ">
            <div className="vw-35  horizontal justify-items-space-around  ">
              <label htmlFor="zone">OR</label>
              <select onChange={selectZonesOR} name="zone" id="zone" multiple
              value={filter.zonesOR}
              >
                <option value="all">all</option>
                {uniqueZones.map((session, i) => (
                  <option key={+i} value={session} >
                    {session}
                  </option>
                ))}
              </select>
            </div>
            <div className="vw-35  horizontal justify-items-space-around  ">
              <label htmlFor="zone">AND</label>
              <select onChange={selectZonesAND} name="zone" id="zone" multiple>
                <option value="all">all</option>
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
              <select onChange={selectSectorsOR} name="zone" id="zone" multiple>
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
              >
                <option value="all">all</option>
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
              <select onChange={selectTagsOR} name="zone" id="zone" multiple>
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
              <select onChange={selectTagsAND} name="zone" id="zone" multiple>
                <option value="all">all</option>
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

      <button onClick={handleReset}>Clear</button>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default Search;
