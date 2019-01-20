import React, { Component } from "react";
import { Platform, Text, Image } from "react-native";
import { StyleProvider, Container, View, Button, Spinner } from "native-base";
import getTheme from "../../native-base-theme/components";
import material from "../../native-base-theme/variables/material";
import { styles } from "../../native-base-theme/variables/customStyles";

export default class App extends Component {
  componentDidMount() {
    
  }

  constructor(props) {
    super(props);
    this.state = {
      fetching: false
    };
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={[styles.flexColumn]}>
          <View
            style={[
              styles.bgOrange,
              { flex: 6, alignItems: "center", justifyContent: "center" }
            ]}
          >
            <Image source={require("./src/components/img/logo_white.png")} />
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
