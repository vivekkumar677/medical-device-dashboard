export const loadFromLocalStorage = (key) => {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) return null;
    return JSON.parse(serialized);
  } catch (e) {
    console.warn(`Error loading ${key} from localStorage`, e);
    return null;
  }
};

export const saveToLocalStorage = (key, data) => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
  } catch (e) {
    console.warn(`Error saving ${key} to localStorage`, e);
  }
};