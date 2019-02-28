import React, { Component } from "react";
import { StackActions, NavigationActions } from "react-navigation";
import {
  StyleProvider,
  Container,
  View,
  Icon,
  H1,
  Button,
  Text
} from "native-base";
import { NativeModules } from "react-native";

import getTheme from "../../../native-base-theme/components";
import efuTheme from "../../../native-base-theme/variables/efuTheme";
import { styles } from "../../../native-base-theme/variables/customStyles";

const printer = NativeModules.printer;

export default class paymentSuccess extends Component {
  componentDidMount() {
    this.getNavParams();
  }

  constructor(props) {
    super(props);
    this.state = {
      paymentData: null
    };
    this.print = this.print.bind(this);
    this.getNavParams = this.getNavParams.bind(this);
  }

  getNavParams() {
    data = this.props.navigation.state.params.data || null;
    this.setState({ paymentData: data });
  }

  async print() {
    // try {
    //   var { response } = await printer.printText();
    //   alert("Response: "+response.text);
    // } catch (e) {
    //   alert(e);
    // }
    const { navigate } = this.props.navigation;
    this.getNavParams();
    navigate("Home");
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <StyleProvider style={getTheme(efuTheme)}>
        <Container style={[styles.flexColumn]}>
          {/* row 1 */}
          <View style={[styles.flexColumn]}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon
                name="ios-checkmark-circle"
                style={{ fontSize: 100, color: "green" }}
              />
              <H1>Payment Successful</H1>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
                paddingHorizontal: 20,
                paddingBottom: 50
              }}
            >
              <Button
                iconLeft
                block
                rounded
                style={[styles.bgOrange]}
                // onPress={() => {
                //   const resetAction = StackActions.reset({
                //     index: 0,
                //     actions: [NavigationActions.navigate({ routeName: "Home" })]
                //   });
                //   this.props.navigation.dispatch(resetAction);
                //   this.print;
                // }}
                onPress={this.print}
              >
                <Icon name="ios-checkmark-circle-outline" />
                <Text style={styles.whiteText}>Complete</Text>
              </Button>
            </View>
          </View>
        </Container>
      </StyleProvider>
    );
  }
}
