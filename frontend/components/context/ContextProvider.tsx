import React, { createContext, useState, useEffect } from "react";
import { ReactNodeProps, StateContextType } from "@/interfaces";

export const StateContext = createContext<StateContextType | undefined>(
  undefined
);

export const ContextProvider: React.FC<ReactNodeProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);



  return (
    <StateContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </StateContext.Provider>
  );
};
