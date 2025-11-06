import { useContext } from "react";
import { StateContext } from "@/components/context/ContextProvider";

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context)
    throw new Error("useStateContext must be used within a ContextProvider");
  return context;
};