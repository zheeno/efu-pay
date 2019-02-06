import React, { Component } from "react";
import { ScrollView, TextInput, AsyncStorage } from "react-native";
import {
  StyleProvider,
  Container,
  Button,
  Form,
  Item,
  Icon,
  Right,
  Label,
  View,
  Text,
  Input,
  H1,
  Card,
  CardItem,
  Body
} from "native-base";
import getTheme from "../../native-base-theme/components";
import efuTheme from "../../native-base-theme/variables/efuTheme";
import { styles } from "../../native-base-theme/variables/customStyles";
import { NativeModules } from "react-native";

const ScannerModule = NativeModules.ScannerModule;
/*
--Linking the byteworks api to react native
After importing the .aar file and 'syncing' it in android studio,
the module is made available to the NativeModules object
which makes it easy for us to access the various methods and functions
from react native.

For example, we declare a constant like so:
    const LandiModule = NativeModules.LandiModule;
the we call the activity
*/
var barcodeTypes = [
  "QR_CODE",
  "DATA_MATRIX",
  "UPC_A",
  "UPC_E",
  "EAN_8",
  "EAN_13",
  "RSS_14",
  "CODE_39",
  "CODE_93",
  "CODE_128",
  "ITF",
  "RSS_EXPANDED",
  "QR_CODE",
  "DATA_MATRIX",
  "PDF_417"
];
export default class AssignPump extends Component {
  componentDidMount() {
    AsyncStorage.getItem("savedPump").then((savedPump) => {
      if(null != savedPump){
        this.setState({pumpId: savedPump})
      }
    }).done();
    this.initiateQRScan();
  }

  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      pumpId: null
    };
    this.initiateQRScan = this.initiateQRScan.bind(this);
  }

  initiateQRScan() {
    ScannerModule.openCustomScanner(
      true,
      true,
      barcodeTypes,
      this.onBarcodeRead
    );
  }

  onBarcodeRead = barcode => {
    //do something with barcode value
    AsyncStorage.setItem("savedPump", barcode)
    this.setState({ pumpId: barcode });
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <StyleProvider style={getTheme(efuTheme)}>
        <Container style={[styles.flexColumn]}>
          <View
            button
            style={[
              styles.bgGrey,
              {
                flex: 5,
                paddingHorizontal: 10,
                paddingVertical: 20,
                justifyContent: "center",
                alignItems: "center"
              }
            ]}
          >
            <Card>
              <CardItem
                button
                onPress={this.initiateQRScan}
                style={{ width: 200, alignItems: "center" }}
              >
                <Body style={{ alignItems: "center" }}>
                  <Icon name="ios-qr-scanner" style={{ fontSize: 150 }} />
                </Body>
              </CardItem>
            </Card>
            <Text style={[styles.inputLabel]}>Scan Pump&apos;s QR Code</Text>
          </View>
          <View
            style={{
              flex: 6
            }}
          >
            <Form
              style={{
                flex: 1,
                alignContent: "center",
                paddingTop: 20,
                paddingHorizontal: 20
              }}
            >
              <Item floatingLabel>
                <Label style={styles.inputLabel}>Fuel Pump Id</Label>
                <Input
                  returnKeyType="next"
                  defaultValue={this.state.pumpId}
                  onChangeText={newText => {
                    this.setState({
                      pumpId: newText,
                      source: "Input Field"
                    });
                  }}
                  style={styles.inputField}
                />
              </Item>
            </Form>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 16, color: "#666" }}>Current Pump</Text>
              <H1>{this.state.pumpId}</H1>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row-reverse" }}>
            <Button
              androidRippleColor="#ef6c00"
              bordered={false}
              transparent={true}
              style={[{ alignSelf: "flex-end" }]}
              onPress={() => navigate("Home")}
            >
              <Text style={styles.orangeText}>Proceed >></Text>
            </Button>
          </View>
        </Container>
      </StyleProvider>
    );
  }
}
