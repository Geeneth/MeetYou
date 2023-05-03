import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ParsedInfo from "../components/parsed-info";
import Navigation from "./navigation";
import {Card, CardProps} from 'tamagui'

const db = SQLite.openDatabase("contact90.db");

export default function App() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [currentContact, setCurrentContact] = useState("");
  const [qr, setQr] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  //qrcode1 carries the AsyncStorage Value and has to be let
  //so that we dont get error saying its a read only
  let qrcode1;

  const openContact = (item) => {
    setModalVisible(true);
    setCurrentContact(item);
  };

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from contacts;', [], (_, { rows }) =>
        setContacts(rows._array)
      );
    });
  }

  //delete contact instantly without apple alert
  const deleteContact = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from contacts where id = ?;`, [id]);
      },
      null,
      updateList
    );
  };

  const selectContacts = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from contacts", [], (_, { rows }) =>
        setContacts(rows._array)
      );
    });

  };

  //delete contact with apple popup alert and asks the user again
  const deleteAlert = (itemId) => {
    Alert.alert(
      "Are you sure you want to delete this contact?",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => deleteContact(itemId) },
      ]
    );
  };

  const deleteAll = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from contacts");
      },
      null,
      updateList
    );
  };

  const getName = (code) => {    
    return code.split("Ω")[0];
  };

  return (
    //user inputs Contact Name
    //figure out how to get setQrcode(qrcode1) added after
    //the name input as this is where we save everything into
    //the database
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={(name) => setName(name)}
      />
      {/* <Button title="Save" onPress={saveContact} /> */}
      {/* <Button title="DeleteAll" onPress={deleteAll} /> */}
      <Button
        title="Testing Async"
        onPress={() => console.log("QrCode Test: " + qrcode1)}
      />
      <ScrollView>
        {selectContacts()}
        {contacts.map((item) => (
          <Card
          animation="bouncy"
          size="$4"
          scale={0.9}
          hoverStyle={{ scale: 0.925 }}
          pressStyle={{ scale: 0.875 }}
          key={item.id} style={styles.listcontainer}
          onPress={() => openContact(item.qrcode)}
          >
            {/* <View>
              <ParsedInfo text={item.qrcode} />
            </View> */}
            <Text style={styles.containername}>{getName(item.qrcode)}</Text>            
            <Button title="Delete3" onPress={() => deleteAlert(item.id)} />
          </Card>
        ))}
      </ScrollView>

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
              <View>
                <ParsedInfo text={currentContact} />
              </View>
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
  );
}

//dogshit styling courtesy of me
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252424",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    margin: 10,
    width: "95%",
  },
  listcontainer: {
    backgroundColor: "rgba(95, 180, 249,0.3)",
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#5FB4F9",
    
  },
  modalView: {
    margin: 20,
    marginTop: 100,
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
  containername: {
    alignSelf: "center",
    opacity: 1,
    fontSize: 20,
  },
});
