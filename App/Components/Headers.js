import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Header } from 'react-native-elements';

export function HeaderCenterIcon(props) {
  return (
    <Header
      leftComponent={{ icon: 'menu', style: {color: '#fff'}, onPress: () => Alert.alert('', 'Hello World!') }}
      centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }}
    />
  );
}

export function HeaderCenterText(props) {
  const leftText = props.leftText ?? undefined;
  const rightText = props.rightText ?? undefined;
  const title = props.title ?? undefined;
  return (
    <Header
      leftComponent={leftText && { text: leftText, style: {color: '#fff'}, onPress: props?.leftPress }}
      centerComponent={title && { text: title, style: { color: '#fff' } }}
      rightComponent={rightText && { text: rightText, style: { color: '#fff' } }}
    />
  );
}

// const headerCenterStyles = StyleSheet.create({

// });