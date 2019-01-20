import React, { Component } from "react";
import { StyleProvider, Container, View, Icon, H1, Button, Text} from "native-base";
import getTheme from "../../../native-base-theme/components";
import efuTheme from "../../../native-base-theme/variables/efuTheme";
import { styles } from "../../../native-base-theme/variables/customStyles";
import { GridButton } from "../../components/MiscComponents";

export default class paymentSuccess extends Component {
  componentDidMount() {
    this.getNavParams();
  }

  constructor(props) {
    super(props);
    this.state = {
      paymentData: null
    };
    this.getNavParams = this.getNavParams.bind(this);
  }

  getNavParams() {
    data = this.props.navigation.state.params.data || null;
    this.setState({ paymentData: data });
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
                name="ios-checkmark-circle"
                style={{ fontSize: 100, color: "green" }}
              />
              <H1>Payment Successful</H1>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <Button iconLeft block rounded style={[styles.bgOrange]}>
                <Icon name="ios-check-circle" />
                <Text style={styles.whiteText}>Complete</Text>
              </Button>
            </View>
          </View>
        </Container>
      </StyleProvider>
    );
  }