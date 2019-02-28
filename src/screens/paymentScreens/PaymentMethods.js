import React, { Component } from "react";
import { StackActions, NavigationActions } from "react-navigation";
import { StyleProvider, Container, View } from "native-base";
import getTheme from "../../../native-base-theme/components";
import efuTheme from "../../../native-base-theme/variables/efuTheme";
import { styles } from "../../../native-base-theme/variables/customStyles";
import { GridButton } from "../../components/MiscComponents";
import { NativeModules } from "react-native";

const Landi = NativeModules.Landi;
const ToastExample = NativeModules.ToastExample;
const ActivityResult = NativeModules.startActivity;
export default class PaymentMethods extends Component {
  componentDidMount() {
    this.getNavParams();
  }

  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      total: 0,
      cart: []
    };
    this.onATMDone = this.onATMDone.bind(this);
    this.payWithATM = this.payWithATM.bind(this);
    this.getNavParams = this.getNavParams.bind(this);
  }

  async getNavParams() {
    var total = 0;
    let cart = this.props.navigation.state.params.cart || null;
    await this.setState({ cart: cart });
    await this.state.cart.forEach(item => {
      total += item.itemPrice;
    });
    await this.setState({ total: total });
  }

  async payWithATM() {
    let trantype = 1;
    let amount = this.state.total * 100;
    await Landi.payWithATM(trantype, amount, this.onATMDone);
  }

  onATMDone() {
     navigate("paymentSuccess", { data: null });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <StyleProvider style={getTheme(efuTheme)}>
        <Container style={[styles.flexColumn]}>
          {/* row 1 */}
          <View style={[styles.flexRow_1]}>
            <View
              style={[
                {
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }
              ]}
            >
              <GridButton
                icon="ios-cash"
                text={"Cash"}
                action={() =>
                  navigate("payWithCash", {
                    cart: this.state.cart
                  })
                }
              />
            </View>

            <View style={[styles.bgGrey, { flex: 1 }]}>
              <GridButton
                icon="ios-card"
                text="ATM Card"
                action={this.payWithATM}
              />
            </View>
          </View>

          {/* row 2 */}
          <View style={[styles.flexRow_1]}>
            <View style={[styles.bgGrey, { flex: 1 }]}>
              <GridButton
                icon="v-card"
                iconType="Entypo"
                text="Fuel Card"
                action={() =>
                  navigate("payWithFuelCard", {
                    cart: this.state.cart
                  })
                }
              />
            </View>
            <View style={[styles.bgGrey, { flex: 1 }]}>
              <GridButton
                icon="wallet"
                iconType="Entypo"
                text="Efull Wallet"
                action={() =>
                  navigate("payWithWallet", {
                    cart: this.state.cart
                  })
                }
              />
            </View>
          </View>
        </Container>
      </StyleProvider>
    );
  }
}
