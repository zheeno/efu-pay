import React from "react";
import { Left, Button, Icon, Body, Right, View } from "native-base";
import { Image } from "react-native";
// import { styles } from "../../native-base-theme/variables/customStyles";

const AppHeader = props => {
  const navigate = props.nav;

  profile = () => {
    loggedIn = props.loggedIn;
    if (loggedIn) {
      // navigate to profile page
      navigate("LoginPage");
    } else {
      // redirect to login page
      navigate("SearchScreenContent", { params: { filter: "music" } });
    }
  };

  return (
    <View
      transparent
      style={[
        {
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }
      ]}
    >
      {props.menu ? (
        <Left>
          <Button transparent light small>
            <Icon name="ios-menu" />
          </Button>
        </Left>
      ) : null}
      <Body style={{ flex: 5, alignItems: "center" }}>
        <Image
          source={require("./img/logo_white.png")}
          resizeMode={"center"}
          style={{
            width: 180,
            alignSelf: "center"
          }}
        />
      </Body>
      {props.right ? (
        <Right>
          {/* profile /login button */}
          {props.profileBtn ? (
            <Button transparent light small onPress={profile}>
              <Icon name="ios-person" />
            </Button>
          ) : null}
          {/* register button */}
          {props.regBtn ? (
            <Button transparent light small onPress={profile}>
              <Icon name="ios-person-add" />
            </Button>
          ) : null}
        </Right>
      ) : null}
    </View>
  );
};
export default AppHeader;
