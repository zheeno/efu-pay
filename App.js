import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Root } from "native-base";
import { createStackNavigator } from "react-navigation";
import SplashScreen from "./src/screens/SplashScreen";
import InitialSetup from "./src/screens/InitialSetup";
import AssignPump from "./src/screens/AssignPump";
import HomeScreen from "./src/screens/HomeScreen";
import NewSale from "./src/screens/NewSale";
import PaymentMethods from "./src/screens/paymentScreens/PaymentMethods";
import payWithFuelCard from "./src/screens/paymentScreens/payWithFuelCard";
import payWithWallet from "./src/screens/paymentScreens/payWithWallet";
import payWithCash from "./src/screens/paymentScreens/payWithCash";
import paymentSuccess from "./src/screens/paymentScreens/paymentSuccess";
import paymentFailed from "./src/screens/paymentScreens/paymentFailed";
// import AppHeader from "./src/components/AppHeader";

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation;
        return {
          title: "Home"
        };
      }
    },
    Splash: {
      screen: SplashScreen,
      navigationOptions: () => {
        return {
          headerStyle: {
            height: 0
          }
        };
      }
    },
    InitSetup: {
      screen: InitialSetup,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation;
        return {
          title: "App Setup"
        };
      },
      goBack: null
    },
    ChoosePump: {
      screen: AssignPump,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation;
        return {
          title: "Choose Pump"
        };
      }
    },
    NewSaleScreen: {
      screen: NewSale,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation;
        return {
          title: "New Sale"
        };
      }
    },
    PaymentMethods: {
      screen: PaymentMethods,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation;
        return {
          title: "Select Payment Method"
        };
      }
    },
    payWithFuelCard: {
      screen: payWithFuelCard,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation;
        return {
          title: "Pay using Fuel Card"
        };
      }
    },
    payWithWallet: {
      screen: payWithWallet,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation;
        return {
          title: "Pay using E-Wallet"
        };
      }
    },
    payWithCash: {
      screen: payWithCash,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation;
        return {
          title: "Record Cash Payment"
        };
      }
    },
    paymentSuccess: {
      screen: paymentSuccess,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation;
        return {
          title: "Payment Successful"
        };
      }
    },
    paymentFailed: {
      screen: paymentFailed,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation;
        return {
          title: "Payment Failed"
        };
      }
    }
  },
  {
    initialRouteName: "Splash",
    navigationOptions: {
      headerStyle: {
        height: 50,
        backgroundColor: "#ef6c00"
      },
      headerTintColor: "#fff"
    }
  }
);

export default class App extends Component {
  render() {
    return (
      <Root>
        <StatusBar />
        <RootStack />
      </Root>
    );
  }
}
