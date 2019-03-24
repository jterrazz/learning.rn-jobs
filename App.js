import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import store from "./store";
import AuthScreen from "./screens/AuthScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import DeckScreen from "./screens/DeckScreen";
import MapScreen from "./screens/MapScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ReviewScreen from "./screens/ReviewScreen";

const navigationOptions = {
  tabBarVisible: false
};

const MainNavigator = createBottomTabNavigator(
  {
    welcome: {
      screen: WelcomeScreen,
      navigationOptions
    },
    auth: { screen: AuthScreen, navigationOptions },
    main: {
      navigationOptions,
      screen: createBottomTabNavigator({
        map: { screen: MapScreen },
        deck: { screen: DeckScreen },
        review: {
          screen: createStackNavigator({
            review: { screen: ReviewScreen },
            settings: { screen: SettingsScreen }
          })
        }
      })
    }
  },
  {
    navigationOptions: {
      tabBarVisible: false
    }
  }
);

const AppContainer = createAppContainer(MainNavigator);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
