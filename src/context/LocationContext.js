import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const locationReducer = (state, action) => {
  switch (action.type) {
    case "addCurrentLocation":
      return { ...state, currentLocation: action.payload };
    case "startRecording":
      return { ...state, recording: true };
    case "stopRecording":
      return { ...state, recording: false };
    case "addLocation":
      return {
        ...state,
        locations: [...state.locations, action.payload]
      };
    case "changeName":
      return {
        ...state,
        name: action.payload
      };
    case "reset":
      return { ...state, name: "", locations: [] };
    default:
      return state;
  }
};

const changeName = dispatch => name => {
  dispatch({ type: "changeName", payload: name });
};

const startRecording = dispatch => () => {
  dispatch({ type: "startRecording" });
};
const stopRecording = dispatch => () => {
  dispatch({ type: "stopRecording" });
};
const addLocation = dispatch => (location, recording) => {
  dispatch({ type: "addCurrentLocation", payload: location });
  if (recording) {
    dispatch({ type: "addLocation", payload: location });
  }
};

const reset = dispatch => () => {
  dispatch({ type: "reset" });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName, reset },
  { name: "", recording: false, locations: [], currentLocation: null }
);
