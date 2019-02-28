import React, { Component } from "react";
import { ScrollView, TextInput, NativeModules } from "react-native";
import { StyleProvider, Container, View } from "native-base";
import getTheme from "../../native-base-theme/components";
import efuTheme from "../../native-base-theme/variables/efuTheme";
import { styles } from "../../native-base-theme/variables/customStyles";
import { GridButton } from "../components/MiscComponents";
import { StackActions, NavigationActions } from "react-navigation";

const Landi = NativeModules.Landi;
const LandiPay = NativeModules.LandiPay;

export default class HomeScreen extends Component {
  componentDidMount() {
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: "Home" })]
    // });
    // this.props.navigation.dispatch(resetAction);
  }

  constructor(props) {
    super(props);
    this.state = {
      fetching: false
    };
    this.payWithATM = this.payWithATM.bind(this);
  }

  async payWithATM() {
    try {
      var { message } = await LandiPay.payWithATM();
      console.warn("Response: " + message);
    } catch (e) {
      console.warn(e);
    }
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
                icon="ios-add"
                text="New Sale"
                action={() => navigate("NewSaleScreen")}
              />
            </View>

            <View style={[styles.bgGrey, { flex: 1 }]}>
              <GridButton
                icon="ios-qr-scanner"
                text="Scan Pump"
                action={() => navigate("ChoosePump")}
              />
            </View>
          </View>

          {/* row 2 */}
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
              <GridButton icon="ios-person" text="Personnel" />
            </View>

            <View style={[styles.bgGrey, { flex: 1 }]}>
              <GridButton
                icon="ios-settings"
                text="Settings"
                action={() => Landi.adminSetup()}
              />
            </View>
          </View>
        </Container>
      </StyleProvider>
    );
  }
}
