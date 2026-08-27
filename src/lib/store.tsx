
"use client"
import React, { createContext, useContext, useState } from 'react';

// Store minimaliste pour le démarrage
const AppContext = createContext<any>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
