import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CouponList from './CouponList';
import Donation from './Donation';
import { theme } from '../core/theme';

const Tab = createBottomTabNavigator();

export default function MileageRoute() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'CouponList') {
              iconName = 'ticket';
            } else if (route.name === 'Donation') {
              iconName = 'heart';
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
      <Tab.Screen name="CouponList" component={CouponList} />
      <Tab.Screen name="Donation" component={Donation} />
    </Tab.Navigator>
  );
}
