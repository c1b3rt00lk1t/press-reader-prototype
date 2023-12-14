import React from "react";
import { RiToggleFill, RiToggleLine } from "react-icons/ri";
import PropTypes from "prop-types";

const SettingToogle = ({
  setter,
  state,
  local,
  text,
  setExclude,
  localExclude,
  actionPending,
  disable = false,
  onlyWiderScreen = false,
  trigger = () => {},
}) => {
  return (
    <div
      onClick={() => {
        const result = !disable && !state;
        setter(result);
        window.localStorage.setItem(`PrRe_${local}`, result);
        if (result && !!setExclude) {
          setExclude(false);
          window.localStorage.setItem(`PrRe_${localExclude}`, false);
          console.log(`PrRe_${localExclude}`);
        }
        result && trigger();
      }}
      className={`horizontal align-items-center ${
        onlyWiderScreen && "only-wider-screen"
      }`}
    >
      {state ? (
        <RiToggleFill
          className="settings-icon"
          style={(actionPending || disable) && { color: "grey" }}
        />
      ) : (
        <RiToggleLine
          className="settings-icon"
          style={disable && { color: "grey" }}
        />
      )}
      {text}
    </div>
  );
};

SettingToogle.propTypes = {
  setter: PropTypes.func.isRequired,
  state: PropTypes.bool.isRequired,
  local: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setExclude: PropTypes.func,
  localExclude: PropTypes.string,
  actionPending: PropTypes.bool,
  disable: PropTypes.bool,
  onlyWiderScreen: PropTypes.bool,
  trigger: PropTypes.func,
};

export default SettingToogle;
