// apiUtils.js

import { BASE_URL } from "./baseUrl";

export const getAllRoles = async (setRoles) => {
  try {
    const response = await fetch(`${BASE_URL}/v1/role`);

    if (!response || !response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setRoles(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAllInstitutes = async (setRegisteredInstitutes) => {
  try {
    const response = await fetch(`${BASE_URL}/v1/admin/allInstitutions`);

    if (!response || !response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    if (!Array.isArray(data)) {
      data = [data];
    }
    setRegisteredInstitutes(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchAllUsers = async (setRows) => {
  try {
    const response = await fetch("http://localhost:3001/v1/user/");
    if (!response.ok) {
      const data = await response.text();
      console.error("An error occurred: " + data.error);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      data = [data];
    }
    setRows(data);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};
