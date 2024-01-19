import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Utils/FirebaseConfig';
import PlaceItem from './Home/PlaceItem';

export default function FavoriteScreen() {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    user && getFav();
  }, [user]);

  const getFav = async (del = false) => {
    setFavList([]);

    const q = query(
      collection(db, 'favor-place'),
      where('email', '==', user.primaryEmailAddress.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFavList((prev) => [...prev, doc.data()]);
    });
  };

  const isFav = (place) => {
    const result = favList.find((item) => item.id == place.id);
    return result ? true : false;
  };

  return (
    <View>
      <Text style={{ textAlign: 'center', marginTop: 25, fontSize: 20 }}>내 즐겨찾기 충전소</Text>
      {!favList && (
        <View
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size={'large'} color="#4ECB71" />
          <Text>로딩...</Text>
        </View>
      )}

      <FlatList
        data={favList}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PlaceItem place={item} isFav={isFav(item)} markedFav={() => getFav()} />
          </View>
        )}
      />
    </View>
  );
}
