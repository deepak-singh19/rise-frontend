import React, { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";
import { constants } from "../utility/constants";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const socket = useMemo(() => io(constants.BASE_URL), []); //add backend server
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
