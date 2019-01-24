import React, { Component } from "react";
import { ScrollView, TextInput, NativeModules } from "react-native";
import {
  StyleProvider,
  Container,
  Button,
  Form,
  Item,
  Icon,
  Right,
  Label,
  View,
  Text,
  Input,
  H1,
  Card,
  CardItem,
  Body
} from "native-base";
import getTheme from "../../native-base-theme/components";
import efuTheme from "../../native-base-theme/variables/efuTheme";
import { styles } from "../../native-base-theme/variables/customStyles";
import { GridButton } from "../components/MiscComponents";

const Landi = NativeModules.Landi;
const activity = NativeModules.StartActivity;
const LandiPay = NativeModules.LandiPay;

export default class HomeScreen extends Component {
  componentDidMount() {}

  constructor(props) {
    super(props);
    this.state = {
      fetching: false
    };
    this.payWithATM = this.payWithATM.bind(this);
  }
  
  async payWithATM() {
    try {
      var { _class, _package } = await LandiPay.payWithATM();
      alert("Response: "+_package);
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
              <GridButton
                icon="ios-person"
                text="Personnel"
                action={() => this.payWithATM()}
              />
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
