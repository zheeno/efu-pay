import React, { Component } from "react";
import { StyleProvider, Container, View, Icon, H1, H3 } from "native-base";
import getTheme from "../../../native-base-theme/components";
import efuTheme from "../../../native-base-theme/variables/efuTheme";
import { styles } from "../../../native-base-theme/variables/customStyles";
import { GridButton } from "../../components/MiscComponents";

export default class paymentFailed extends Component {
  componentDidMount() {
    this.getNavParams();
  }

  constructor(props) {
    super(props);
    this.state = {
      paymentData: {},
      errorMessage: ""
    };
    this.getNavParams = this.getNavParams.bind(this);
  }

  getNavParams() {
    data = this.props.navigation.state.params.data || null;
    this.setState({ errorMessage: data[0].errorMessage });
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <StyleProvider style={getTheme(efuTheme)}>
        <Container style={[styles.flexColumn]}>
          {/* row 1 */}
          <View style={[styles.flexRow_1]}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Icon
                name="ios-close-circle"
                style={{ fontSize: 100, color: "red" }}
              />
              <H1>Payment Failed</H1>
              {this.state.errorMessage.length > 0 ? (
                <H3>{this.state.errorMessage}</H3>
              ) : null}
            </View>
          </View>
        </Container>
      </StyleProvider>
    );
  }
}
