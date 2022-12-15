import QRCode from "react-native-qrcode-svg";

const QRCodeGeneration = (props) => {
    console.log("QRCodeGeneration: " + props.qrString);
return (
<QRCode
        value={props.qrString}
        size={300}
        color="black"
        backgroundColor="white"
      />
);
};

export default QRCodeGeneration;