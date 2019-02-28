import React, { Component } from "react";
import { StackActions, NavigationActions } from "react-navigation";
import { NativeModules, ScrollView, Modal } from "react-native";
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
  H1,
  Fab,
  Body,
  H3,
  Toast
} from "native-base";
import getTheme from "../../../native-base-theme/components";
import efuTheme from "../../../native-base-theme/variables/efuTheme";
import { styles } from "../../../native-base-theme/variables/customStyles";
import { ErrorOverlay, PaymentSlate } from "../../components/MiscComponents";

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
export default class payWithWallet extends Component {
  componentDidMount() {
    this.getNavParams();
  }

  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      cart: [],
      total: 0,
      modalVisible: false,
      walletDataFetched: false,
      walletPinValid: true,
      walletPhoneNo: "",
      walletPin: "",
      walletValid: false,
      active: true
    };
    this.checkWalletValidity = this.checkWalletValidity.bind(this);
    this.initiateQRScan = this.initiateQRScan.bind(this);
    this.onBarcodeRead = this.onBarcodeRead.bind(this);
    this.getNavParams = this.getNavParams.bind(this);
    this.verifyWalletCred = this.verifyWalletCred.bind(this);
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

  verifyWalletCred() {
    if (this.state.walletPhoneNo.length > 0) {
      if (this.state.walletPin.length > 0) {
        // send credentials to efull wallet server for verifiction
        this.setState({ fetching: true, modalVisible: false });
        setTimeout(() => {
          this.setState({
            fetching: false,
            walletValid: true,
            walletPinValid: true
          });
          this.checkWalletValidity();
        }, 5000);
      } else {
        Toast.show({
          text: "Please Input a wallet password",
          buttonText: "Dismiss",
          buttonTextStyle: { color: "#fff" },
          buttonStyle: { borderWidth: 1, borderColor: "#fff" },
          duration: 5000,
          position: "bottom",
          type: "danger"
        });
      }
    } else {
      Toast.show({
        text: "Please input wallet Phone No.",
        buttonText: "Dismiss",
        buttonTextStyle: { color: "#fff" },
        buttonStyle: { borderWidth: 1, borderColor: "#fff" },
        duration: 5000,
        position: "bottom",
        type: "danger"
      });
    }
  }

  checkWalletValidity() {
    const { navigate } = this.props.navigation;
    if (this.state.walletValid) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: "paymentSuccess" })
        ]
      });
      navigate("paymentSuccess", {
        data: this.state.cart,
        paymentMode: "Efull e-Wallet"
      });
    } else {
      // do nothing
    }
  }

  render() {
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
                  cardIconName={"wallet"}
                  cardIconType={"Entypo"}
                  cardDataFetched={this.state.walletDataFetched}
                  cardValid={this.state.walletValid}
                  fetching={this.state.fetching}
                />
              </View>
              <View style={{ flex: 4, paddingTop: 70, paddingHorizontal: 10 }}>
                <H1 style={{ color: "#333", alignSelf: "center" }}>
                  How to use this mode
                </H1>
                <Text style={{ marginVertical: 5 }}>
                  Customer is required to use the Efull e-Wallet app to generate
                  a QR code which would be scanned using the MPOS device by
                  pressing the button with the{" "}
                  <Icon name="ios-qr-scanner" style={{ fontSize: 20 }} /> icon.
                </Text>
                <Text style={{ marginVertical: 5 }}>
                  Alternatively, the user can use a phone no. which is linked to
                  their Efull e-Wallet account to process the payment.
                </Text>
              </View>
            </ScrollView>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={styles.bgOrange}
              position="bottomRight"
              onPress={() => this.setState({ active: !this.state.active })}
            >
              {!this.state.active ? (
                <Icon name="ios-arrow-up" />
              ) : (
                <Icon name="ios-arrow-down" />
              )}
              <Button
                style={{ backgroundColor: "#3B5998" }}
                onPress={() =>
                  this.setState({ modalVisible: !this.state.modalVisible })
                }
              >
                <Icon name="phone" type="FontAwesome" />
              </Button>
              <Button
                onPress={this.initiateQRScan}
                style={{ backgroundColor: "purple" }}
              >
                <Icon name="ios-qr-scanner" />
              </Button>
            </Fab>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              transparent={true}
              onRequestClose={() => {
                if (!this.state.fetching) {
                  this.setState({ modalVisible: false });
                }
              }}
            >
              <View style={{ flex: 1, backgroundColor: "#2121214f" }}>
                <View style={{ flex: 1 }} />
                <View
                  style={{
                    backgroundColor: "#FFF",
                    flex: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 20,
                    paddingTop: 25,
                    paddingHorizontal: 10
                  }}
                >
                  <ScrollView>
                    <H3 style={{ color: "#666" }}>
                      Input Customer's Efull e-Wallet Credentials
                    </H3>
                    <Form style={{ paddingTop: 20 }}>
                      <Body>
                        <Item floatingLabel>
                          <Label style={styles.inputLabel}>Phone No.</Label>
                          <Input
                            returnKeyType="next"
                            keyboardType="phone-pad"
                            defaultValue={this.state.walletPhoneNo}
                            onChangeText={newText => {
                              this.setState({ walletPhoneNo: newText });
                            }}
                            style={[styles.inputField]}
                          />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 15 }}>
                          <Label style={styles.inputLabel}>Password</Label>
                          <Input
                            returnKeyType="done"
                            keyboardType="default"
                            secureTextEntry={true}
                            defaultValue={this.state.walletPin}
                            onChangeText={newText => {
                              this.setState({ walletPin: newText });
                            }}
                            style={[styles.inputField]}
                          />
                        </Item>
                        <Item
                          style={{
                            paddingTop: 15,
                            flexDirection: "row"
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <Button
                              disabled={this.state.fetching}
                              block
                              light
                              iconLeft
                              onPress={() =>
                                this.setState({ modalVisible: false })
                              }
                            >
                              <Text>Cancel</Text>
                              <Icon name="ios-close-circle-outline" />
                            </Button>
                          </View>
                          <View style={{ flex: 1, paddingLeft: 5 }}>
                            <Button
                              disabled={this.state.fetching}
                              block
                              iconLeft
                              onPress={this.verifyWalletCred}
                            >
                              <Text>Pay</Text>
                              <Icon name="wallet" type="Entypo" />
                            </Button>
                          </View>
                        </Item>
                      </Body>
                    </Form>
                  </ScrollView>
                </View>
                <View style={{ flex: 1 }} />
              </View>
            </Modal>
          </Container>
        )}
      </StyleProvider>
    );
  }
}
