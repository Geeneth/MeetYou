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
import QRCodeGeneration from "../components/QRCodeGeneration";
import { useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation';
import * as SQLite from 'expo-sqlite';
import { SweepGradient } from "@shopify/react-native-skia";
import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { CoonsPatchMeshGradient } from "../components/gradient/aurora/components/CoonsPatchMeshGradient";
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV()

const db = SQLite.openDatabase('contact90.db');

function HomePage(props) {



  const importData = async () => {
    try {
      const keys = storage.getAllKeys();
      console.log("getallkeys"+keys);
      let rawString = "";
      //put all the keys with "MeetYouLink" into an array
      const filteredKeys = keys.filter((key) => key.includes('MeetYouLink'));
      console.log("filtered keys home page: " + filteredKeys);
      //get the values of the keys
      let values = [];
      filteredKeys.map((key) => {
        const value = storage.getString(key);
        values.push(value);
      });      
      //put the values into state variable socialLinks
      // setSocialLinks(values);
      console.log("chensklandlasdasdkasbdbn:"+values);
      values.map((link) => {
        rawString = rawString + link[0] + "β" + link[1] + "Ω";
      });
      console.log("chensklandlasdasdkasbdbndasdasdasdasdad:"+rawString);

      const tempUserName = storage.getString('MeetYouUserName');
      console.log("temp user name: " + tempUserName);
      rawString =  tempUserName + "Ω" + rawString;
      console.log("rawString finusha: " + rawString);
  
      return rawString;
    } catch (error) {
      console.error(error);
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [receiveModalVisible, setReceiveModalVisible] = useState(false);
  const [qrString, setQrString] = useState("");

  const [hasPermission, setHasPermission] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");
  const [id, setId] = useState('');
  const [qrcode1, setQrcode1] = useState('');
  const [qr, setQr] = useState([]);
  const [socialLinks, setSocialLinks] = useState("");
  const [qrcode, setQrcode] = useState();

 
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql("create table if not exists contacts (id integer primary key not null, qrcode text);");
    });
    updateList();
  }, []);
  //save qr code
  const saveQr = () => {
    console.log("testing database "+ text);
    db.transaction(tx => {
        tx.executeSql('insert into contacts (qrcode) values (?)', [text]);
      }, null, updateList
    )
  }
  
  console.log("testing database "+ qrcode1);
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from contacts;', [], (_, { rows }) =>
        setQr(rows._array)
      ); 
    });
  }
  console.log("testing database "+ qr[1]);
  useEffect(() => {
    importData().then(setQrString);
  }, []);

  //funciton to run importData() and set the state variable
  const importDataHelper = () => {
    importData().then(setQrString);
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

  const generateQRCode = () => {
    importDataHelper();
    console.log("QR String 32222: " + qrString);
    return (
      <QRCodeGeneration qrString={qrString}/>
    );
  };

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

  const palette = {otto: ["#FEF8C4","#E1F1D5","#C4EBE5","#ECA171","#FFFCF3","#D4B3B7","#B5A8D2","#F068A1","#EDD9A2","#FEEFAB","#A666C0","#8556E5","#DC4C4C","#EC795A","#E599F0","#96EDF2",],will: ["#2D4CD2","#36B6D9","#3CF2B5","#37FF5E","#59FB2D","#AFF12D","#DABC2D","#D35127","#D01252","#CF0CAA","#A80DD8","#5819D7",],skia: ["#61DAFB","#dafb61","#61fbcf","#61DAFB","#fb61da","#61fbcf","#dafb61","#fb61da","#61DAFB","#fb61da","#dafb61","#61fbcf","#fb61da","#61DAFB","#dafb61","#61fbcf",],};

  return (
    <View style={styles.container}>
      <Text> Hello World </Text>
      {/* //button that runs getData */}
      {/* <Button title="Get Data" onPress={() => importDataHelper()} /> */}
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
                
                <Button
                  title="Save Contact"
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                  onPress={() => {
                    console.log("Text TESTING OOGA BOOGA: " + text);
                    saveQr();  // Update the value of qr code in asyncstorage
                  }}  
                />    
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
      <View style={styles.gradient}>  
        <CoonsPatchMeshGradient
          rows={3}
          cols={3}
          colors={palette.skia}
        />
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
  gradient: {
    position: "absolute",
    zIndex: -1,
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
