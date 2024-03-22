"use client"
import React, { createContext, useState, useContext } from 'react';

const IsHomeContext = createContext();

export default function IsHomeProvider ({ children }) {
  const [isHome, setIsHome] = useState(false);

  return (
    <IsHomeContext.Provider value={{ isHome, setIsHome }}>
      {children}
    </IsHomeContext.Provider>
  );
};

export const UseHomeContext = () => useContext(IsHomeContext)