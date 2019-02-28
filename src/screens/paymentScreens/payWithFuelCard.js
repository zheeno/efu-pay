import React, { Component } from "react";
import { StackActions, NavigationActions } from "react-navigation";
import { ScrollView, NativeModules } from "react-native";
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
  H1,
  Fab,
  Toast
} from "native-base";
import getTheme from "../../../native-base-theme/components";
import efuTheme from "../../../native-base-theme/variables/efuTheme";
import { styles } from "../../../native-base-theme/variables/customStyles";
import { ErrorOverlay, PaymentSlate } from "../../components/MiscComponents";
import { GetData } from "../../services/ApiInterface";
import NumberFormat from "react-number-format";
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
      cardPinValid: true,
      cardHolder: "Jon Snow",
      companyName: "The Night's Watch",
      cardExpires: "12/25"
    };
    this.getNavParams = this.getNavParams.bind(this);
    this.togNFC = this.togNFC.bind(this);
    this.initiateQRScan = this.initiateQRScan.bind(this);
    this.pay = this.pay.bind(this);
    this.payWithNewCard = this.payWithNewCard.bind(this);
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

  async getNavParams() {
    var total = 0;
    cart = this.props.navigation.state.params.cart || null;
    await this.setState({ cart: cart });
    await this.state.cart.forEach(item => {
      total += item.itemPrice;
    });
    await this.setState({ total: total });
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

  payWithNewCard() {
    this.setState({
      cardDataFetched: false,
      cardValid: false
      // cardExpires: "",
      // cardHolder: "",
      // cardPin: "",
      // fuelCardNo: ""
    });
  }

  async pay() {
    if (this.state.cardPin.length == 0) {
      Toast.show({
        text: "Please input your card PIN",
        buttonText: "Dismiss",
        buttonTextStyle: { color: "#fff" },
        buttonStyle: { borderWidth: 1, borderColor: "#fff" },
        duration: 5000,
        position: "bottom",
        type: "danger"
      });
    } else {
      const { navigate } = this.props.navigation;
      this.setState({
        fetching: true
      });
      await GetData(
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

            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: "paymentSuccess" })
              ]
            });
            this.props.navigation.dispatch(resetAction);
            navigate("paymentSuccess", {
              data: this.state.cart,
              paymentMode: "Fuel Card"
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
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <StyleProvider style={getTheme(efuTheme)}>
        {this.state.ajaxCallState == "NET_ERR" ? (
          <ErrorOverlay text={this.state.ajaxCallError} />
        ) : (
          <Container style={[styles.flexColumn]}>
            <ScrollView style={[{ flex: 1 }]}>
              <View style={styles.flexColumn}>
                <PaymentSlate
                  cart={this.state.cart}
                  defaultBg={"#3B5998"}
                  total={this.state.total}
                  card={this.state.card}
                  cardIconName={"v-card"}
                  cardIconType={"Entypo"}
                  cardDataFetched={this.state.cardDataFetched}
                  cardValid={this.state.cardValid}
                  fetching={this.state.fetching}
                />
                {this.state.cardDataFetched == false ? (
                  /* initial screen state before card details have been read */
                  <View
                    style={{ flex: 4, paddingTop: 70, paddingHorizontal: 10 }}
                  >
                    <H1 style={{ color: "#333", alignSelf: "center" }}>
                      How to use this mode
                    </H1>
                    <Text style={{ marginVertical: 10 }}>
                      Kindly swipe the Efull Fuel Card across the NFC reader
                      (find the{" "}
                      <Icon name="ios-wifi" style={{ fontSize: 20 }} /> logo on
                      the MPOS device).
                    </Text>
                    <Text>
                      Alternatively, you could also scan the QR code on the Fuel
                      Card by pressing the button with the{" "}
                      <Icon name="ios-qr-scanner" style={{ fontSize: 20 }} />{" "}
                      icon at the bottom right corner of the screen.
                    </Text>
                  </View>
                ) : // check if card detailes are valid
                this.state.cardValid ? (
                  // valid card. show card details and request for PIN
                  <View
                    style={{
                      zIndex: -1,
                      flex: 4,
                      paddingTop: 10,
                      paddingHorizontal: 10
                    }}
                  >
                    <Card style={[styles.bgGrey, { flex: 2 }]}>
                      <CardItem>
                        <Body style={{ paddingTop: 30 }}>
                          {/* card number */}
                          {this.state.fuelCardNo.length > 0 ? (
                            <NumberFormat
                              value={this.state.fuelCardNo}
                              format="#### #### #### ####"
                              displayType={"text"}
                              renderText={value => (
                                <H1
                                  style={{ color: "#666", alignSelf: "center" }}
                                >
                                  {value}
                                </H1>
                              )}
                            />
                          ) : null}
                          {/* card holder */}
                          {this.state.cardHolder.length > 0 ? (
                            <View>
                              <Text
                                style={{
                                  fontSize: 18,
                                  color: "#666",
                                  fontWeight: "200"
                                }}
                              >
                                {this.state.cardHolder.toUpperCase()}
                              </Text>
                            </View>
                          ) : null}
                          <View style={{ alignSelf: "flex-end" }}>
                            <Text note>Expires</Text>
                            <Text note>{this.state.cardExpires}</Text>
                          </View>
                          {/* company name */}
                          {this.state.companyName.length > 0 ? (
                            <View>
                              <Text note>{this.state.companyName}</Text>
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
                      {!this.state.cardPinValid ? (
                        <Item>
                          <Text style={{ fontSize: 10, color: "red" }}>
                            You have entered an incorrect Card PIN. Please try
                            again.
                          </Text>
                        </Item>
                      ) : null}
                    </Form>
                    <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                      <View style={{ flex: 1 }}>
                        <Button
                          disabled={this.state.fetching}
                          light
                          block
                          iconRight
                        >
                          <Text>Cancel</Text>
                          <Icon name="ios-close" />
                        </Button>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Button
                          disabled={this.state.fetching}
                          onPress={this.pay}
                          style={styles.bgOrange}
                          block
                          iconRight
                        >
                          <Text>Pay</Text>
                          <Icon name="v-card" type="Entypo" />
                        </Button>
                      </View>
                    </View>
                    <View>
                      <View style={{ flex: 1 }}>
                        <Button
                          disabled={this.state.fetching}
                          dark
                          block
                          iconRight
                          onPress={this.payWithNewCard}
                        >
                          <Text>Use a different card</Text>
                          <Icon name="redo" type="EvilIcons" />
                        </Button>
                      </View>
                    </View>
                  </View>
                ) : (
                  // invalid card. Notify user
                  <View
                    style={{
                      flex: 4,
                      alignItems: "center",
                      paddingTop: 70,
                      paddingHorizontal: 10,
                      justifyContent: "center"
                    }}
                  >
                    <Icon
                      name="warning"
                      style={{ fontSize: 60, color: "red", marginBottom: 30 }}
                    />
                    <Text style={{ fontSize: 20, textAlign: "center" }}>
                      Dear customer,{" "}
                    </Text>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>
                      Your Fuel Card has been declined.
                    </Text>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>
                      Please use a valid Efull Fuel Card as payment or pay with
                      a different means.
                    </Text>
                    <Button
                      disabled={this.state.fetching}
                      dark
                      block
                      iconRight
                      onPress={this.payWithNewCard}
                      style={{ marginTop: 20 }}
                    >
                      <Text>Use a different card</Text>
                      <Icon name="redo" type="EvilIcons" />
                    </Button>
                  </View>
                )}
              </View>
            </ScrollView>
            {/* fab */}
            <Fab
              disabled={this.state.fetching}
              active={false}
              direction="up"
              containerStyle={{}}
              style={styles.bgOrange}
              position="bottomRight"
              onPress={this.initiateQRScan}
            >
              <Icon name="ios-qr-scanner" />
            </Fab>
          </Container>
        )}
      </StyleProvider>
    );
  }
}
