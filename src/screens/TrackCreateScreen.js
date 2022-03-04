//import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Map from "../components/Map";
import { Text } from "react-native-elements";
import useLocation from "../hooks/useLocation";
import { Context as LocationContext } from "../context/LocationContext";
import { withNavigationFocus } from "react-navigation";
import TrackForm from "../components/TrackForm";
import { FontAwesome } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    addLocation,
    state: { recording }
  } = useContext(LocationContext);
  const callback = useCallback(
    location => {
      addLocation(location, recording);
    },
    [recording]
  );
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <View style={styles.container}>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </View>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name='plus' size={24} color='black' />
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  }
});

export default withNavigationFocus(TrackCreateScreen);
