import { StyleSheet, Text, View, Button, TextInput } from "react-native";

function SocialLinkAdd(props) {
  return (
    <View style={styles.inputPairContainer}>
      <Text style={styles.label}>Add Social Media Name and Link</Text>
      <TextInput style={styles.input} placeholder="Platform Name" />
      <TextInput style={styles.input} placeholder="Link" />
    </View>
  );
}

export default SocialLinkAdd;

const styles = StyleSheet.create({
  inputPairContainer: {
    // flexDirection: "column",
    // justifyContent: "space-between",
    // height: 50,
    // borderWidth: 2,
    // borderRadius: 10,
    // marginBottom: 20,
    // paddingTop: 4,
    // backgroundColor: "#FFF0F5",
    // fontFamily: "Poppins",
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "100%",
    marginRight: 10,
    marginBottom: 10,
  },
  label: {
    fontFamily: "Poppins",
    marginBottom: 10,
  },
  
});
