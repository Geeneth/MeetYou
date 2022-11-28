import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import SocialLinkButton from "../components/social-link-button";

function ReceivePage(props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Geeneth Kulatunge</Text>
      </View>
      <View style={styles.linksContainer}>
        <SocialLinkButton
          platform="Facebook"
          link="https://www.facebook.com/"
        />
        <SocialLinkButton
          platform="Instagram"
          link="https://www.instagram.com/"
        />
        <SocialLinkButton platform="Twitter" link="https://www.twitter.com/" />
      </View>
      <View style={styles.bottomButtons}>
        <View style={styles.saveButton}>
          <Button
            color="black"
            title="Save"
            onPress={() => console.log("Saved")}
          />
        </View>
        <View style={styles.doneButton}>
          <Button
            color="black"
            title="Done"
            onPress={() => console.log("Done")}
          />
        </View>
      </View>
    </View>
  );
}

export default ReceivePage;

const styles = StyleSheet.create({
    container: {
      padding: 50,
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
});
