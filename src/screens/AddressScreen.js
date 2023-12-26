import React from 'react';
import { View, StyleSheet } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import BackButton from '../components/BackButton';
import { useNavigation } from '@react-navigation/native';

export default function AddressSearchScreen({ navigation }) {
  const handleAddressSelection = (data) => {
    // 선택된 주소 데이터를 처리하는 로직을 추가하세요.
    console.log('Selected address:', data);

    // 선택된 주소를 회원가입 페이지로 전달하고 이동합니다.
    navigation.navigate('RegisterScreen', { selectedAddress: data });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton goBack={() => navigation.navigate('RegisterScreen')} />
      </View>
      <View style={styles.postcodeContainer}>
        <Postcode
          style={styles.postcode}
          jsOptions={{ animation: true }}
          onSelected={(data) => handleAddressSelection(data)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 20,
    zIndex: 1,
  },
  postcodeContainer: {
    marginTop: 150,
    width: '100%',
    flex: 1,
  },
  postcode: {
    width: '100%',
    height: '100%',
  },
});