import axios from "axios";
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "http://1fd8-88-207-91-143.ngrok.io"
});

instance.interceptors.request.use(
  async config => {
    // console.log(AsyncStorage.getItem("token"));
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
export default instance;
