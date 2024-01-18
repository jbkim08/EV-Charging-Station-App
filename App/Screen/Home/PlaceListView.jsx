import { View, FlatList, Dimensions } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import PlaceItem from './PlaceItem';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { db } from '../../Utils/FirebaseConfig';

export default function PlaceListView({ placeList }) {
  //console.log('***', placeList);
  const flatListRef = useRef(null);
  const { selectedMarker } = useContext(SelectMarkerContext);
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    selectedMarker !== null && scrollToIndex(selectedMarker);
  }, [selectedMarker]);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  const getItemLayout = (_, index) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width * index,
    index,
  });

  useEffect(() => {
    user && getFav();
  }, [user]);

  const getFav = async () => {
    const q = query(
      collection(db, 'favor-place'),
      where('email', '==', user.primaryEmailAddress.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, ' => ', doc.data());
      setFavList((prev) => [...prev, doc.data()]);
    });
  };

  const isFav = (place) => {
    const result = favList.find((item) => item.id == place.id);
    return result ? true : false;
  };

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
            <PlaceItem place={item} isFav={isFav(item)} markedFav={() => getFav()} />
          </View>
        )}
      />
    </View>
  );
}
