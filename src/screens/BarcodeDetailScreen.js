import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Context as BarcodeContext } from "../context/BarcodeContext";

const BarcodeDetailScreen = ({ navigation }) => {
  //console.log(navigation);
  const id = navigation.getParam("id");
  const {
    state: { products }
  } = useContext(BarcodeContext);

  const barcode = products ? products.find(t => t.data === id) : null;
  return (
    <>
      <Text style={{ fontSize: 48 }}>{barcode ? barcode.name : null}</Text>
      <Image style={styles.image} source={require("../images/groceries.jpg")} />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 600,
    resizeMode: "cover",
    flex: 1
  }
});

export default BarcodeDetailScreen;
