import React, { createContext, useState } from "react";
import { ReactNodeProps } from "@/interfaces";

export interface StateContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StateContext = createContext<StateContextType | undefined>(undefined);

export const ContextProvider: React.FC<ReactNodeProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <StateContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </StateContext.Provider>
  );
};
