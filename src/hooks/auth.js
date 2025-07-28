// utils/auth.js

export const getRole = () => {
  return localStorage.getItem('userRole') || 'guest';
};

export const isAdmin = () => {
  return getRole() === 'admin';
};

