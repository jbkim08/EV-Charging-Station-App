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
    position: 'absolute',
    padding: 15,
    marginRight: 50,
    width: '85%',
    zIndex: 10,
  },
});
