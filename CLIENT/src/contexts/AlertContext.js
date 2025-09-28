// AlertContext.js
import React, { createContext, useContext, useState } from 'react';
import { UncontrolledAlert } from 'reactstrap';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    const color = type === 'error' ? 'danger' : type; // Convert 'error' to 'danger' for Reactstrap
    setAlert({ msg, color });
    setTimeout(() => setAlert(null), 5000); // Dismiss alert after 5 seconds
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alert && (
        <UncontrolledAlert color={alert.color} style={{ position: 'fixed',width:'100%', bottom: '20px',  zIndex: 1050 }}>
          {alert.msg}
        </UncontrolledAlert>
      )}
    </AlertContext.Provider>
  );
};

