import AsyncStorage from "@react-native-async-storage/async-storage";

// getCacheData
export const getCacheData = async (key) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    const data = JSON.parse(storedData);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("retrieving data" + error);
  }
};

// storeData
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("error", error);
  }
};
// ClearData
export const clearData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("error", error);
  }
};
