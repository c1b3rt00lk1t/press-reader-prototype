import React from "react";
import { RiToggleFill, RiToggleLine } from "react-icons/ri";

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
  trigger = () => {}
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
        };
        result && trigger();
      }}
      className={`horizontal align-items-center ${onlyWiderScreen && 'only-wider-screen'}`}
    >
      {state ? (
        <RiToggleFill className="settings-icon" style={(actionPending || disable) && {color:"grey"}}/>
      ) : (
        <RiToggleLine className="settings-icon" style={disable && {color:"grey"}}/>
      )}
      {text}
    </div>
  );
};

export default SettingToogle;
