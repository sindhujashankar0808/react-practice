export const getLocalStorage = (key: string): any => {
  try {
    const isData = localStorage.getItem(key);
    if (isData) {
      return JSON.parse(isData);
    }
    return null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const setLocalStorage = (key: string, value: any): void => {
  try {
    const jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
  } catch (error) {
    console.error("error", error);
  }
};
