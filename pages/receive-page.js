import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from "@react-native-async-storage/async-storage";

const db = SQLite.openDatabase('contact88.db');

export default function App() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [qrcode, setQrcode] = useState('');
  const [qr, setQr] = useState([]);
  const [contacts, setContacts] = useState([]);
  //qrcode1 carries the AsyncStorage Value and has to be let 
  //so that we dont get error saying its a read only
  let qrcode1

  //retrieving the scanned qr from Home page
  AsyncStorage.getItem('QrCode')
  .then(text =>{
    qrcode1 = text;
    console.log("Async Test " + qrcode1);
    setQrcode(qrcode1);
  })
  .catch(error => console.log(error));

  //tried to do the useeffect here so that it runs automatically when
  //'name' state is updated
  useEffect(() => {
    // setQrcode(qrcode1);
  }, [name]);

//create table in database contact.db
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists contacts (id integer primary key not null, name text, qrcode text);');
    });
    updateList();
  }, []);

//save contact
  const saveContact = () => {
    db.transaction(tx => {
        tx.executeSql('insert into contacts (name, qrcode) values (?, ?)', [name, qrcode]);
      }, null, updateList
    )
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from contacts;', [], (_, { rows }) =>
        setContacts(rows._array)
      ); 
    });
  }

  //This doesnt work if you can fix it please do
  //Supposed to get the text value for the scanned code from
  //homepage but it doesnt seem to be updated over on this page
  //it does get inserted into the table at home-page though
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql("select * from qrcode", [], (_, { rows }) => {
        setQr(rows._array);
      });
    });
  }, []);
  
  console.log("testing database in contacts "+ JSON.stringify(qr));

//delete contact instantly without apple alert
  const deleteContact = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from contacts where id = ?;`, [id]);
      }, null, updateList
    )
  }

//delete contact with apple popup alert and asks the user again
  const deleteAlert = (itemId) => {
    Alert.alert(
      "Are you sure you want to delete this contact?",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => deleteContact(itemId) }
      ]
    );
  }

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
      <Button title="Save" onPress={saveContact} />
      <Button title="Testing Async" onPress={() => console.log("QrCode Test: "+qrcode1)} />
      <ScrollView>
        {contacts.map((item) => (
          <View key={item.id} style={styles.listcontainer}>
            <Text>Name: {item.name}</Text>
            <Text>QR: {item.qrcode}</Text>
            <Button title="Delete" onPress={() => deleteContact(item.id)} />
            <Button title="Delete3" onPress={() => deleteAlert(item.id)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

//dogshit styling courtesy of me
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    margin: 10,
    width: '95%'
  },
  listcontainer: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  }
});

