import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const getUserTokenFromLocalStorage = () => {
    const token = localStorage.getItem("userToken");
    return token ? JSON.parse(token) : null;
  };
  const getIsMentorFromLocalStorage = () => {
    const isMentor = localStorage.getItem("isMentor");
    return isMentor === "true" ? true : false;
  };

  const [isMentor, setIsMentor] = useState(() => {
    const isMentor = getIsMentorFromLocalStorage();
    return isMentor;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const user = getUserTokenFromLocalStorage();
    return user ? true : false;
  });

  const storeUserTokenInLocalStorage = (token) => {
    localStorage.setItem("userToken", JSON.stringify(token));
  };

  const storeIsMentorInLocalStorage = (isMentor) => {
    if (isMentor) {
      localStorage.setItem("isMentor", "true");
    } else {
      localStorage.setItem("isMentor", "false");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("userToken");
    localStorage.removeItem("isMentor");
  };

  const decodeToken = (token) => {
    const user = jwtDecode(token);
    return user;
  };

  const getId = () => {
    const token = localStorage.getItem("userToken");
    if (!token) return null;
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    return userId;
  };

  return (
    <UserContext.Provider
      value={{
        isMentor,
        setIsMentor,
        isLoggedIn,
        setIsLoggedIn,
        storeUserTokenInLocalStorage,
        storeIsMentorInLocalStorage,
        logout,
        getUserTokenFromLocalStorage,
        decodeToken,
        getId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
