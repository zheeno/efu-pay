import React, { Component } from "react";
import { ScrollView, TextInput } from "react-native";
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
  H1
} from "native-base";
import getTheme from "../../native-base-theme/components";
import efuTheme from "../../native-base-theme/variables/efuTheme";
import { styles } from "../../native-base-theme/variables/customStyles";

export default class InitialSetup extends Component {
  componentDidMount() {}

  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      stationId: "",
      stationName: "",
      branchLocation: "",
      branchId: ""
    };
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <StyleProvider style={getTheme(efuTheme)}>
        <Container style={[styles.flexColumn]}>
          <View
            style={[
              styles.bgGrey,
              { flex: 2, paddingHorizontal: 10, paddingVertical: 20 }
            ]}
          >
            <H1 style={styles.orangeText}>Welcome!</H1>
            <Text style={[styles.inputLabel, { textAlign: "justify" }]}>
              Setup the Efu Pay to convieniently process payments and keep track
              of daily transactions in real-time using the MPOS Device.
            </Text>
          </View>
          <View
            style={{
              flex: 6
            }}
          >
            <Form
              style={{
                flex: 1,
                alignContent: "center",
                paddingTop: 20,
                paddingHorizontal: 20
              }}
            >
              <Item floatingLabel>
                <Label style={styles.inputLabel}>Station Name</Label>
                <Input
                  returnKeyType="next"
                  defaultValue={this.state.stationName}
                  onChangeText={newText => {
                    this.setState({
                      stationName: newText
                    });
                  }}
                  style={styles.inputField}
                />
              </Item>
              <Item floatingLabel>
                <Label style={styles.inputLabel}>Station Id</Label>
                <Input
                  returnKeyType="next"
                  defaultValue={this.state.stationId}
                  onChangeText={newText => {
                    this.setState({
                      stationId: newText
                    });
                  }}
                  style={styles.inputField}
                />
              </Item>
              <Item floatingLabel>
                <Label style={styles.inputLabel}>Branch Location</Label>
                <Input
                  returnKeyType="next"
                  defaultValue={this.state.branchLocation}
                  onChangeText={newText => {
                    this.setState({
                      branchLocation: newText
                    });
                  }}
                  style={styles.inputField}
                />
              </Item>
              <Item floatingLabel>
                <Label style={styles.inputLabel}>Branch Id</Label>
                <Input
                  returnKeyType="next"
                  defaultValue={this.state.branchId}
                  onChangeText={newText => {
                    this.setState({
                      branchId: newText
                    });
                  }}
                  style={styles.inputField}
                />
              </Item>
            </Form>
          </View>
          <View style={{ flex: 1, flexDirection: "row-reverse" }}>
            <Button
              androidRippleColor="#ef6c00"
              bordered={false}
              transparent={true}
              style={[{ alignSelf: "flex-end" }]}
              onPress={() => {
                navigate("ChoosePump");
              }}
            >
              <Text style={styles.orangeText}>Proceed >></Text>
            </Button>
          </View>
        </Container>
      </StyleProvider>
    );
  }
}
