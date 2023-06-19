import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CustomRouters } from "./CustomRouters";

const Routers = () => {
  return (
    <div>
      <BrowserRouter>
        <CustomRouters />
      </BrowserRouter>
    </div>
  );
};
export default Routers;
