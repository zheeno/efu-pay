import React, { Component } from "react";
import { TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import {
  StyleProvider,
  Container,
  Button,
  Form,
  Item,
  Icon,
  Label,
  View,
  Text,
  Input,
  Card,
  CardItem,
  Body,
  List,
  SwipeRow,
  H1
} from "native-base";
import getTheme from "../../../native-base-theme/components";
import efuTheme from "../../../native-base-theme/variables/efuTheme";
import { styles } from "../../../native-base-theme/variables/customStyles";
import { NativeModules } from "react-native";
import { LoaderOverlay, ErrorOverlay } from "../../components/MiscComponents";
import { GetData } from "../../services/ApiInterface";
// import NfcManager, {
//   Ndef,
//   NfcTech,
//   ByteParser
// } from "react-native-nfc-manager";

const ScannerModule = NativeModules.ScannerModule;

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

export default class payWithFuelCard extends Component {
  componentDidMount() {
    this.getNavParams();
  }

  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      cart: [],
      total: 0,
      nfcOn: false,
      ajaxCallState: 200,
      ajaxCallError: null,
      // card holder details
      fuelCardNo: "",
      cardDataFetched: false,
      cardValid: false,
      cardPin: "",
      cardHolder: "Jon Snow",
      companyName: "The Night's Watch"
    };
    this.getNavParams = this.getNavParams.bind(this);
    this.togNFC = this.togNFC.bind(this);
    this.initiateQRScan = this.initiateQRScan.bind(this);
    this.pay = this.pay.bind(this);
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
    this.setState({ fuelCardNo: barcode, fetching: true });
    // fetch card details from the efull wallet server
    setTimeout(() => {
      this.setState({
        fetching: false,
        cardDataFetched: true,
        cardValid: true
      });
    }, 5000);
  };

  getNavParams() {
    cart = this.props.navigation.state.params.cart || null;
    this.setState({ cart: cart });
    var total = 0;
    setTimeout(() => {
      this.state.cart.forEach(item => {
        total += item.itemPrice;
      });
      this.setState({ total: total });
    }, 3000);
  }

   togNFC() {
  //   if (!this.state.nfcOn) {
  //     //if nfc is turned off
  //     NfcManager.isSupported(NfcTech.MifareClassic)
  //       .then(() => {
  //         // NFC is supported
  //         NfcManager.isEnabled()
  //           .then(() => {
  //             // NFC is enabled
  //             // start listening for NFC swipe event
  //             this.setState({ nfcOn: true });
  //             ToastAndroid.show(
  //               `NFC Activated. Please place your card on the reader`,
  //               ToastAndroid.LONG
  //             );
  //             NfcManager.start({
  //               onSessionClosedIOS: () => {
  //                 this.setState({ nfcOn: false });
  //                 ToastAndroid.show(`IOS Session closed`, ToastAndroid.SHORT);
  //               }
  //             })
  //               .then(result => {
  //                 ToastAndroid.show(`Start Ok`, ToastAndroid.SHORT);
  //                 NfcManager.registerTagEvent(tag => alert("TAG: " + tag));
  //               })
  //               .catch(error => {
  //                 alert("device does not support nfc!" + error);
  //                 ToastAndroid.show(
  //                   `NFC not supported on this device ` + error,
  //                   ToastAndroid.LONG
  //                 );
  //                 this.setState({ nfcOn: false });
  //               });
  //           })
  //           .catch(err => {
  //             // NFC is disabled
  //             // alert the user then navigate to the device's NFC settings
  //             ToastAndroid.show(err, ToastAndroid.LONG);
  //             this.setState({ nfcOn: false });
  //             setTimeout(() => {
  //               NfcManager.goToNfcSetting();
  //             }, 5000);
  //           });
  //       })
  //       .catch(err => alert(err));
  //   } else {
  //     this.setState({ nfcOn: false });
  //   }
   }

  pay() {
    const { navigate } = this.props.navigation;
    this.setState({
      fetching: true
    });
    GetData(
      "pay?cardType=fuelCard&cardNo=" +
        this.state.fuelCardNo +
        "&cardPin=" +
        this.state.cardPin
    )
      .then(result => {
        let response = result;
        this.setState({
          fetching: false,
          ajaxCallState: 200,
          ajaxCallError: null
        });
        if (response.paymentStatus == "success") {
          // navigate to success page with response data
          navigate("paymentSuccess", {
            data: response
          });
        } else {
          // navigate to failed page with response data
          navigate("paymentFailed", {
            data: [{ errorMessage: "Insufficient Funds" }]
          });
        }
      })
      .catch(error => {
        this.setState({
          fetching: false,
          ajaxCallState: "NET_ERR",
          ajaxCallError: error.message
        });
        // for test purposes
        navigate("paymentSuccess", {
          data: [{ errorMessage: "Insufficient Funds" }]
        });
      });
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <StyleProvider style={getTheme(efuTheme)}>
        <Container style={[styles.flexColumn]}>
          {/* row 1 */}
          <View
            style={[
              styles.flexColumn,
              {
                alignContent: "center",
                justifyContent: "center"
              }
            ]}
          >
            {!this.state.cardDataFetched ? (
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  alignContent: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onPress={this.togNFC}
                >
                  <Icon
                    style={
                      this.state.nfcOn
                        ? { color: "#ef6c00", fontSize: 80 }
                        : { color: "#777", fontSize: 80 }
                    }
                    name={this.state.nfcOn ? "ios-wifi" : "ios-wifi-outline"}
                  />
                  {this.state.nfcOn ? (
                    <Text>Deactivate NFC</Text>
                  ) : (
                    <Text>Activate NFC</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onPress={this.initiateQRScan}
                >
                  <Icon
                    style={{ color: "#ef6c00", fontSize: 80 }}
                    name="ios-qr-scanner"
                  />
                  <Text>Scan QR Code</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            <View
              style={{
                flex: 3
              }}
            >
              {// check if there's a network request in progress
              this.state.fetching ? (
                <LoaderOverlay text={"Fetching... Please wait"} />
              ) : this.state.ajaxCallState == "NET_ERR" ? (
                <ErrorOverlay
                  text={this.state.ajaxCallError}
                  tryAgain={this.pay}
                />
              ) : this.state.cardDataFetched ? (
                this.state.cardValid ? (
                  <ScrollView>
                    <View style={{ paddingHorizontal: 10, flex: 1 }}>
                      <Card style={[styles.bgOrange, { flex: 2 }]}>
                        <CardItem style={styles.bgOrange}>
                          <Body style={{ paddingVertical: 30 }}>
                            {/* card number */}
                            {this.state.fuelCardNo.length > 0 ? (
                              <View>
                                <Text style={{ color: "#FFF", fontSize: 25 }}>
                                  {this.state.fuelCardNo}
                                </Text>
                              </View>
                            ) : null}
                            {/* card holder */}
                            {this.state.cardHolder.length > 0 ? (
                              <View>
                                <Text style={{ fontSize: 18 }}>
                                  {this.state.cardHolder}
                                </Text>
                              </View>
                            ) : null}
                            {/* company name */}
                            {this.state.companyName.length > 0 ? (
                              <View>
                                <Text note style={styles.whiteText}>
                                  {this.state.companyName}
                                </Text>
                              </View>
                            ) : null}
                          </Body>
                        </CardItem>
                      </Card>

                      {/* input PIN */}
                      <Form
                        style={{
                          flex: 2,
                          paddingHorizontal: 20
                        }}
                      >
                        <Item floatingLabel>
                          <Label style={styles.inputLabel}>Fuel Card PIN</Label>
                          <Input
                            ref={component => (inputPassword = component)}
                            autoFocus
                            returnKeyType="done"
                            keyboardType="numeric"
                            defaultValue={this.state.cardPin}
                            secureTextEntry
                            maxLength={4}
                            onChangeText={PIN => {
                              this.setState({
                                cardPin: PIN
                              });
                            }}
                            style={[styles.inputField, { width: 50 }]}
                          />
                        </Item>
                      </Form>
                      <View
                        style={{
                          marginTop: 10,
                          flex: 4,
                          justifyContent: "flex-end"
                        }}
                      >
                        <View
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 5
                          }}
                        >
                          <View>
                            <Text style={{ color: "#666", fontSize: 18 }}>
                              Total
                            </Text>
                            <H1 style={{ alignSelf: "flex-end" }}>
                              &#8358;{this.state.total.toFixed(2)}
                            </H1>
                          </View>
                          <View style={{ paddingTop: 10 }}>
                            <Button block iconLeft light>
                              <Icon name="ios-close" />
                              <Text>Cancel Transaction</Text>
                            </Button>
                          </View>
                          <View style={{ paddingTop: 10 }}>
                            <Button
                              block
                              iconLeft
                              disabled={
                                this.state.cardPin.length >= 4 ? false : true
                              }
                              style={
                                this.state.cardPin.length >= 4
                                  ? styles.bgOrange
                                  : styles.bgDark
                              }
                              onPress={this.pay}
                            >
                              <Icon name="v-card" type="Entypo" />
                              <Text>Pay</Text>
                            </Button>
                          </View>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                ) : (
                  <View style={{ paddingHorizontal: 10 }}>
                    <Text>
                      Dear Customer, the fuel card is invalid, please try a
                      valid card. Thank You
                    </Text>
                  </View>
                )
              ) : (
                <Form
                  style={{
                    paddingHorizontal: 20
                  }}
                >
                  <Item floatingLabel>
                    <Label style={styles.inputLabel}>Fuel Card No.</Label>
                    <Input
                      returnKeyType="done"
                      defaultValue={this.state.fuelCardNo}
                      onChangeText={newText => {
                        this.setState({
                          fuelCardNo: newText
                        });
                      }}
                      style={styles.inputField}
                    />
                  </Item>
                  <View style={{ flex: 1, paddingTop: 20 }}>
                    <Button
                      disabled={this.state.cart.length == 0 ? true : false}
                      light
                      iconLeft
                      block
                      style={[styles.bgOrange]}
                    >
                      <Icon
                        style={[styles.whiteText]}
                        name="v-card"
                        type="Entypo"
                      />
                      <Text style={[styles.whiteText]}>Pay</Text>
                    </Button>
                  </View>
                </Form>
              )}
            </View>
          </View>
        </Container>
      </StyleProvider>
    );
  }
}
