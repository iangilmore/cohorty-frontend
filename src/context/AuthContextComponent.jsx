import { createContext, useState, useEffect } from "react";
import { verifyUser } from "../services/users";

export const AuthContext = createContext(null);

export const AuthContextComponent = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    const initializeContext = async () => {
      const isUserValid = await verifyUser();
      isUserValid ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
    };
    initializeContext();
  });

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );


};




















   
