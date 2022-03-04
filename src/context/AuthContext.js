import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "addError":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    // navigate("TrackList");
    navigate("Scanner");
  } else {
    navigate("Signup");
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};
const signup = dispatch => async ({ email, password }) => {
  //make api request to sign up with that email and password
  try {
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    //if we sign up, modify our state and say that we are authenicated
    dispatch({ type: "signin", payload: response.data.token });

    // navigate("TrackList");
    navigate("Scanner");
  } catch (err) {
    //if signing up fails, we probably need to reflect an error message somwhere
    dispatch({
      type: "addError",
      payload: "Something went wrong with sign up"
    });
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    //make api request to sign in with that email and password
    const response = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    //navigate("TrackList");
    navigate("Scanner");
  } catch (err) {
    dispatch({
      type: "addError",
      payload: "Something went wrong with sign in"
    });
  }

  //handle success by updating state
  //handle failure by showing error message
};

const signout = dispatch => async () => {
  //somehow sign out
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin, signout },
  { token: null, errorMessage: "" }
);
