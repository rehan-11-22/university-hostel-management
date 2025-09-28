// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Load the user from sessionStorage when the component mounts
  useEffect(() => {
    checkUserState()

  }, []);

  useEffect(() => {
    // Perform actions here when authState changes, such as notifying components or logging
    console.log("Authentication state changed:", authState);
    // You might want to trigger API calls or dispatch events here
  }, [authState]);



  const checkUserState = () => {
    const storedUser = sessionStorage.getItem('user');
    // console.log("storedUser in session sotrage ==>", storedUser);
    if (storedUser) {
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(storedUser),
      });
    }
    setInitializing(false);
  }


  const login = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setAuthState({
      isAuthenticated: true,
      user,
    });
  };
  const logout = () => {
    sessionStorage.removeItem('user');
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
