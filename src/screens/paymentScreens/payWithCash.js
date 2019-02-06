import React, { Component } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
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
  H1,
  Fab,
  Toast,
  Spinner
} from "native-base";
import { NativeModules } from "react-native";
import getTheme from "../../../native-base-theme/components";
import efuTheme from "../../../native-base-theme/variables/efuTheme";
import { styles } from "../../../native-base-theme/variables/customStyles";
import {
  LoaderOverlay,
  ErrorOverlay,
  PaymentSlate
} from "../../components/MiscComponents";
import { GetData } from "../../services/ApiInterface";
import NumberFormat from "react-number-format";

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
export default class payWithCash extends Component {
  componentDidMount() {
    this.getNavParams();
  }

  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      cart: [],
      total: 0,
      swipeOn: false,
      // card details
      ajaxCallState: null,
      ajaxCallError: null,
      CardNo: "",
      cardPin: "",
      cardDataFetched: false,
      cardValid: false
    };
    this.checkCardValidity = this.checkCardValidity.bind(this);
    this.onBarcodeRead = this.onBarcodeRead.bind(this);
    this.initiateQRScan = this.initiateQRScan.bind(this);
    this.getNavParams = this.getNavParams.bind(this);
  }

  async getNavParams() {
    var total = 0;
    cart = this.props.navigation.state.params.cart || null;
    await this.setState({ cart: cart });
    await this.state.cart.forEach(item => {
      total += item.itemPrice;
    });
    await this.setState({ total: total });
  }

  initiateQRScan() {
    ScannerModule.openCustomScanner(
      true,
      true,
      barcodeTypes,
      this.onBarcodeRead
    );
  }

  async onBarcodeRead(barcode) {
    //do something with barcode value
    this.setState({ csaCardNo: barcode, fetching: true });
    // navigate to success page with response data
    setTimeout(() => {
      this.setState({
        fetching: false,
        cardDataFetched: true,
        cardValid: true
        // ajaxCallState: "NET_ERR",
        // ajaxCallError: "null"
      });
      this.checkCardValidity();
    }, 5000);

    // await GetData("pay?cardType=cash&cardNo=" + this.state.csaCardNo)
    //   .then(result => {
    //     let response = result;
    //     let cardOk = "CARD_INVALID";
    //     // for test purposes, use cardOk as a local variable
    //     cardOk = "CARD_INVALID";
    //     this.setState({
    //       fetching: false,
    //       ajaxCallState: 200,
    //       ajaxCallError: null
    //     });
    //     if (cardOk == "CARD_VALID") {
    //       // navigate to success page with response data
    //       navigate("paymentSuccess", {
    //         data: response
    //       });
    //     } else {
    //       // invalid card
    //       Toast.show({
    //         text:
    //           "Invalid C.S.A card. Please use a valid card assigned to this station",
    //         buttonText: "Dismiss",
    //         buttonTextStyle: { color: "#fff" },
    //         buttonStyle: { borderWidth: 1, borderColor: "#fff" },
    //         duration: 10000,
    //         position: "top",
    //         type: "danger"
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     this.setState({
    //       fetching: false,
    //       ajaxCallState: "NET_ERR",
    //       ajaxCallError: error.message
    //     });
    //     // no internet connection
    //     Toast.show({
    //       text: this.state.ajaxCallError,
    //       buttonText: "Dismiss",
    //       buttonTextStyle: { color: "#fff" },
    //       buttonStyle: { borderWidth: 1, borderColor: "#fff" },
    //       duration: 5000,
    //       position: "top",
    //       type: "danger"
    //     });
    //   });
  }

  checkCardValidity() {
    const { navigate } = this.props.navigation;
    if (this.state.cardValid) {
      navigate("paymentSuccess", {
        data: this.state.cart,
        paymentMode: "Cash"
      });
    } else {
      // do nothing
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme(efuTheme)}>
        {this.state.ajaxCallState == "NET_ERR" ? (
          <ErrorOverlay
            text={this.state.ajaxCallError}
            tryAgain={this.onBarcodeRead(this.state.csaCardNo)}
          />
        ) : (
          <Container style={[styles.flexColumn]}>
            <ScrollView style={[{ flex: 1 }]}>
              {/*  row 1 */}
              <View style={[{ flex: 1 }]}>
                <PaymentSlate
                  cart={this.state.cart}
                  defaultBg={"#3B5998"}
                  total={this.state.total}
                  card={this.state.card}
                  cardIconName={"ios-cash"}
                  cardIconType={"ionicons"}
                  cardDataFetched={this.state.cardDataFetched}
                  cardValid={this.state.cardValid}
                  fetching={this.state.fetching}
                />
                {!this.state.cardDataFetched ? (
                  /* initial screen state before card details have been read */
                  <View
                    style={{ flex: 4, paddingTop: 70, paddingHorizontal: 10 }}
                  >
                    <H1 style={{ color: "#333", alignSelf: "center" }}>
                      How to use this mode
                    </H1>
                    <Text style={{ marginVertical: 10 }}>
                      Kindly swipe your customer service card across the NFC
                      reader (find the{" "}
                      <Icon name="ios-wifi" style={{ fontSize: 20 }} /> logo on
                      the MPOS device).
                    </Text>
                    <Text>
                      Alternatively, you could also scan the QR code on your
                      customer service card by pressing the button with the{" "}
                      <Icon name="ios-qr-scanner" style={{ fontSize: 20 }} />{" "}
                      icon at the bottom right corner of the screen.
                    </Text>
                  </View>
                ) : this.state.cardValid == false ? (
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
                      Your C.S.A Card has been declined.
                    </Text>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>
                      Please use a valid C.S.A Card to record this transaction.
                    </Text>
                    <Button
                      disabled={this.state.fetching}
                      dark
                      block
                      iconRight
                      onPress={this.initiateQRScan}
                      style={{ marginTop: 20 }}
                    >
                      <Text>Use a different card</Text>
                      <Icon name="redo" type="EvilIcons" />
                    </Button>
                  </View>
                ) : null}
              </View>
            </ScrollView>
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
