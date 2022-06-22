import React from "react";
import { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";

const SearchOrder = () => {
  const { orderType, setOrderType } = useContext(PressReaderContext);

  const handleOrderChange = (ev) => {
    setOrderType(ev.target.value);
  };

  return (
    <fieldset>
      <legend>Order</legend>

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
          session
        </div>
      </div>
    </fieldset>
  );
};

export default SearchOrder;
