import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import Slides from "../components/Slides";
import { AppLoading } from "expo";
import * as _ from "lodash";

const SLIDE_DATA = [
  { text: "Welcome to JobApp", backgroundColor: "#6f3aee" },
  { text: "Set your location, then swipe away", backgroundColor: "#e72e5a" }
];

export default class WelcomeScreen extends Component {
  state = { token: null };

  async componentWillMount() {
    let token = await AsyncStorage.getItem("fb_token");

    if (token) {
      this.props.navigation.navigate("map");
      this.setState({ token });
    } else this.setState({ token: false });
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate("auth");
  };

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
