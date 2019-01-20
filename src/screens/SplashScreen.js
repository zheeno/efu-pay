import React, { Component } from "react";
import { Text, Image } from "react-native";
import { StyleProvider, Container, View, Button, Spinner } from "native-base";
import getTheme from "../../native-base-theme/components";
import efuTheme from "../../native-base-theme/variables/efuTheme";
import { styles } from "../../native-base-theme/variables/customStyles";

export default class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        fetching: true
      });
      this.setupPage();
    }, 3000);
  }

  constructor(props) {
    super(props);
    this.state = {
      fetching: true
    };
  }

  setupPage() {
    const { navigate } = this.props.navigation;
    navigate("Home");

    // navigate.dispatch(
    //   NavigationActions.reset({
    //    index: 0,
    //    actions: [NavigationActions.navigate({ routeName: "HomeScreen" })]
    //   })
    //  );
  }
  render() {
    return (
      <StyleProvider style={getTheme(efuTheme)}>
        <Container style={[styles.flexColumn]}>
          <View
            style={[
              styles.bgOrange,
              { flex: 6, alignItems: "center", justifyContent: "center" }
            ]}
          >
            <Image source={require("../components/img/logo_white.png")} />
            <Text style={{ fontSize: 13, color: "#FFF", marginTop: -10 }}>
              Transactions Made Easy
            </Text>
          </View>
          <View style={[styles.bgOrange, { flex: 1, alignItems: "center" }]}>
            {this.state.fetching ? <Spinner color="#FFF" /> : null}
          </View>
        </Container>
      </StyleProvider>
    );
  }
}
