import "react-native-gesture-handler";
import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import ScannerScreen from "./src/screens/ScannerScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { Provider as BarcodeProvider } from "./src/context/BarcodeContext";
import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import BarcodesList from "./src/screens/BarcodesList";
import BarcodeDetailScreen from "./src/screens/BarcodeDetailScreen";
console.disableYellowBox = true;

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
});

const barcodeListFlow = createStackNavigator({
  BarcodesList: BarcodesList,
  BarcodeDetail: BarcodeDetailScreen
});

barcodeListFlow.navigationOptions = {
  title: "Cart",
  tabBarIcon: <FontAwesome5 name='shopping-basket' size={24} color='black' />
};

trackListFlow.navigationOptions = {
  title: "Tracks",
  tabBarIcon: <FontAwesome name='th-list' size={24} color='black' />
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    Scanner: ScannerScreen,
    barcodeListFlow,
    //trackListFlow,
    // TrackCreate: TrackCreateScreen,

    Account: AccountScreen
  })
});

const App = createAppContainer(switchNavigator);
export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <BarcodeProvider>
            <App
              ref={navigator => {
                setNavigator(navigator);
              }}
            />
          </BarcodeProvider>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
