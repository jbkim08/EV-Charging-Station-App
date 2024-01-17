import { View, FlatList, Text, Dimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import PlaceItem from './PlaceItem';

export default function PlaceListView({ placeList }) {
  //console.log('***', placeList);
  const flatListRef = useRef(null);

  useEffect(() => {
    //scrollToIndex(3);
  }, []);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  const getItemLayout = (_, index) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width * index,
    index,
  });

  return (
    <View>
      <FlatList
        data={placeList}
        horizontal={true}
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PlaceItem place={item} />
          </View>
        )}
      />
    </View>
  );
}
