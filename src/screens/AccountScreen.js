import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 48 }}>Account Screen</Text>
      <Spacer>
        <Button
          containerStyle={{
            marginHorizontal: 20,
            marginVertical: 30,
            alignContent: "center"
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 20 }}
          buttonStyle={{
            backgroundColor: "rgba(90, 154, 230, 1)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30
          }}
          title='Sign Out'
          onPress={signout}
        />
      </Spacer>
    </SafeAreaView>
  );
};
AccountScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: <FontAwesome name='gear' size={24} color='black' />
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  }
});

export default AccountScreen;
