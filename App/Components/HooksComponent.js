import React, { useRef, useState, useEffect } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';

function HooksComponent(props) {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };

  return (
    <View style={styles.container}>
      <Text>Current state is: {appStateVisible}</Text>
    </View>
  );
};

HooksComponent.propTypes = {
  // containerStyle: PropTypes.oneOfType([
  //   PropTypes.object,
  //   PropTypes.array
  // ]),
  // msgTextStyle: PropTypes.oneOfType([
  //   PropTypes.object,
  //   PropTypes.array
  // ]),
  // msgText: PropTypes.string,
};

HooksComponent.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HooksComponent;
