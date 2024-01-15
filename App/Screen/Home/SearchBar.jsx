import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import React from 'react';

export default function SearchBar({ searchedLocation }) {
  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="EV 충전소 찾기"
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log('호출');
          //console.log(data, details);
          searchedLocation(details?.geometry?.location);
        }}
        query={{
          key: 'AIzaSyBCec0VEJMZ2wdmqV2oSIIA291iwsoZ_k0',
          language: 'ko',
        }}
      />
    </View>
  );
}
