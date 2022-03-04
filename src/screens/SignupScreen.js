import React, { useContext } from "react";
import { View, StyleSheet, Image, ImageBackground } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  // console.log(state);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../images/cover4.jpg")}
        resizeMode='cover'
      >
        <NavigationEvents onWillBlur={clearErrorMessage} />
        <Image style={styles.logo} source={require("../images/logo.png")} />
        <View style={{ bottom: 90 }}>
          <AuthForm
            onSubmit={signup}
            // headerText='Sign Up for Tracker'
            errorMessage={state.errorMessage}
            sumbitButtonText='Sign Up'
          />

          <NavLink
            text='Already have an account? Sign in instead.'
            routeName='Signin'
          />
        </View>
      </ImageBackground>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
    //marginBottom: 200
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  logo: {
    height: 150,
    width: 150,
    tintColor: "#dd5b22",
    alignSelf: "center",
    marginTop: 0,
    bottom: 80
  }
});

export default SignupScreen;
