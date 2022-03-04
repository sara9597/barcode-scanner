import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Pressable,
  ImageBackground
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { Button, ListItem } from "react-native-elements";
import { Context as BarcodeContext } from "../context/BarcodeContext";
import { FontAwesome } from "@expo/vector-icons";
import SwipeButton from "rn-swipe-button";

const BarcodesList = ({ navigation }) => {
  const {
    state,
    state: { products },
    getBarcodes,
    deleteProduct
  } = useContext(BarcodeContext);

  const [visible, setVisible] = React.useState(false);
  const [id, setId] = useState(null);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const [paid, setPaid] = useState(false);
  const result =
    products && Object.values(products).reduce((r, { price }) => r + price, 0);
  const weight =
    products &&
    Object.values(products).reduce((r, { weight }) => r + weight, 0);

  useEffect(() => {
    getBarcodes();

    const listener = navigation.addListener("didFocus", () => {
      getBarcodes();
    });

    return () => {
      listener.remove();
    };
  }, []);

  const onSwipeSuccess = () => {
    setPaid(true);
    Alert.alert(
      `Paid successfully!`,
      "",
      [
        {
          text: "Ok",
          // onPress: () => navigation.navigate("Scanner"),
          style: "cancel"
        }
      ],
      {
        cancelable: true
      }
    );
    //deleteAll();
  };

  const deletePro = async id => {
    // console.log(id);
    await deleteProduct(id)
      .then(getBarcodes())
      .then(hideModal(!visible));
  };

  const modalHandler = id => {
    setId(id);
    showModal(!visible);
  };

  return (
    <>
      <ImageBackground
        style={styles.image}
        source={require("../images/cover3.jpg")}
        resizeMode='cover'
      >
        <NavigationEvents onWillFocus={(getBarcodes, () => setPaid(false))} />
        {/* {console.log(products)} */}
        {!paid ? (
          <FlatList
            style={styles.flatList}
            data={products}
            keyExtractor={(item, index) => index}
            renderItem={({
              item,
              item: { data, type, name, weight, price }
            }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("BarcodeDetail", {
                      id: data
                    })
                  }
                >
                  <Modal
                    animationType='slide'
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisible(!visible);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                          Are you sure you want to delete this product?
                        </Text>
                        <View style={styles.buttons}>
                          <Pressable
                            style={[styles.button, styles.buttonDelete]}
                            onPress={() => deletePro(id)}
                          >
                            <Text style={styles.textStyle}>Yes</Text>
                          </Pressable>
                          <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => hideModal(!visible)}
                          >
                            <Text style={styles.textStyle}>No</Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  {/* {console.log(item)} */}
                  <ListItem style={styles.listItem}>
                    {/* <TouchableOpacity onPress={() => deletePro(item.data)}> */}
                    <TouchableOpacity onPress={() => modalHandler(item.data)}>
                      <FontAwesome style={styles.icon} name='trash-o' />
                    </TouchableOpacity>
                    <ListItem.Content style={styles.content}>
                      <ListItem.Title style={styles.title}>
                        {item.name ? item.name : null}
                      </ListItem.Title>
                      <Text>{weight ? `${weight}g` : null}</Text>
                      <Text>{price ? `${price}kn` : null}</Text>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                </TouchableOpacity>
              );
            }}
          />
        ) : null}
        <View style={styles.totalContainer}>
          <Text style={styles.total}>
            Total weight: {!paid ? `${weight} g` : 0}
          </Text>

          <Text style={styles.total}>
            Total price:{!paid ? `${result} kn` : 0}
          </Text>
        </View>
        {/* <Button title='Pay total' /> */}
        <SwipeButton
          title={!paid ? "Slide to pay" : "Nothing to pay"}
          titleColor='white'
          railBackgroundColor='"rgba(90, 154, 230, 1)"'
          railStyles={{
            backgroundColor: "#11000088",
            borderColor: "rgba(90, 154, 230, 1)",
            borderWidth: 1
          }}
          thumbIconBackgroundColor='#FFFFFF'
          onSwipeSuccess={onSwipeSuccess}
          shouldResetAfterSuccess={true}
        />
      </ImageBackground>
    </>
  );
};

BarcodesList.navigationOptions = {
  title: "Products"
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 24
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  title: {
    alignContent: "flex-start"
  },
  total: {
    alignSelf: "flex-end",
    margin: 10,
    fontWeight: "bold"
  },
  totalContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    //maxWidth: "100px"
    alignSelf: "flex-end"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 20,
    width: 80
  },
  buttonOpen: {
    backgroundColor: "#F194FF"
  },
  buttonClose: {
    backgroundColor: "red"
  },
  buttonDelete: {
    backgroundColor: "#2196F3"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold"
  },
  buttons: {
    flexDirection: "row"
  },
  image: {
    flex: 1,
    justifyContent: "flex-start"
  },
  flatList: {
    padding: 10
  },
  listItem: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 2
  }
});

export default BarcodesList;
