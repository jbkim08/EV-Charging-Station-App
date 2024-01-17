import { View, StyleSheet, Image } from 'react-native';
import React, { useContext } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapStyle from '../../Utils/MapViewStyle.json';
import { UserLocationContext } from '../../Context/UserLocationContext';

export default function AppMapView({ placeList }) {
  const { location, setLocation } = useContext(UserLocationContext);
  return (
    location?.latitude && (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          customMapStyle={MapStyle}
          region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location?.latitude,
              longitude: location?.longitude,
            }}
          >
            <Image
              source={require('./../../../assets/images/car.png')}
              style={{ width: 35, height: 35 }}
            />
          </Marker>

          {placeList &&
            placeList.map((item, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: item.location?.latitude,
                    longitude: item.location?.longitude,
                  }}
                  onPress={() => console.log('마커인덱스', index)}
                >
                  <Image
                    source={require('./../../../assets/images/marker.png')}
                    style={{ width: 25, height: 30 }}
                  />
                </Marker>
              );
            })}
        </MapView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
