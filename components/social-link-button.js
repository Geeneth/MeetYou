import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { Linking } from 'react-native'

function SocialLinkButton(props) {
  return (
    <View style={styles.linkStyle}>
      <Button
        color="black"
        //removing the MeetYouLink from the title
        title={props.platform.slice(11, props.platform.length)}
        onPress={() => Linking.openURL(props.redirect)}
      />
    </View>
  );
}

export default SocialLinkButton;

const styles = StyleSheet.create({
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
