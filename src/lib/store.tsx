"use client"

import React, { createContext, useContext, useState } from 'react';

interface AppState {
  data: any;
}

interface AppContextType {
  state: AppState;
  setData: (data: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    data: null,
  });

  const setData = (data: any) => {
    setState({ data });
  };

  return (
    <AppContext.Provider value={{ state, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
