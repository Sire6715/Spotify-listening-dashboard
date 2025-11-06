
export interface ReactNodeProps {
  children: React.ReactNode;
}

export interface StateContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}