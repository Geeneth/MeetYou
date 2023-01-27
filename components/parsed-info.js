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

const platformParser = (link) => {
  let array = link.split("β");
  return array[0];
};

const redirectParser = (link) => {
  let array = link.split("β");
  return array[1];
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
    <View>
      <Text style={styles.maintext}>{socialLinks[0]}</Text>
      <View style={styles.scrollArea}>
        <ScrollView>
          {/* map through the array and display the links */}
          {socialLinks.map((link) => {
            if (link == socialLinks[0]) {
            } else {
              return (
                <View key={link}>
                  <SocialLinkDisplay
                    platform={platformParser(link)}
                    redirect={redirectParser(link)}
                  />
                </View>
              );
            }
          })}
        </ScrollView>
      </View>
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
