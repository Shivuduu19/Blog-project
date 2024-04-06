import React from "react";

function Container({ children }) {
  return <div className="w-full max-w-7xl m-auto min-h-full flex justify-between items-center">{children}</div>;
}

export default Container;
