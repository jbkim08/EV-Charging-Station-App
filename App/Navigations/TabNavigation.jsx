import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FavoriteScreen from '../Screen/FavoriteScreen';
import HomeScreen from '../Screen/HomeScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      activeColor="#F3E0E0"
      inactiveColor="white"
      barStyle={{ backgroundColor: '#4ECB71' }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: '검색',
          tabBarIcon: () => <Ionicons name="search" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="favorite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: '즐겨찾기',
          tabBarIcon: () => <Ionicons name="heart" size={24} color="tomato" />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '프로파일',
          tabBarIcon: () => <FontAwesome name="user" size={24} color="dodgerblue" />,
        }}
      />
    </Tab.Navigator>
  );
}
