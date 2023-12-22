import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';

const CouponList = ({ navigation }) => {
  const [currentMileage, setCurrentMileage] = useState();
  const [coupons, setCoupons] = useState([]);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  // 쿠폰 리스트 불러오는 로직
  useEffect(() => {
    fetch(apiUrl + '/coupon_list')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 500) {
          throw new Error('요청중 에러가 발생');
        } else {
          throw new Error('서버 오류');
        }
      })
      .then(data => {
        // 서버로부터 받은 데이터의 'coupon' 필드가 배열인지 확인
        if (Array.isArray(data.coupon)) {
          setCoupons(data.coupon);
        } else {
          // 'coupon' 필드가 배열이 아닐 경우, 빈 배열로 설정
          setCoupons([]);
        }
      })
      .catch(error => {
        console.error('Error fetching coupons:', error);
        // 오류 발생 시, 빈 배열로 설정
        setCoupons([]);
      });
  }, []);  

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>쿠폰 사용하기</Header>
      <Text style={styles.mileageText}>현재 마일리지: {currentMileage}점</Text>

      <ScrollView style={styles.scrollView}>
      {coupons.length > 0 ? (
        coupons.map((coupon) => (
          <Card key={coupon.id} containerStyle={styles.cardStyle}>
            <Card.Title>{coupon.name}</Card.Title>
            <Card.Divider />
            <Text style={styles.couponText}>
              필요 마일리지: {coupon.usepoint}
            </Text>
            <TouchableOpacity
              onPress={() => handleExchange(coupon)}
              disabled={currentMileage < coupon.usepoint}
              style={currentMileage >= coupon.usepoint ? styles.exchangeButton : styles.disabledButton}
            >
              <Text style={styles.exchangeButtonText}>교환</Text>
            </TouchableOpacity>
          </Card>
        ))
      ) : (
        <Text style={styles.noCouponsText}>사용 가능한 쿠폰이 없습니다.</Text>
      )}
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
  noCouponsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CouponList;
