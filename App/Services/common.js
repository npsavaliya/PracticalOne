import { StatusBar, Platform } from 'react-native';

export function hasAndroidNotch() {
  return StatusBar.currentHeight > 24
}