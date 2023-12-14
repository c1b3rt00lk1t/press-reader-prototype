import React from "react";
import { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";
import PropTypes from "prop-types";

const SearchOrder = ({ texts }) => {
  const { orderType, setOrderType } = useContext(PressReaderContext);

  const handleOrderChange = (ev) => {
    setOrderType(ev.target.value);
  };

  return (
    <fieldset>
      <legend>{texts.order}</legend>

      <div className="horizontal justify-items-space-around">
        <div>
          <input
            onChange={handleOrderChange}
            type="radio"
            value="dateOrderAsc"
            name="order"
            checked={orderType === "dateOrderAsc"}
          />{" "}
          asc
        </div>
        <div>
          <input
            onChange={handleOrderChange}
            type="radio"
            value="dateOrderDesc"
            name="order"
            checked={orderType === "dateOrderDesc"}
          />{" "}
          desc
        </div>
        <div>
          <input
            onChange={handleOrderChange}
            type="radio"
            value="sessionOrder"
            name="order"
            checked={orderType === "sessionOrder"}
          />{" "}
          {texts.session.toLowerCase()}
        </div>
      </div>
    </fieldset>
  );
};

SearchOrder.propTypes = {
  texts: PropTypes.object.isRequired,
};

export default SearchOrder;
