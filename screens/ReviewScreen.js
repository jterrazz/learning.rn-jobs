import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, ScrollView, Linking } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { MapView } from "expo";

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Review jobs",
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="favorite" size={30} color={tintColor} />;
      },
      headerRight: (
        <Button
          title="Settings"
          type="clear"
          onPress={() => {
            navigation.navigate("settings");
          }}
        />
      )
    };
  };

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const { company, formattedRelativeTime, url, jobId, jobtitle } = job;
      const initialRegion = {
        longitude: job.longitude,
        latitude: job.latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };

      return (
        <Card title={jobtitle} key={jobId}>
          <View style={{ height: 200 }}>
            <MapView scrollEnabled={false} style={{ flex: 1 }} cacheEnabled={true} initialRegion={initialRegion} />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button title="Apply now !" backgroundColor="#7741fa" onPress={() => Linking.openURL(url)} />
          </View>
        </Card>
      );
    });
  }

  render() {
    return <ScrollView>{this.renderLikedJobs()}</ScrollView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  detailWrapper: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  italics: {
    fontStyle: "italic"
  }
});

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
