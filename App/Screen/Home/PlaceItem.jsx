import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';

export default function PlaceItem({ place }) {
  //전체주소 https://places.googleapis.com/v1/NAME/media?key=API_KEY&PARAMETERS
  const PLACE_PHOTO_BASE_URL = 'https://places.googleapis.com/v1/';
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;

  return (
    <View
      style={{
        width: Dimensions.get('screen').width * 0.9,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10,
      }}
    >
      <Image
        source={
          place?.photos
            ? {
                uri:
                  PLACE_PHOTO_BASE_URL +
                  place?.photos[0].name +
                  '/media?key=' +
                  apiKey +
                  '&maxHeightPx=800&maxWidthPx=1200',
              }
            : require('./../../../assets/images/station.png')
        }
        style={{ width: '100%', borderRadius: 10, height: 150 }}
      />
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 17, fontFamily: 'Pretend-Medium' }}>
          {place.displayName?.text}
        </Text>
        <Text style={{ color: 'gray', fontSize: 13 }}>{place?.shortFormattedAddress}</Text>
        <Text style={{ fontFamily: 'Pretend-Medium' }}>
          충전기기수 : {place?.evChargeOptions?.connectorCount ?? '모름'}
        </Text>
      </View>
    </View>
  );
}
