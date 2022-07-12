import React from 'react'
import { RiToggleFill, RiToggleLine } from "react-icons/ri";

const SettingToogle = ({setter, state, local, text, setExclude, localExclude}) => {
  return (
    <div
        onClick={() => {
            setter(!state);
            window.localStorage.setItem(`PrRe_${local}`,!state);
            if (!state && !!setExclude ) {
                setExclude(false);
                window.localStorage.setItem(`PrRe_${localExclude}`,false);
                console.log(`PrRe_${localExclude}`)
            };
        }}
        className="horizontal align-items-center"
      >
        {state ? (
          <RiToggleFill className="settings-icon" />
        ) : (
          <RiToggleLine className="settings-icon" />
        )}
        {text}
      </div>
  )
}

export default SettingToogle