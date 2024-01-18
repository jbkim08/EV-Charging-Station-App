import { View, Text, Image, Dimensions, Pressable, ToastAndroid } from 'react-native';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../Utils/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function PlaceItem({ place, isFav, markedFav }) {
  //전체주소 https://places.googleapis.com/v1/NAME/media?key=API_KEY&PARAMETERS
  const PLACE_PHOTO_BASE_URL = 'https://places.googleapis.com/v1/';
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const { user } = useUser();

  const onSetFav = async (place) => {
    //console.log(place.id);
    await setDoc(doc(db, 'favor-place', place.id), {
      ...place,
      email: user.primaryEmailAddress.emailAddress,
    });
    markedFav();
    ToastAndroid.show('저장됨!', ToastAndroid.TOP);
  };

  const onRemoveFav = async (placeId) => {
    //console.log(placeId);
    await deleteDoc(doc(db, 'favor-place', placeId));
    markedFav();
    ToastAndroid.show('삭제됨!', ToastAndroid.TOP);
  };

  return (
    <View
      style={{
        width: Dimensions.get('screen').width * 0.9,
        backgroundColor: 'white',
        margin: Dimensions.get('screen').width * 0.05,
        borderRadius: 10,
      }}
    >
      <Pressable
        style={{ position: 'absolute', right: 0, margin: 10, zIndex: 10 }}
        onPress={() => (isFav ? onRemoveFav(place.id) : onSetFav(place))}
      >
        {isFav ? (
          <FontAwesome name="heart" size={24} color="coral" />
        ) : (
          <FontAwesome name="heart-o" size={24} color="coral" />
        )}
      </Pressable>
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
        <View
          style={{
            padding: 12,
            backgroundColor: '#C7EA46',
            borderRadius: 6,
            paddingHorizontal: '40%',
            flexDirection: 'row',
          }}
        >
          <FontAwesome name="location-arrow" size={24} color="white" />
          <Text style={{ color: 'white', marginLeft: 10 }}>이동</Text>
        </View>
      </View>
    </View>
  );
}
