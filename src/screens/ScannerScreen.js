import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Alert, ImageBackground } from "react-native";
import Spacer from "../components/Spacer";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Context as BarcodeContext } from "../context/BarcodeContext";

export default function ScannerScreen({ navigation }) {
  const { state, getBarcodes, createBarcode } = useContext(BarcodeContext);

  const [pressed, setPressed] = useState(false);
  const [scanned, setScanned] = useState(false);
  //const [text, setText] = useState("Not yet scanned");
  //const [products, setProducts] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);

  // Request Camera Permission
  useEffect(async () => {
    getBarcodes();
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      // console.log(state);
    })();
  }, []);

  const saveBarcode = async (type, data) => {
    await createBarcode(type, data);
    //reset();
    //navigation.navigate("BarcodesList");
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    //setText(data);
    await createBarcode(type, data);
    //saveBarcode(type, data);
    //setProducts([...products, data]);
    Alert.alert(
      `Bar code with type ${type} and data ${data} has been scanned!`,
      "",
      [
        {
          text: "Ok",
          onPress: () => navigation.navigate("BarcodesList"),
          style: "cancel"
        }
      ],
      {
        cancelable: true
      }
    );
    setTimeout(() => {
      setPressed(false);
    }, 100);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../images/groceries.jpg")}
        resizeMode='cover'
      >
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
          title={!scanned ? "Scan product" : "Scan again"}
          onPress={
            !scanned
              ? () => {
                  setPressed(true);
                }
              : () => setScanned(false)
          }
        />

        <Spacer />
        {pressed ? (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 450, width: 360 }}
          />
        ) : null}
        {/* {scanned && (
          <Button
            title={"Scan again?"}
            onPress={() => setScanned(false)}
            color='tomato'
          />
        )} */}
      </ImageBackground>
    </View>
  );
}
ScannerScreen.navigationOptions = {
  title: "Scanner",
  tabBarIcon: <Ionicons name='ios-barcode' size={24} color='black' />
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },

  image: {
    flex: 1,
    justifyContent: "flex-start"
  },
  button: {
    justifyContent: "flex-end",
    backgroundColor: "red"
  }
});
