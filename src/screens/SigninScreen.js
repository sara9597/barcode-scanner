import React, { useContext } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  // console.log(state);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../images/cover4.jpg")}
        resizeMode='cover'
      >
        <Image style={styles.logo} source={require("../images/logo.png")} />
        <NavigationEvents onWillBlur={clearErrorMessage} />
        <View style={{ bottom: 90 }}>
          <AuthForm
            onSubmit={signin}
            // headerText='Sign In to Your Account'
            errorMessage={state.errorMessage}
            sumbitButtonText='Sign In'
          />
          <NavLink
            text="Don't have an account? Sign up instead."
            routeName='Signup'
          />
        </View>
      </ImageBackground>
    </View>
  );
};

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;
