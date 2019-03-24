import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Card, Button, Icon } from "react-native-elements";
import { MapView } from "expo";

import * as actions from "../actions";
import Swipe from "../components/Swipe";

class DeckScreen extends Component {
  static navigationOptions = {
    title: "Jobs",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="description" size={30} color={tintColor} />;
    }
  };

  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }} pointerEvents="none">
          <MapView scrollEnabled={false} style={{ flex: 1 }} cacheEnabled={true} initialRegion={initialRegion} />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>{job.snippet.replace(/<b>/g, "").replace(/<\/b>/g, "")}</Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No more jobs">
        <Button
          title="Load more jobs"
          backgroundColor="#a62424"
          icon={{ name: "my-location" }}
          onPress={() => this.props.navigation.navigate("map")}
        />
      </Card>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Swipe
          data={this.props.jobs}
          renderNoMoreCards={this.renderNoMoreCards}
          renderCard={this.renderCard}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp="jobId"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  }
});

function mapStateToProps({ jobs }) {
  return {
    jobs: jobs.results
  };
}

export default connect(
  mapStateToProps,
  actions
)(DeckScreen);
