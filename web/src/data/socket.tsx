import { createContext } from "react";
import socketio from "socket.io-client";
import { API } from "src/utils/Apis";

export type SocketContextType = {
  socket: any;
};

export const socket = socketio(API) as any;
export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketContextProvider: React.FC = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
