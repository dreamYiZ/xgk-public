// src/context/FabricContext.js

import { createContext, useContext, useState } from 'react';

const FabricContext = createContext();

export const FabricProvider = ({ children }) => {
  const [fabricCanvas, setFabricCanvas] = useState(null);

  return (
    <FabricContext.Provider value={{ fabricCanvas, setFabricCanvas }}>
      {children}
    </FabricContext.Provider>
  );
};

export const useFabricContext = () => useContext(FabricContext);

export default FabricContext;
