import React from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  CameraScreen,
  MyECO,
} from './src/screens';
import CouponList from './src/screens/CouponList';
import Donation from './src/screens/Donation';
import MyPageRoute from './src/screens/mypage/MyPageRoute';
import ProfilePage from './src/screens/mypage/ProfilePage';


const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="MyECO" component={MyECO} />
          <Stack.Screen name="CouponList" component={CouponList} />
          <Stack.Screen name="Donation" component={Donation} />
          <Stack.Screen name="MyPageRoute" component={MyPageRoute} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}