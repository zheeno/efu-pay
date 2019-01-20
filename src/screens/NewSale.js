import React, { Component } from "react";
import { ScrollView } from "react-native";
import {
  StyleProvider,
  Container,
  Button,
  Icon,
  Label,
  View,
  Text,
  ActionSheet,
  Toast
} from "native-base";
import getTheme from "../../native-base-theme/components";
import efuTheme from "../../native-base-theme/variables/efuTheme";
import { styles } from "../../native-base-theme/variables/customStyles";
import { PurchaseForm, CheckoutSlip } from "../components/MiscComponents";

export default class NewSale extends Component {
  componentDidMount() {}

  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      actionSheetVisible: false,
      modalVisible: false,
      cart: [],
      products: [
        {
          productId: "0",
          text: "Petrol",
          pricePerLit: 145.23
        },
        {
          productId: "1",
          text: "Engine Oil",
          pricePerLit: 100.0
        },
        {
          productId: "2",
          text: "Diesel",
          pricePerLit: 180.0
        },
        {
          productId: "3",
          text: "Kerosine",
          pricePerLit: 200.0
        }
      ],
      selectedProduct: 0,
      litres: 0,
      pricePerLit: 145.23,
      total: 0
    };
    this.addToCart = this.addToCart.bind(this);
    this.seletPaymentMethod = this.seletPaymentMethod.bind(this);
  }

  setactionSheetVisible(visible) {
    if (visible == undefined) {
      visible = !this.state.actionSheetVisible;
    }
    this.setState({ actionSheetVisible: visible });
  }

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
    if (this.state.total > 0) {
      const item = {
        productName: this.state.products[this.state.selectedProduct].text,
        productId: this.state.selectedProduct,
        litres: this.state.litres,
        pricePerLit: this.state.pricePerLit,
        itemPrice: this.state.total
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
        position: "top",
        type: "success"
      });
    } else {
      Toast.show({
        text: "Can not add empty item to cart",
        buttonText: "Dismiss",
        buttonTextStyle: { color: "#fff" },
        buttonStyle: { borderWidth: 1, borderColor: "#fff" },
        duration: 5000,
        position: "top",
        type: "danger"
      });
    }
  }

  seletPaymentMethod() {
    if (this.state.cart.length > 0) {
      const { navigate } = this.props.navigation;
      this.setState({ modalVisible: false });
      navigate("PaymentMethods", { cart: this.state.cart});
    } else {
      Toast.show({
        text: "Cart is empty",
        buttonText: "Dismiss",
        buttonTextStyle: { color: "#fff" },
        buttonStyle: { borderWidth: 1, borderColor: "#fff" },
        duration: 5000,
        position: "top",
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
            {/* select product */}
            <View
              style={[
                styles.bgGrey,
                { flex: 1, paddingHorizontal: 10, paddingVertical: 20 }
              ]}
            >
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
                litres={this.state.litres.toString()}
                pricePerLit={this.state.pricePerLit}
                total={this.state.total}
                setLitres={newLitre => {
                  (newTotal = newLitre * this.state.pricePerLit), 2;
                  //   newTotal = newTotal.toFixed(2);
                  this.setState({
                    litres: newLitre,
                    total: newTotal
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
        </Container>
      </StyleProvider>
    );
  }
}
