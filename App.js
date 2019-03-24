import Expo, { Notifications } from "expo";
import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import registerFromNotifications from "./services/push_notifications";
import configureStore from "./store";
import AuthScreen from "./screens/AuthScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import DeckScreen from "./screens/DeckScreen";
import MapScreen from "./screens/MapScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ReviewScreen from "./screens/ReviewScreen";

const { persistor, store } = configureStore();

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
  componentDidMount() {
    registerFromNotifications();
    Notifications.addListener(notification => {
      const {
        data: { text },
        origin
      } = notification;

      if (origin === "received" && text)
        Alert.alert("New push notification", text, [{ text: "Ok" }]);
    });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
