import React, { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";
import { useNavigate } from "react-router-dom";
import SearchTime from "../components/SearchTime";
import SearchTags from "../components/SearchTags";
import SearchText from "../components/SearchText";
import SearchSession from "../components/SearchSession";
import SearchOrder from "../components/SearchOrder";
import Offline from "../components/Offline";

const Search = () => {
  const {
    dataAll,
    uniqueSessions,
    uniqueZones,
    uniqueIndustries,
    uniqueTags,
    filter,
    selectSession,
    selectStartDate,
    selectEndDate,
    selectZonesOR,
    selectZonesAND,
    selectSectorsOR,
    selectSectorsAND,
    selectTagsOR,
    selectTagsAND,
    handleTextChange,
    applyFilters,
    handleReset,
  } = useContext(PressReaderContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementsByTagName("meta").viewport.content =
              "width=device-width, initial-scale=1";
    applyFilters(dataAll, filter);
    navigate(`/`);
  };

  return (
    <div className="no-footer vertical justify-items-space-between">
      <div>
        <Offline />
        <h1>Search </h1>
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
          <SearchText handleTextChange={handleTextChange} filter={filter} />
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
