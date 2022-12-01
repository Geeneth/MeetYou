import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import SocialLinkButton from "../components/social-link-button";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserInfoPage from "./user-info-page";
import ReceivePage from "./receive-page";
import Navigation from "./navigation";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Linking } from "react-native";

function HomePage(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [qrString, setQrString] = useState('https://www.youtube.com/');
  

  //create a function to retrieve the user's input from async storage
  const getData = async (userKey) => {
    try {
      const jsonValue = await AsyncStorage.getItem(userKey);
      //set the value of the user's input to the state variable
      console.log("QR String 1 : " + qrString);
      setQrString(jsonValue);
      console.log("QR String: " + qrString);
      // return JSON.stringify(JSON.parse(jsonValue));
      // return jsonValue != null ? JSON.stringify(JSON.parse(jsonValue)) : null;
      
    } catch (e) {
      console.log(e);
    }
  };

  //a method to connect the social media links into one big string
  const generateQRCodeString = () => {
    getData("MeetYouLink");  
  };

  const generateQRCode = () => {    
    return (
      <QRCode
        value={qrString}
        size={200}
        color="black"
        backgroundColor="white"
      />
    );
  };

  getData("MeetYouLinkInstagram");
  console.log("QR String 2: " + qrString);

  return (
    <View style={styles.container}>
      <Text> Hello World </Text>
      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            style={styles.imageStyle}
            source={require("../assets/icons/generate-qr.png")}
          />
        </TouchableOpacity>
        

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>        
                {generateQRCode()}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    padding: 50,
    height: "100%",
    backgroundColor: "white",
  },
  imageStyle: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     padding: 50,
//     height: "100%",
//   },
//   linksContainer: {
//     flexDirection: "column",
//     justifyContent: "space-between",
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: "black",
//     padding: 10,
//     width: "80%",
//     marginRight: 10,
//   },
//   title: {
//     fontSize: 30,
//     fontFamily: "Poppins",
//     fontWeight: "bold",
//     padding: 10,
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   edit: {
//     //put this at the bottom of the page
//     position: "absolute",
//     bottom: 100,
//     alignSelf: "center",

//     flexDirection: "column",
//     justifyContent: "space-between",
//     height: 50,
//     width: "80%",
//     borderWidth: 2,
//     borderRadius: 10,
//     paddingTop: 4,
//     backgroundColor: "yellow",
//     fontFamily: "Poppins",
//   },

//   bottomButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//     position: "absolute",
//     bottom: 50,
//     alignSelf: "center",
//   },

//   saveButton: {
//     width: "45%",
//     borderWidth: 2,
//     borderRadius: 10,
//     backgroundColor: "#33C4FF",
//     fontFamily: "Poppins",
//   },
//   doneButton: {
//     width: "45%",
//     borderWidth: 2,
//     borderRadius: 10,
//     backgroundColor: "lime",
//     fontFamily: "Poppins",
//   },
// });
