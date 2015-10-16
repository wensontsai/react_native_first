/**
 * DeepThoughts App v 0.2
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

// The URL for the `posts` endpoint provided by WP JSON API
var REQUEST_URL = 'http://dressler.local/restapi_test/wp-json/wp/v2/posts/?filter[orderby]=rand&filter[per_page]=1';

var DeepThoughts = React.createClass({
  getInitialState: function() {
    return {
      //thought is initially set to null so that the loading message shows
      thought: null,
    };
  },
  // Automatically called by react when this component has finished mounting.
  componentDidMount: function() {
    this.fetchData();
  },
  // This is where the magic happens! Fetches the data from our API and updates the application state.
  fetchData: function() {
    this.setState({
      // we'll also set thought to null when loading new thoughts so that the loading message shows
      thought: null,
    });
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        // this.setState() will cause the new data to be applied to the UI that is created by the `render` function below
        this.setState({
          thought: { title: responseData[0].title.rendered, content: responseData[0].plaintext }
        });
      })
      .done();
  },
  // instead of immediately rendering the template, we now check if there is data in the 'thought' variable
  // and render a loading view if it's empty, or the 'thought' template if there is data
  render: function() {
    if ( !this.state.thought ) {
      return this.renderLoadingView();
    }
    return this.renderThought();
  },
  // the loading view template just shows the message "Thinking thoughts..."
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Thinking thoughts...
        </Text>
      </View>
    );
  },
  // this is the original render function, now renamed to renderThought, which will render our main template 
  renderThought: function() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {this.state.thought.title}
          </Text>
          <Text style={styles.text}>
            {this.state.thought.content}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#ccc'
            onPress={this.fetchData}
          >
            <Text style={styles.buttonText}>Hmmmmm...</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 5,
  },
  buttonContainer: {
    bottom: 0,
    flex: .1,
    width: windowSize.width,
    backgroundColor: '#eee',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 30,
    color: 'red',
  },
});

AppRegistry.registerComponent('DeepThoughts', () => DeepThoughts);