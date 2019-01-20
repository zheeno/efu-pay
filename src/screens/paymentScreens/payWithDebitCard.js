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
  H1
} from "native-base";
import getTheme from "../../../native-base-theme/components";
import efuTheme from "../../../native-base-theme/variables/efuTheme";
import { styles } from "../../../native-base-theme/variables/customStyles";
import { LoaderOverlay } from "../../components/MiscComponents";
import CreditCard from "react-native-credit-card";

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
      swipeOn: false,
      // card details
      CardNo: "",
      cardPin: "",
      cardCVV: "",
      cardExp: "",
      cardDataFetched: false,
      cardValid: false
    };
    this.pay = this.pay.bind(this);
    this.getNavParams = this.getNavParams.bind(this);
  }

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

  pay() {
    const { navigate } = this.props.navigation;
    this.setState({
      fetching: true
    });
    GetData(
      "pay?cardType=debitCard&cardNo=" +
        this.state.cardNo +
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
          <View style={{ flex: 1 }}>
            <Form style={{ flex: 1, paddingHorizontal: 20 }}>
              <View style={{ paddingTop: 20 }}>
                <Item floatingLabel>
                  <Label style={styles.inputLabel}>Card No.</Label>
                  <Input
                    returnKeyType="next"
                    keyboardType="numeric"
                    defaultValue={this.state.cardNo}
                    onChangeText={newText => {
                      this.setState({
                        cardPin: newText
                      });
                    }}
                    style={[styles.inputField]}
                  />
                </Item>
              </View>
              <View style={{ flexDirection: "row", paddingTop: 15 }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Item floatingLabel>
                    <Label style={styles.inputLabel}>Expires (MM/YY)</Label>
                    <Input
                      returnKeyType="next"
                      defaultValue={this.state.cardExp}
                      onChangeText={nexText => {
                        this.setState({
                          cardExp: nexText
                        });
                      }}
                      style={[styles.inputField]}
                    />
                  </Item>
                </View>
                <View style={{ flex: 1 }}>
                  <Item floatingLabel>
                    <Label style={styles.inputLabel}>CVV</Label>
                    <Input
                      returnKeyType="next"
                      keyboardType="numeric"
                      defaultValue={this.state.cardCVV}
                      secureTextEntry
                      onChangeText={nexText => {
                        this.setState({
                          cardCVV: nexText
                        });
                      }}
                      style={[styles.inputField]}
                    />
                  </Item>
                </View>
              </View>
              <View style={{ flex: 1, paddingTop: 15 }}>
                <Item floatingLabel>
                  <Label style={styles.inputLabel}>PIN</Label>
                  <Input
                    returnKeyType="done"
                    keyboardType="numeric"
                    defaultValue={this.state.cardPin}
                    secureTextEntry
                    maxLength={4}
                    onChangeText={nexText => {
                      this.setState({
                        cardPin: nexText
                      });
                    }}
                    style={[styles.inputField]}
                  />
                </Item>
              </View>
              <View style={{ paddingTop: 10 }}>
                <Button
                  block
                  iconLeft
                  style={styles.bgOrange}
                  onPress={this.pay}
                >
                  <Icon name="ios-card" />
                  <Text>Pay</Text>
                </Button>
              </View>
            </Form>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name="ios-wifi" style={{ fontSize: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name="ios-swipe" style={{ fontSize: 50 }} />
              </TouchableOpacity>
            </View>
          </View>
        </Container>
      </StyleProvider>
    );
  }
}
