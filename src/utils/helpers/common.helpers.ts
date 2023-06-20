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
export const validateForm = (formData: any): boolean => {
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "age",
    "class",
    "profilePhoto",
  ];
  const minimumSubjectCount = 3;
  const specialCharacters = /^[a-zA-Z ]*$/;
  const missingFields = [];

  for (const field of requiredFields) {
    if (!formData[field]) {
      missingFields.push(field);
    }
  }
  if (missingFields.length > 0) {
    alert(`Missing fields: ${missingFields.join(", ")}`);
    return false;
  }

  if (formData.subjects.length < minimumSubjectCount) {
    alert("Minimum 3 subjects required");
    return false;
  }

  if (!specialCharacters.test(formData.firstName)) {
    alert("Invalid characters in the First Name field");
    return false;
  }

  if (!specialCharacters.test(formData.lastName)) {
    alert("Invalid characters in the Last Name field");
    return false;
  }

  return true;
};
