import React, { useState, createContext } from "react";

export type fileType = {
  id: number;
  fileName: string;
  language: string;
  content: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
  };
};

export interface ContextType {
  files: fileType[];
  setFiles: React.Dispatch<React.SetStateAction<fileType[]>>;
  selectedFile: fileType | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<fileType | null>>;
  fileNavbar: fileType[];
  setFileNavbar: React.Dispatch<React.SetStateAction<fileType[]>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userData: AuthResponse | null;
  setUserData: React.Dispatch<React.SetStateAction<AuthResponse | null>>;
}

export const Context = createContext<ContextType | null>(null);

export const ContextProvider: React.FC = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState<fileType | null>(null);
  const [files, setFiles] = useState<fileType[]>([]);
  const [fileNavbar, setFileNavbar] = useState<fileType[]>([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<AuthResponse | null>(null);

  return (
    <Context.Provider
      value={{
        files,
        setFiles,
        selectedFile,
        setSelectedFile,
        fileNavbar,
        setFileNavbar,
        loggedIn,
        setLoggedIn,
        isLoading,
        setIsLoading,
        userData,
        setUserData,
      }}
    >
      {children}
    </Context.Provider>
  );
};
