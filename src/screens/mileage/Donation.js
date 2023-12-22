import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';


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

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>쿠폰 사용하기</Header>
      <Text style={styles.mileageText}>현재 마일리지: {currentMileage}점</Text>

      <ScrollView style={styles.scrollView}>
      {coupons.map((coupon) => (
        <Card key={coupon.id}  containerStyle={styles.cardStyle}>
          <Card.Title>{coupon.name}</Card.Title>
          <Card.Divider />
          <Text style={styles.couponText}>
            필요 마일리지: {coupon.mileageRequired}
          </Text>
          <TouchableOpacity
            onPress={() => handleExchange(coupon)}
            disabled={currentMileage < coupon.mileageRequired}
            style={currentMileage >= coupon.mileageRequired ? styles.exchangeButton : styles.disabledButton}
          >
            <Text style={styles.exchangeButtonText}>교환</Text>
          </TouchableOpacity>
        </Card>
      ))}
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  cardStyle: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  mileageText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  couponText: {
    fontSize: 15,
    marginBottom: 10,
  },
  exchangeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  exchangeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Donation;
