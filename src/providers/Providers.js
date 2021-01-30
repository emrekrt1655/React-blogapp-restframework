import React, { Suspence } from "react";
import PropTypes from "prop-types";
import {AppContextProvider} from "../context/AppContext";

export const Providers = ({ children }) => {
  return (
    <Suspence fallback="loading">
      <AppContextProvider> { children}  </AppContextProvider>
    </Suspence>
  );
};

Providers.propTypes = {
  children: PropTypes.node,
}
