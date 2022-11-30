import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import SocialLinkButton from "../components/social-link-button";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserInfoPage from "./user-info-page";
import ReceivePage from "./receive-page";
import Navigation from "./navigation";
import QRCode from "react-native-qrcode-svg";

function HomePage(props) {

  const generateQRCode = () => {
    return (
      <QRCode
        value="https://www.instagram.com/not_geeneth/"
        size={200}
        color="black"
        backgroundColor="white"
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text> Hello World </Text>
      <View>
        <TouchableOpacity onPress={() => console.log("Pressed")}>
          <Image
            style={styles.imageStyle}
            source={require("../assets/icons/generate-qr.png")}
          />
        </TouchableOpacity>
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
  imageStyle: {
    width: 100,
    height: 100,
    alignSelf: "center",
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
