import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MapView } from "expo";
import { connect } from "react-redux";
import { Button, Icon } from "react-native-elements";

import * as actions from "../actions";

class MapScreen extends Component {
  static navigationOptions = {
    title: "Map",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={30} color={tintColor} />;
    }
  };

  state = { region: { longitude: -122, longitudeDelta: 0.04, latitude: 37, latitudeDelta: 0.09 } };

  onRegionChangeComplete = region => {
    this.setState({ region });
  };

  onButtonPress = async () => {
    await this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate("deck");
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.container}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search this area"
            backgroundColor="#009688"
            icon={{ name: "search" }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20
  }
});

export default connect(
  null,
  actions
)(MapScreen);
