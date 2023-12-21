import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MyPage from './MyPage';
import ProfilePage from './ProfilePage';
import { theme } from '../core/theme'

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'My ECO') {
            iconName = 'leaf';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user-o';
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      })}
    >
      <Tab.Screen name="My ECO" component={MyPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}
