import React, { Component } from "react";
import { StyleSheet, Modal, ScrollView } from "react-native";
import {
  Text,
  View,
  Item,
  Form,
  Label,
  Icon,
  Button,
  Input,
  Left,
  Right,
  Body,
  Container,
  Spinner,
  Row,
  Card,
  CardItem,
  H1,
  H2,
  H3,
  Header,
  Content,
  SwipeRow,
  List
} from "native-base";
import { styles } from "../../native-base-theme/variables/customStyles";

// Grid buttons for Home Screen options
export const GridButton = props => {
  return (
    <Card style={{ flex: 1 }}>
      <CardItem
        button
        onPress={props.action}
        style={{
          flex: 1
        }}
      >
        <Body
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Icon
            name={props.icon}
            type={props.iconType}
            style={[styles.orangeText, { fontSize: 50 }]}
          />
        </Body>
      </CardItem>
      <CardItem footer style={[styles.bgGrey]}>
        <Text style={[styles.orangeText, { fontSize: 16 }]}>{props.text}</Text>
      </CardItem>
    </Card>
  );
};

// purchase form
export const PurchaseForm = props => {
  return (
    <React.Fragment>
      <Form
        style={{
          flex: 1,
          alignContent: "center",
          paddingTop: 20,
          paddingHorizontal: 20
        }}
      >
        <Item floatingLabel>
          <Label style={styles.inputLabel}>Litres</Label>
          <Input
            returnKeyType="next"
            keyboardType="numeric"
            defaultValue={props.litres}
            onChangeText={newText => {
              props.setLitres(newText);
            }}
            style={[styles.inputField, { fontSize: 30 }]}
          />
        </Item>
        <View style={{ paddingVertical: 20, alignItems: "center" }}>
          <Text active style={[styles.inputLabel]}>
            Price Per Litre
          </Text>
          <View>
            <H2 style={[styles.orangeText]}>
              &#8358;{props.pricePerLit.toFixed(2)}
            </H2>
          </View>
        </View>
        <View style={{ paddingVertical: 20, alignItems: "center" }}>
          <Text style={[styles.inputLabel]}>Total</Text>
          <H1 style={styles.orangeText}>&#8358;{props.total.toFixed(2)}</H1>
        </View>
        <View style={[{ flex: 1, flexDirection: "column" }]}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Button light iconLeft block onPress={props.addToCart}>
              <Icon name="ios-add" />
              <Text>Add to cart</Text>
            </Button>
          </View>
          <View style={{ flex: 1, paddingTop: 20, alignItems: "center" }}>
            <Button
              disabled={props.cart.length == 0 ? true : false}
              light
              iconLeft
              block
              style={[styles.bgOrange]}
              onPress={props.modalVisible}
            >
              <Icon style={[styles.whiteText]} name="ios-cart" />
              <Text style={[styles.whiteText]}>
                Checkout ({props.cart.length})
              </Text>
            </Button>
          </View>
        </View>
      </Form>
    </React.Fragment>
  );
};

// checkout slip
export const CheckoutSlip = props => {
  var cartSum = 0;
  props.cart.forEach(item => {
    cartSum += item.itemPrice;
  });

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      onRequestClose={props.hideModal}
    >
      <Header>
        <Button transparent onPress={props.hideModal}>
          <Icon name="ios-arrow-back" />
        </Button>
        <Body>
          <H3 style={[styles.whiteText, { fontSize: 20, fontWeight: "400" }]}>
            Checkout ({props.cart.length})
          </H3>
        </Body>
      </Header>
      <View style={{ flex: 1 }}>
        <View scrollEnabled={false} style={{ flex: 3 }}>
          {props.cart.length == 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Icon
                name="ios-cart"
                style={[{ fontSize: 150, color: "#DDD" }]}
              />
            </View>
          ) : (
            <ScrollView>
              <List
                dataArray={props.cart}
                renderRow={item => (
                  <SwipeRow
                    key={item.productId}
                    rightOpenValue={-75}
                    body={
                      <View style={{ paddingLeft: 10, flexDirection: "row" }}>
                        <View style={{ flex: 5 }}>
                          <Text style={[styles.orangeText, { fontSize: 18 }]}>
                            {item.productName}
                          </Text>
                          {item.litres > 0 ? (
                            <Text style={[{ fontSize: 13, color: "#666" }]}>
                              {item.litres} Litres @ &#8358;
                              {item.pricePerLit.toFixed(2)}/Lit
                            </Text>
                          ) : null}
                        </View>
                        <View
                          style={{
                            flex: 2
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              color: "#666",
                              alignSelf: "flex-end"
                            }}
                          >
                            &#8358;{item.itemPrice.toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    }
                    right={
                      <Button danger onPress={() => props.removeFromCart(item)}>
                        <Icon active name="trash" />
                      </Button>
                    }
                  />
                )}
              />
            </ScrollView>
          )}
        </View>
        <View style={{ flex: 2, paddingHorizontal: 10, paddingVertical: 5 }}>
          <View>
            <Text style={{ color: "#666", fontSize: 18 }}>Total</Text>
            <H1 style={{ alignSelf: "flex-end" }}>
              &#8358;{cartSum.toFixed(2)}
            </H1>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Button block iconLeft light onPress={props.emptyCart}>
              <Icon name="ios-close" />
              <Text>Empty Cart</Text>
            </Button>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Button
              onPress={props.payMethodSel}
              block
              iconLeft
              disabled={props.cart.length == 0 ? true : false}
              style={props.cart.length == 0 ? styles.bgDark : styles.bgOrange}
            >
              <Icon name="ios-card" />
              <Text>Proceed to Payment</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
// ****************************
export const ErrorOverlay = props => {
  return (
    <Container>
      <View style={[styles.flexColumn, styles.justifyCenter]}>
        <Row
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 50
          }}
        >
          <Icon name="ios-globe" style={[{ color: "#777", fontSize: 80 }]} />
          <Icon
            name="ios-close-circle"
            style={[{ color: "#777", marginTop: -80, marginRight: -50 }]}
          />
        </Row>
        <Row
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: 10,
            paddingRight: 10
          }}
        >
          <Text style={[{ color: "#777", marginLeft: 5, fontSize: 15 }]}>
            {props.text}
          </Text>
        </Row>
        <Row
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 30
          }}
        >
          <Button
            icon
            primary
            rounded
            block
            onPress={props.tryAgain}
            style={[styles.bgOrange, { alignSelf: "flex-end" }]}
          >
            <Icon name="ios-refresh" />
            <Text>Try Again</Text>
          </Button>
        </Row>
      </View>
    </Container>
  );
};

export const LoaderOverlay = props => {
  //   const navigate = props.nav;
  return (
    <Container>
      <View style={[styles.flexRow_1, styles.justifyCenter]}>
        <Spinner color="#ef6c00" />
        <Text style={[{ marginLeft: 5, fontSize: 13, color: "#777" }]}>
          {props.text}
        </Text>
      </View>
    </Container>
  );
};
