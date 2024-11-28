import React from "react";
import "./miniLoader.css"; // Import the CSS for styling

const MiniLoader = () => {
  return (
    <div className="loader ">
      <div className="load-inner load-one"></div>
      <div className="load-inner load-two"></div>
      <div className="load-inner load-three"></div>
      <span className="text !text-[black]">Loading...</span>
    </div>
  );
};

export default MiniLoader;
