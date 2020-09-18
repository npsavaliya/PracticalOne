import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './Styles/NoDataFoundStyles';
import PropTypes from 'prop-types';

function NoDataFound(props) {
  return (
    <View style={props.containerStyle}>
      <Text style={props.msgTextStyle}>{props.msgText}</Text>
    </View>
  );
}

NoDataFound.propTypes = {
  containerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  msgTextStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  msgText: PropTypes.string,
};

NoDataFound.defaultProps = {
  containerStyle: styles.container,
  msgTextStyle: styles.msgText,
  msgText: 'No Data Found!',
};

export default NoDataFound