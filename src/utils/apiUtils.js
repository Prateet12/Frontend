// apiUtils.js

import { BASE_URL } from "./baseUrl";

export const getAllUserFiles = async (userId, setRowsState) => {
  try {
    const response = await fetch(
      `http://localhost:3001/v1/file/userFiles/${userId}`
    );
    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${data.error}`
      );
    }
    const data = await response.json();
    setRowsState(data);
  } catch (error) {
    console.error("Failed to fetch files:", error);
    // You might want to set an error state here to display the error to the user
  }
};

export const uploadDocument = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/v1/file/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (response.status === 201) {
      alert("Document uploaded successfully!");
      // Reset state after successful upload (optional)
      return data;
    } else {
      alert("Failed to upload document");
      console.error("Error:", data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

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
