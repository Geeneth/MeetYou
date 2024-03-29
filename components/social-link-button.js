import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { Linking, TouchableOpacity, Image } from "react-native";

function SocialLinkButton(props) {
  //function to handle deleting a social link
  const handleDelete = () => {
    console.log("Delete button pressed");
    props.deleteFunction(props.platform);
  };

  return (
    <View style={styles.linkStyle}>
      <View style={styles.redirectButtonStyle}>
        <Button
          color="black"
          //removing the MeetYouLink from the title
          title={props.platform.slice(11, props.platform.length)}
          onPress={() => Linking.openURL(props.redirect)}
        />
      </View>
      {/* <View style={styles.deleteButton}>
        <Button
          style={styles.deleteButton}
          color="black"
          title="Delete"
          onPress={handleDelete}
        />
      </View> */}
      <View style={styles.deleteIconButton} >
        <TouchableOpacity onPress={handleDelete}>
          <Image
            style={styles.imagestyle}
            source={require("../assets/icons/delete.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SocialLinkButton;

const styles = StyleSheet.create({
  linkStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    marginBottom: 20,
    paddingTop: 4,
    // borderWidth: 2,
    // borderRadius: 10,
    // backgroundColor: "#FFF0F5",
    // fontFamily: "Poppins",
  },
  redirectButtonStyle: {
    width: "80%",
    height: "100%",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#FFF0F5",
    // fontFamily: "Poppins",
  },
  deleteButton: {
    width: "20%",
    height: "100%",
    borderWidth: 2,
    borderRadius: 10,
    // fontFamily: "Poppins",
  },
  deleteIconButton: {
    width: "20%",
    height: "100%",
    borderWidth: 2,
    borderRadius: 10,
    // fontFamily: "Poppins",
  },
});
