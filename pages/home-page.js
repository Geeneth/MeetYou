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
import { BarCodeScanner } from "expo-barcode-scanner";
import socialLinks from "../components/social-link-button";
import ParsedInfo from "../components/parsed-info";

const importData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    let rawString = "";
    //put all the keys with "MeetYouLink" into an array
    const filteredKeys = keys.filter((key) => key.includes("MeetYouLink"));
    console.log("filtered keys: " + filteredKeys);
    //get the values of the keys
    const values = await AsyncStorage.multiGet(filteredKeys);
    //put the values into state variable socialLinks
    // setSocialLinks(values);

    values.map((link) => {
      rawString = rawString + link[0] + "β" + link[1] + "Ω";
    });

    //better way of parsing data
    // filteredKeys.map(async (key) => {
    //   let rawString = rawString + "β" + key.substring(11) + values[index] + "Ω";
    // });

    return rawString;
  } catch (error) {
    console.error(error);
  }
};

function HomePage(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [receiveModalVisible, setReceiveModalVisible] = useState(false);
  const [qrString, setQrString] = useState("https://www.youtube.com/");

  const [hasPermission, setHasPermission] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");

  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    importData().then(setQrString);
  }, []);

  //funciton to run importData() and set the state variable
  const importDataHelper = () => {
    importData().then(setSocialLinks);
    console.log("Social Links: " + socialLinks);
  };

  const getData2 = async () => {
    try {
      importDataHelper();
      socialLinks.map((link) => {
        setQrString(qrString + link[1]);
      });
    } catch (e) {
      console.log(e);
    }
  };

  //create a function to retrieve the user's input from async storage
  const getData = async (userKey) => {
    try {
      //map through socialLinks array
      socialLinks.map((link) => {
        //if the key of the link includes the user's input
        if (link[0].includes(userKey)) {
          //set the value of the user's input to the state variable
          setQrString(qrString + link[1]);
        }
      });

      // const jsonValue = await AsyncStorage.getItem.includes(userKey);
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
    importDataHelper();
    console.log("QR String 3: " + qrString);
    return (
      <QRCode
        value={qrString}
        size={300}
        color="black"
        backgroundColor="white"
      />
    );
  };

  getData("MeetYouLinkInstagram");
  console.log("QR String 2: " + qrString);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  const inputValid = (input) => {
    if (input.includes("Not yet scanned")) {
      return <Text>Invalid QR Code</Text>;
    } else {
      return <ParsedInfo text={text}></ParsedInfo>;
    }
  };

  return (
    <View style={styles.container}>
      <Text> Hello World </Text>
      {/* //button that runs getData */}
      <Button title="Get Data" onPress={() => importDataHelper()} />
      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            style={styles.imageStyle}
            source={require("../assets/icons/generate-qr.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setReceiveModalVisible(true)}>
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
                <View style={styles.generateQRCode}>{generateQRCode()}</View>
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

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={receiveModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setReceiveModalVisible(!receiveModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.scannerContainer}>
                  <View style={styles.barcodebox}>
                    <BarCodeScanner
                      onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                      }
                      style={{ height: 400, width: 400 }}
                    />
                  </View>
                  {/* <Text style={styles.maintext}>{text}</Text> */}

                  {/* <ParsedInfo text={text}></ParsedInfo> */}
                  {scanned && (
                    <Button
                      title={"Scan again?"}
                      onPress={() => {
                        setScanned(false);
                        setText("Not yet scanned");
                      }}
                      color="tomato"
                    />
                  )}
                  {inputValid(text)}
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setReceiveModalVisible(!receiveModalVisible)}
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
  generateQRCode: {
    alignItems: "center",
    justifyContent: "center",
    height: 350,
    width: 350,
    overflow: "hidden",
    borderRadius: 30,
    marginBottom: 20,
  },
  scannerContainer: {
    padding: 10,
    height: "75%",
    backgroundColor: "white",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    marginBottom: 2,
  },
  textStyle: {
    color: "tomato",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    top: 140,
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
