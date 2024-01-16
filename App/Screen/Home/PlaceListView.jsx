import { View, FlatList, Text } from 'react-native';
import React from 'react';

export default function PlaceListView({ placeList }) {
  console.log('***', placeList);
  return (
    <View>
      <FlatList
        data={placeList}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Text>{item?.displayName?.text}</Text>
          </View>
        )}
      />
    </View>
  );
}
