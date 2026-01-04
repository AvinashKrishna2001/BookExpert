import { createContext, useContext, useState } from "react";
import { loginDetails } from "../data/mockData";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Always start logged out
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username, password) => {
    if (username === loginDetails.email && password === loginDetails.password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
