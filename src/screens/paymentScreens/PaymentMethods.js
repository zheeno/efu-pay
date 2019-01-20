import React, { Component } from "react";
import { StyleProvider, Container, View } from "native-base";
import getTheme from "../../../native-base-theme/components";
import efuTheme from "../../../native-base-theme/variables/efuTheme";
import { styles } from "../../../native-base-theme/variables/customStyles";
import { GridButton } from "../../components/MiscComponents";
// import ToastExample from "../../nativeBridge/ToastExample";
import { NativeModules } from "react-native";

const Landi = NativeModules.Landi;
const ToastExample = NativeModules.ToastExample;

export default class PaymentMethods extends Component {
  componentDidMount() {
    this.getNavParams();
  }

  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      cart: []
    };
    this.payWithCash = this.payWithCash.bind(this);
    this.getNavParams = this.getNavParams.bind(this);
  }

  getNavParams() {
    cart = this.props.navigation.state.params.cart || null;
    this.setState({ cart: cart });
  }

  payWithCash() {
    const { navigate } = this.props.navigation;
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
                action={() => this.payWithCash()}
              />
            </View>

            <View style={[styles.bgGrey, { flex: 1 }]}>
              <GridButton
                icon="ios-card"
                text="ATM Card"
                action={() => Landi.payWithATM()}
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
          </View>
        </Container>
      </StyleProvider>
    );
  }
}
