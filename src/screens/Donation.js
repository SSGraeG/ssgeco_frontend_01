import React, { useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Paragraph from '../components/Paragraph';


const Donation = ({ navigation }) => {
  const [currentMileage, setCurrentMileage] = useState(5000);

  const coupons = [
    { id: 1, name: '1000원 연탄 기부', mileageRequired: 1000 },
    { id: 2, name: '2000원 동물 보호', mileageRequired: 2000 },
    { id: 3, name: '3000원 행복 나눔 식권', mileageRequired: 3000 },
  ];

  const handleExchange = (coupon) => {
    // 마일리지가 쿠폰에 필요한 마일리지보다 많거나 같으면 교환
    if (currentMileage >= coupon.mileageRequired) {
      console.log(`교환: ${coupon.name}`);
      setCurrentMileage(currentMileage - coupon.mileageRequired);
      // 쿠폰 교환 로직 추가
    } else {
      // 마일리지가 부족한 경우
      console.log('마일리지가 부족합니다.');
    }
  };
  
  const disabledButton = StyleSheet.create({
    exchangeButton: {
      backgroundColor: '#ccc',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 5,
    },
    exchangeButtonText: {
      color: '#666',
      fontWeight: 'bold',
    },
  });

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>마일리지 기부</Header>
        <Text style={styles.mileageText}>현재 마일리지: {currentMileage}점</Text>
        <Paragraph>
          {coupons.map((coupon) => (
            <View key={coupon.id} style={styles.couponItem}>
              <Text style={styles.couponText}>{coupon.name}</Text>
              <TouchableOpacity 
                onPress={() => handleExchange(coupon)} 
                style={currentMileage >= coupon.mileageRequired ? styles.exchangeButton : disabledButton.exchangeButton}
                disabled={currentMileage < coupon.mileageRequired}
              >
                <Text style={currentMileage >= coupon.mileageRequired ? styles.exchangeButtonText : disabledButton.exchangeButtonText}>
                  교환
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </Paragraph>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  couponItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  couponText: {
    fontSize: 16, 
  },
  exchangeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  mileageText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  exchangeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Donation;