// app/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data
    fetch('/api/getUser') // Adjust with your real endpoint
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(() => setUser({ role: 'client' })); // Default to 'client' if fetch fails
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
