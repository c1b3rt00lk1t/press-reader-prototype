import React, { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";
import { useNavigate } from "react-router-dom";
import SearchTime from "../components/SearchTime";
import SearchTags from "../components/SearchTags";
import SearchText from "../components/SearchText";
import SearchSession from "../components/SearchSession";
import SearchOrder from "../components/SearchOrder";

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
    orderType
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
    e.preventDefault();
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
      !selection.session.includes("all")
        ? selection.session.includes(a.session)
        : true
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
    const checkText = (item, texts) => {
      const result = texts.reduce(
        (acc, b) =>
          acc && (
          item.title.toLowerCase().includes(b) ||
          item.zones.includes(b) ||
          item.sectors.includes(b) ||
          item.tags.includes(b) ||
          item.source.toLowerCase().includes(b) ),
        true
      );

      return result;
    };
    const filtered = data.filter((item) =>
      checkText(item, selection.text.toLowerCase().split(" "))
    );
    return { filtered, selection };
  };

  const applyOrder = ({ filtered: data, selection }) => {

    if (orderType === "sessionOrder"){
      const filtered = data.sort((a,b) => parseInt(a.session + a.order) - parseInt(b.session + b.order) )
      return { filtered, selection };
    } else if (orderType === "dateOrderAsc"){

      const filtered = data.sort((a,b) => parseInt(a.date.replace(/-/g,'')) - parseInt(b.date.replace(/-/g,'')) )
      return { filtered, selection };
    } else if (orderType === "dateOrderDesc"){

      const filtered = data.sort((a,b) => parseInt(b.date.replace(/-/g,'')) - parseInt(a.date.replace(/-/g,'')) )
      return { filtered, selection };
    }


    
  };

  const applyFilters = (data, selection) => {
    const { filtered } = compose(
      applyOrder,
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
      session: ["all"],
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
    <div className="no-footer vertical justify-items-space-between">
      <div>
        <h1 >Search </h1>
        <form action="#">
          <SearchSession  
            selectSession={selectSession}
            filter={filter}
            uniqueSessions={uniqueSessions}
          />
          <SearchTime
            selectSession={selectSession}
            selectStartDate={selectStartDate}
            selectEndDate={selectEndDate}
            filter={filter}
            uniqueSessions={uniqueSessions}
          />
          <SearchTags
            title="Zone"
            type="zones"
            filter={filter}
            uniqueList={uniqueZones}
            selectOR={selectZonesOR}
            selectAND={selectZonesAND}
          />
          <SearchTags
            title="Sector"
            type="sectors"
            filter={filter}
            uniqueList={uniqueIndustries}
            selectOR={selectSectorsOR}
            selectAND={selectSectorsAND}
          />
          <SearchTags
            title="Tags"
            type="tags"
            filter={filter}
            uniqueList={uniqueTags}
            selectOR={selectTagsOR}
            selectAND={selectTagsAND}
          />
          <SearchText handleTextChange={handleTextChange} filter={filter}/>
          <SearchOrder />
        </form>
      </div>

      <div className="horizontal margin-lines justify-items-space-around btn-container">
        <button className="btn-touch" onClick={handleReset}>
          Clear
        </button>
        <button className="btn-touch" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Search;
