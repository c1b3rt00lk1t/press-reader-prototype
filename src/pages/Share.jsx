import React from "react";

const Share = () => {
  const shareData = {
    title: "PressReader",
    text: 'Try this prototype!',
    url: "https://tourmaline-unicorn-2c62ec.netlify.app",
  };

  const handleClick = async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log("Error in the sharing process");
    }
  };

  return (
    <>
      <h1>Share</h1>
            <button  onClick={handleClick}>
          Share the app
          </button>
      </>
  );
};

export default Share;
