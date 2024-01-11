import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.imageUrl }} style={{ width: 45, height: 45, borderRadius: 99 }} />
      <Image
        style={{ height: 25, width: 250 }}
        source={require('./../../../assets/images/logo.png')}
      />
      <FontAwesome name="filter" size={24} color={'black'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
