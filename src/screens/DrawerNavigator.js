import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Dashboard from './Dashboard';
import MyPage from './MyPage';
// ... 필요한 다른 컴포넌트 import

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="MyPage" component={MyPage} />
        {/* 필요한 다른 화면들을 여기에 추가 */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;