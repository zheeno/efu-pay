import React, { Component } from "react";
import { ScrollView, NativeModules, AsyncStorage, Modal } from "react-native";
import {
  StyleProvider,
  Container,
  Button,
  Icon,
  Label,
  View,
  Text,
  ActionSheet,
  Toast,
  Fab,
  H3,
  Form,
  Body,
  Item,
  Input,
  InputGroup
} from "native-base";
import getTheme from "../../native-base-theme/components";
import efuTheme from "../../native-base-theme/variables/efuTheme";
import { styles } from "../../native-base-theme/variables/customStyles";
import { PurchaseForm, CheckoutSlip } from "../components/MiscComponents";
import { barcodeTypes } from "../services/ApiInterface";
const ScannerModule = NativeModules.ScannerModule;

export default class NewSale extends Component {
  async componentDidMount() {
    await AsyncStorage.getItem("savedPump")
      .then(savedPump => {
        if (null != savedPump) {
          this.setState({ pumpNo: savedPump });
        }
      })
      .done();
  }

  constructor(props) {
    super(props);
    this.state = {
      reference: "",
      active: true,
      fetching: false,
      actionSheetVisible: false,
      modalVisible: false,
      saveSlipModalVisible: false,
      vendingMode: 0,
      cart: [],
      products: [
        {
          productId: "0",
          text: "Petrol",
          pricePerLit: 145.0
        },
        {
          productId: "1",
          text: "Engine Oil",
          pricePerLit: 100.0
        },
        {
          productId: "2",
          text: "Diesel",
          pricePerLit: 221.26
        },
        {
          productId: "3",
          text: "Kerosine",
          pricePerLit: 150.0
        }
      ],
      selectedProduct: 0,
      litres: 0,
      pricePerLit: 145.0,
      amount: 0,
      total: 0,
      pumpNo: ""
    };
    this.saveSlip = this.saveSlip.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.scanPump = this.scanPump.bind(this);
    this.seletPaymentMethod = this.seletPaymentMethod.bind(this);
  }

  setactionSheetVisible(visible) {
    if (visible == undefined) {
      visible = !this.state.actionSheetVisible;
    }
    this.setState({ actionSheetVisible: visible });
  }

  scanPump() {
    this.setState({ active: false });
    ScannerModule.openCustomScanner(true, true, barcodeTypes, this.setPumpNo);
  }

  setPumpNo = barcode => {
    AsyncStorage.setItem("savedPump", barcode);
    this.setState({ pumpNo: barcode });
  };

  chooseProduct = () =>
    ActionSheet.show(
      {
        options: this.state.products,
        cancelButtonIndex: this.CANCEL_INDEX,
        destructiveButtonIndex: this.DESTRUCTIVE_INDEX,
        title: "Products"
      },
      buttonIndex => {
        this.setactionSheetVisible(false);
        this.setState({
          selectedProduct: buttonIndex,
          litres: 0,
          pricePerLit: this.state.products[buttonIndex].pricePerLit,
          total: 0
        });
      }
    );

  addToCart() {
    // check if user has assigned a pump ID
    if (this.state.pumpNo.length > 0) {
      if (this.state.total > 0) {
        const item = {
          itemId: this.state.cart.length + 1,
          productName: this.state.products[this.state.selectedProduct].text,
          productId: this.state.selectedProduct,
          litres: this.state.litres,
          pricePerLit: this.state.pricePerLit,
          itemPrice: this.state.total,
          pumpNo: this.state.pumpNo
        };
        this.setState({
          cart: [...this.state.cart, ...[item]],
          litres: 0,
          total: 0
        });
        Toast.show({
          text: "Item Added to cart",
          buttonText: "Okay",
          buttonTextStyle: { color: "#fff" },
          buttonStyle: { borderWidth: 1, borderColor: "#fff" },
          duration: 5000,
          position: "bottom",
          type: "success"
        });
      } else {
        Toast.show({
          text: "Can not add empty item to cart",
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
        text: "Please scan the pump's QR code",
        buttonText: "Dismiss",
        buttonTextStyle: { color: "#fff" },
        buttonStyle: { borderWidth: 1, borderColor: "#fff" },
        duration: 5000,
        position: "bottom",
        type: "danger"
      });
    }
  }

  seletPaymentMethod() {
    if (this.state.cart.length > 0) {
      const { navigate } = this.props.navigation;
      this.setState({ modalVisible: false });
      navigate("PaymentMethods", { cart: this.state.cart });
    } else {
      Toast.show({
        text: "Cart is empty",
        buttonText: "Dismiss",
        buttonTextStyle: { color: "#fff" },
        buttonStyle: { borderWidth: 1, borderColor: "#fff" },
        duration: 5000,
        position: "bottom",
        type: "danger"
      });
    }
  }

  saveSlip(){
    if (this.state.cart.length > 0) {
      const slip = {
        storageType: "slip",
        reference: this.state.reference,
        dateTime: "2/4/2019 - 9:44pm",
        items: this.state.cart,
        csa: "Bankole Wasiu"
      }
      if(AsyncStorage.setItem(this.state.reference, slip).done()){
        // reset cart
        this.setState({
          cart: [],
          litres: 0,
          total: 0,
          saveSlipModalVisible: false
        });
        Toast.show({
          text: "Sale has been saved with reference "+this.state.reference,
          buttonText: "Okay",
          buttonTextStyle: { color: "#fff" },
          buttonStyle: { borderWidth: 1, borderColor: "#fff" },
          duration: 10000,
          position: "bottom",
          type: "success"
        });
      }

    } else {
      Toast.show({
        text: "Cart is empty",
        buttonText: "Dismiss",
        buttonTextStyle: { color: "#fff" },
        buttonStyle: { borderWidth: 1, borderColor: "#fff" },
        duration: 5000,
        position: "bottom",
        type: "danger"
      });
    }
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <StyleProvider style={getTheme(efuTheme)}>
        <Container style={[styles.flexColumn]}>
          <ScrollView style={styles.flexColumn}>
            {/* pump no */}
            <View
              style={[
                styles.bgGrey,
                {
                  flex: 1,
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  paddingVertical: 10
                }
              ]}
            >
              <View style={{ flex: 6 }}>
                <Button
                  block
                  style={[
                    { borderRadius: 0 },
                    this.state.pumpNo.length > 0
                      ? { backgroundColor: "#34A34F" }
                      : { backgroundColor: "#DD5144" }
                  ]}
                  onPress={this.scanPump}
                  iconRight
                >
                  <Text style={[styles.whiteText]}>
                    {this.state.pumpNo.length > 0
                      ? this.state.pumpNo
                      : "Scan Pump's QR Code"}
                  </Text>
                  <Icon
                    style={[styles.whiteText]}
                    name="qrcode"
                    type="FontAwesome"
                  />
                </Button>
              </View>
              {this.state.pumpNo.length > 0 ? (
                <View style={styles.flexRow_1}>
                  <Button
                    icon
                    danger
                    block
                    style={{ borderRadius: 0 }}
                    onPress={() => {
                      this.setState({ pumpNo: "" });
                      AsyncStorage.removeItem("savedPump");
                    }}
                  >
                    <Icon name="ios-close" />
                  </Button>
                </View>
              ) : null}
            </View>
            {/* select product */}
            <View style={[styles.bgGrey, { flex: 1, paddingHorizontal: 10 }]}>
              <Label style={[styles.inputLabel]}>Select Product</Label>
              <Button block medium light onPress={this.chooseProduct} iconRight>
                <Text style={[styles.orangeText]}>
                  {this.state.products[this.state.selectedProduct].text}
                </Text>
                <Icon style={[styles.orangeText]} name="ios-arrow-dropdown" />
              </Button>
            </View>
            {/* load form fields with respect to product selected */}
            <View
              style={{
                flex: 6
              }}
            >
              {/* purchase form */}
              <PurchaseForm
                pumpNo={this.state.pumpNo}
                litres={this.state.litres.toFixed(2).toString()}
                pricePerLit={this.state.pricePerLit}
                amount={this.state.amount.toFixed(2).toString()}
                total={this.state.total}
                vendingMode={this.state.vendingMode}
                setVendingMode={mode => {
                  this.setState({ vendingMode: mode, litres: 0, total: 0 });
                }}
                setLitres={newLitre => {
                  (newTotal = newLitre * this.state.pricePerLit), 2;
                  this.setState({
                    litres: newLitre * 1,
                    total: newTotal
                  });
                }}
                setAmount={newAmount => {
                  newAmount = newAmount * 1;
                  (newLitre = newAmount / this.state.pricePerLit), 2;
                  this.setState({
                    litres: newLitre,
                    total: newAmount
                  });
                }}
                addToCart={this.addToCart}
                cart={this.state.cart}
                modalVisible={() => {
                  this.setState({ modalVisible: true });
                }}
              />
            </View>
          </ScrollView>
          {/* checkout */}
          <CheckoutSlip
            payMethodSel={this.seletPaymentMethod}
            visible={this.state.modalVisible}
            hideModal={() => {
              this.setState({ modalVisible: false });
            }}
            cart={this.state.cart}
            emptyCart={() => {
              this.setState({ cart: [], modalVisible: false });
            }}
            removeFromCart={item => {
              const cartItems = this.state.cart.filter(
                c => c.productId !== item.productId
              );
              this.setState({ cart: cartItems });
            }}
          />
          {/* saveSlip */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.saveSlipModalVisible}
            transparent={true}
            onRequestClose={() => {
              this.setState({ saveSlipModalVisible: false });
            }}
          >
            <View style={{ flex: 1, backgroundColor: "#2121214f" }}>
              <View style={{ flex: 2 }} />
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
                  <H3 style={{ color: "#666" }}>Save this transaction</H3>
                  <Form style={{ paddingTop: 20 }}>
                    <Body>
                      <Item floatingLabel>
                        <Label style={styles.inputLabel}>Reference</Label>
                        <Input
                        autoFocus
                          returnKeyType="done"
                          keyboardType="default"
                          defaultValue={this.state.reference}
                          onChangeText={newText => {
                            this.setState({ reference: newText });
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
                              this.setState({ saveSlipModalVisible: false })
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
                            onPress={this.saveSlip}
                          >
                            <Text>Save</Text>
                            <Icon name="save" type="Entypo" />
                          </Button>
                        </View>
                      </Item>
                    </Body>
                  </Form>
              </View>
              <View style={{ flex: 2 }} />
            </View>
          </Modal>
          {/* FAB */}
          <Fab
            active={this.state.active}
            direction="left"
            containerStyle={{ marginBottom: -18 }}
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
              style={{ backgroundColor: "purple" }}
            >
              <Icon name="redo" type="EvilIcons" />
            </Button>
            {this.state.cart.length > 0 ?
            <Button style={{ backgroundColor: "#34A34F" }}
              onPress={() =>
                this.setState({
                  saveSlipModalVisible: true
                })
              }>
              <Icon name="save" type="FontAwesome" />
            </Button>
            : null}
            <Button style={{ backgroundColor: "#3B5998" }}>
              <Icon name="user" type="FontAwesome" />
            </Button>
            <Button
              onPress={this.scanPump}
              style={{ backgroundColor: "#DD5144" }}
            >
              <Icon name="qrcode" type="FontAwesome" />
            </Button>
          </Fab>
        </Container>
      </StyleProvider>
    );
  }
}
