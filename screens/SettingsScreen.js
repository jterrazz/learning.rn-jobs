import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { clearLikedJobs } from "../actions";
import { Button } from "react-native-elements";

class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          large
          title="Reset liked jobs"
          icon={{ name: "delete-forever" }}
          backgroundColor="#333"
          onPress={this.props.clearLikedJobs}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect(
  null,
  { clearLikedJobs }
)(SettingsScreen);
