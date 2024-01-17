import { View, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AppMapView from './AppMapView';
import Header from './Header';
import SearchBar from './SearchBar';
import { UserLocationContext } from '../../Context/UserLocationContext';
import GobalApi from '../../Utils/GobalApi';
import PlaceListView from './PlaceListView';

export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);

  useEffect(() => {
    location && GetNearByPlace();
  }, [location]);

  const GetNearByPlace = () => {
    const data = {
      includedTypes: ['electric_vehicle_charging_station'],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          radius: 5000.0,
        },
      },
    };

    GobalApi.NewNearByPlace(data).then((resp) => {
      //console.log(JSON.stringify(resp.data));
      setPlaceList(resp.data.places);
    });
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Header />
        <SearchBar searchedLocation={(location) => console.log(location)} />
      </View>
      {placeList && <AppMapView placeList={placeList} />}
      <View style={styles.placeListContainer}>
        {placeList && <PlaceListView placeList={placeList} />}
      </View>
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
  placeListContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    width: '100%',
  },
});
