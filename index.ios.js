/**
 * DeepThoughts Template
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

var MOCKED_DATA = [
  {title: 'Deep Thought #1', content: "If there's no 'there' there, where is it and what's there?"},
];

var REQUEST_URL = "http://dressler.local/restapi_test/wp-json/wp/v2/posts/";

var DeepThoughts = React.createClass({
  getInitialState: function() {
    return {
      thought: MOCKED_DATA[0],
    };
  },
  componentDidMount: function(){
    this.fetchData();
  },
  fetchData: function(){
    fetch(REQUEST_URL)
      .then( (response) => response.json() )
      .then( (responseData) => {
        this.setState({
          thought: { title: responseData[0].title.rendered, content: responseData[0].content.plaintext },
        });
      })
      .done();
  },
  render: function() {
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
    color: '#333333',
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
    color: '#666666',
  },
});

AppRegistry.registerComponent('DeepThoughts', () => DeepThoughts);