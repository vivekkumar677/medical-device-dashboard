import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('admin'); // default to admin

  const loginAs = (newRole) => setRole(newRole);

  return (
    <AuthContext.Provider value={{ role, loginAs }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
