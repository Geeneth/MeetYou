import { StyleSheet, Text, View, Button, TextInput, ScrollView } from "react-native";
import SocialLinkButton from "../components/social-link-button";
import SocialLinkAdd from "../components/social-link-add";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Linking } from 'react-native'

function UserInfoPage(props) {
  //state variable for an array of social links
  const [socialLinks, setSocialLinks] = React.useState([]);

  const importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      //put all the keys with "MeetYouLink" into an array
      const filteredKeys = keys.filter((key) => key.includes("MeetYouLink"));
      console.log("filtered keys: " + filteredKeys);
      //get the values of the keys
      const values = await AsyncStorage.multiGet(filteredKeys);
      //put the values into state variable socialLinks
      setSocialLinks(values);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    importData();
  }, []);

  //create a function to store the user's input in async storage
  const storeData = async (userKey, value) => {
    try {
      // const jsonValue = JSON.stringify(value);
      console.log("userKey: " + userKey);
      console.log("value: " + value);
      let key = "MeetYouLink" + userKey;
      await AsyncStorage.setItem(key, value);
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
  const removeValue = async () => {
    try {
      // await AsyncStorage.removeItem("userInfo");
      AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Geeneth Kulatunge</Text>
      </View>

      {/* //map through the counter array and create a new social link button for each element */}

      {/* <SocialLinkAdd /> */}

      {/* create a basic form with formik */}
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
          <View style={styles.linkStyle}>
            <TextInput
              style={styles.input}
              placeholder="Platform Name"
              onChangeText={props.handleChange("platformName")}
              value={props.values.platformName}
            />
            <TextInput
              style={styles.input}
              placeholder="Link"
              onChangeText={props.handleChange("link")}
              value={props.values.link}
            />
            <Button
              title="Submit"
              color="maroon"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>

      {/* //map through the counter array and create a new social link button for each element */}
      <View>
        <ScrollView>
        {socialLinks.map(
          (userInfo) => (
            (
              <View key={userInfo[0]}>
                <SocialLinkButton
                  platform={userInfo[0]}
                  redirect={userInfo[1]}
                />
              </View>
            )
          )
        )}
        </ScrollView>
      </View>

      <View style={styles.bottomButtons}>
        <View style={styles.saveButton}>
          <Button
            color="black"
            title="Save"
            onPress={() => console.log("Saved")}
          />
        </View>
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
  linkStyle: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingTop: 4,
    backgroundColor: "#FFF0F5",
    // fontFamily: "Poppins",
  },
});
