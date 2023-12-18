import React, { useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const CouponList = ({ navigation }) => {
  const [currentMileage, setCurrentMileage] = useState(5000);

  const coupons = [
    { id: 1, name: '1000원 배달 할인 쿠폰', mileageRequired: 1000 },
    { id: 2, name: '2000원 배달 할인 쿠폰', mileageRequired: 2000 },
    { id: 3, name: '3000원 배달 할인 쿠폰', mileageRequired: 3000 },
  ];

  const handleExchange = (coupon) => {
    // 마일리지 교환 로직 구현
    console.log(`교환: ${coupon.name}`);
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>쿠폰 사용하기</Header>
      <Text style={styles.mileageText}>현재 마일리지: {currentMileage}점</Text>
      <View style={styles.container}>
        {coupons.map((coupon) => (
          <View key={coupon.id} style={styles.couponItem}>
            <Text style={styles.couponText}>{coupon.name}</Text>
            <TouchableOpacity onPress={() => handleExchange(coupon)} style={styles.exchangeButton}>
              <Text style={styles.exchangeButtonText}>교환</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  couponItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
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
    color: 'white', // 버튼 텍스트 색상
    fontWeight: 'bold', // 텍스트 굵기
  }
});

export default CouponList;
