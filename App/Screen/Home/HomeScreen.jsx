import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AppMapView from './AppMapView';
import Header from './Header';

export default function HomeScreen() {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <AppMapView />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    width: '100%',
    zIndex: 10,
  },
});
