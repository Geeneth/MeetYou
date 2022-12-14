import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import SocialLinkButton from "./social-link-button";
import SocialLinkDisplay from "./social-link-display";

//a function to cut up a string with the Ω delimiter and return an array into state variable socialLinks
const parseString = (string) => {
  let array = string.split("Ω");
  array.pop();
  return array;
};

function ParsedInfo(props) {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    setSocialLinks(parseString(props.text));
  }, []);

  if (props.text.includes("Not yet scanned")) {
    return (
      <View>
        <Text style={styles.maintext}>{props.text}</Text>
      </View>
    );
  }

  return (
    <View style={styles.scrollArea}>
      <ScrollView>
        {/* map through the array and display the links */}
        {socialLinks.map((link) => {
          return (
            <View key={link}>
              <SocialLinkDisplay platform={link} redirect={link} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default ParsedInfo;

// create the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 20,
    margin: 20,
  },
  scrollArea: {
    height: 220,
    marginTop: 5,
  },
});
