import React, { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";
import LanguageContext from "../contexts/LanguageContext";
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
    setSubmit,
  } = useContext(PressReaderContext);

  const { texts, language } = useContext(LanguageContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    document.getElementsByTagName("meta").viewport.content =
      "width=device-width, initial-scale=1";
    applyFilters(dataAll, filter);
    navigate(`/`);
  };

  return (
    <div className="no-footer vertical justify-items-space-between">
      <div>
        <Offline />
        <h1>{texts[language].search.title} </h1>
        <form action="#">
          <SearchSession
            title={texts[language].search.session}
            selectSession={selectSession}
            filter={filter}
            uniqueSessions={uniqueSessions}
          />
          <SearchTime
            texts={texts[language].search}
            selectSession={selectSession}
            selectStartDate={selectStartDate}
            selectEndDate={selectEndDate}
            filter={filter}
            uniqueSessions={uniqueSessions}
          />
          <SearchTags
            title={texts[language].search.zone}
            type="zones"
            filter={filter}
            uniqueList={uniqueZones}
            selectOR={selectZonesOR}
            selectAND={selectZonesAND}
          />
          <SearchTags
            title={texts[language].search.sector}
            type="sectors"
            filter={filter}
            uniqueList={uniqueIndustries}
            selectOR={selectSectorsOR}
            selectAND={selectSectorsAND}
          />
          <SearchTags
            title={texts[language].search.tags}
            type="tags"
            filter={filter}
            uniqueList={uniqueTags}
            selectOR={selectTagsOR}
            selectAND={selectTagsAND}
          />
          <SearchText handleTextChange={handleTextChange} filter={filter} title={texts[language].search.text} />
          <SearchOrder texts={texts[language].search}/>
        </form>
      </div>

      <div className="horizontal margin-lines justify-items-space-around btn-container">
        <button className="btn-touch" onClick={handleReset}>
          {texts[language].search.clear}
        </button>
        <button className="btn-touch" onClick={handleSubmit}>
          {texts[language].search.submit}
        </button>
      </div>
    </div>
  );
};

export default Search;
