import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import SocialLinkButton from "../components/social-link-button";
import SocialLinkAdd from "../components/social-link-add";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Linking } from "react-native";
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

function UserInfoPage(props) {
  //state variable for an array of social links
  const [socialLinks, setSocialLinks] = React.useState([]);
  const [userName, setUserName] = React.useState("New User");
  const [text, onChangeText] = React.useState("New User");

  const setDefaultName = async () => {
    try {
      //check if the user has a name stored in AsyncStorage
      let userName = storage.getString('MeetYouUserName');
    } catch (e) {
      console.log(e);
    }
    //if the user has a name stored in AsyncStorage, set the state variable userName to that name
    if (userName == null || userName == "") {
      try {
        storage.set('MeetYouUserName', 'New User');
      } catch (e) {
        console.log(e);
      }
    }
  };

  const importData = async () => {
    try {
      const keys = storage.getAllKeys();
      //put all the keys with "MeetYouLink" into an array
      const filteredKeys = keys.filter((key) => key.includes("MeetYouLink"));
      console.log("filtered keys: " + filteredKeys);
      //get the values of the keys
      let values = [];
      const mapper = filteredKeys.map((key) => {
        const value = storage.getString(key);
        values.push(value);
      });     
      //put the values into state variable socialLinks
      setSocialLinks(values);
      console.log("values stored link:"+values);
      console.log("values stored link in social links:"+socialLinks);
      // map through the filteredKey and add the values to the AsyncStorage
      filteredKeys.map(async (key) => {
        let combinedString = combinedString + values[index] + "Ω";
        storage.set('combinedString', combinedString);
      });

      //get the user's name
      let userName =  storage.getString('MeetYouUserName');
      setUserName(userName);
      onChangeText(userName);
      console.log("User Name: " + userName);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    importData();
    setDefaultName();
  }, []);

  //create a function to store the user's input in async storage
  const storeData = async (userKey, value) => {
    try {
      // const jsonValue = JSON.stringify(value);
      console.log("userKey: " + userKey);
      console.log("value: " + value);
      let key = "MeetYouLink" + userKey;
      storage.set(key, value);
      // getData();
      setSocialLinks([...socialLinks, ["MeetYouLink" + userKey, value]]);
      //output the social links to the console
    } catch (e) {
      console.log(e);
    }
    // console.log("SocialLinks Array: ",socialLinks);
    importData();
    console.log("Social Links Array: " + socialLinks);
  };
  console.log("values stored link sociallinks2:"+socialLinks);


  //create a function to retrieve the user's input from async storage
  // const getData = async (userKey) => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem(userKey);
  //     // return jsonValue != null ? JSON.parse(jsonValue) : null;
  //     console.log(jsonValue);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  //create a function to delete the user's input from async storage

  const updateName = async (newName) => {
    try {
      storage.set('MeetYouUserName', newName);
    } catch (e) {
      console.log(e);
    }
    importData();
    onChangeText(newName);
  };

  const removeValue = async (removePlatform) => {
    try {
      storage.delete(removePlatform);
      // AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
    importData();
  };

  const removeAll = async () => {
    try {
      // await AsyncStorage.removeItem("userInfo");
      storage.clearAll();
    } catch (e) {
      console.log(e);
    }
    importData();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{userName}</Text>
      </View>

      <View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => updateName(text)}
          value={text}
          placeholder="Enter your name"
        />
      </View>

      {/* //map through the counter array and create a new social link button for each element */}

      {/* <SocialLinkAdd /> */}

      {/* create a basic form with formik */}
      <View style={styles.formArea}>
        <Formik
          initialValues={{ platformName: "", link: "" }}
          onSubmit={(values) => {
            storeData(values.platformName, values.link);
            // getData(values.platformName);
            // removeValue();
            //empty the state variable for social links
            // setSocialLinks([]);
          }}
        >
          {(props) => (
            // create a view to hold the form elements
            <View>
              <TextInput
                style={styles.formInput}
                placeholder="Platform Name"
                onChangeText={props.handleChange("platformName")}
                value={props.values.platformName}
              />
              <TextInput
                style={styles.formInput}
                placeholder="Link"
                onChangeText={props.handleChange("link")}
                value={props.values.link}
              />
              <Button
                style={styles.formButton}
                title="Submit"
                color="maroon"
                onPress={props.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>

      {/* //map through the counter array and create a new social link button for each element */}
      <View style={styles.scrollArea}>
        <ScrollView>
          {socialLinks.map((userInfo) => (
            <View key={userInfo[0]}>
              <SocialLinkButton
                platform={userInfo[0]}
                redirect={userInfo[1]}
                deleteFunction={removeValue}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.deleteButton}>
        <Button color="black" title="Delete All" onPress={() => removeAll()} />
      </View>
    </View>
  );
}

export default UserInfoPage;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    height: "100%",
  },
  linksContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "80%",
    marginRight: 10,
  },
  title: {
    fontSize: 30,
    //   fontFamily: "Poppins",
    fontWeight: "bold",
    padding: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  edit: {
    //put this at the bottom of the page
    position: "absolute",
    bottom: 100,
    alignSelf: "center",

    flexDirection: "column",
    justifyContent: "space-between",
    height: 50,
    width: "80%",
    borderWidth: 2,
    borderRadius: 10,
    paddingTop: 4,
    backgroundColor: "yellow",
    //   fontFamily: "Poppins",
  },

  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },

  saveButton: {
    width: "45%",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#33C4FF",
    //   fontFamily: "Poppins",
  },
  doneButton: {
    width: "45%",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "lime",
    //   fontFamily: "Poppins",
  },
  formArea: {
    width: "100%",
  },
  formInput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "80%",
    marginBottom: 10,
    borderRadius: 10,
  },
  formButton: {},
  scrollArea: {
    height: "50%",
    width: "100%",
    marginTop: 30,
  },
  deleteButton: {
    width: "45%",
    borderWidth: 2,
    borderRadius: 10,
  },
  bottomUserButton: {
    marginTop: 20,
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
});
