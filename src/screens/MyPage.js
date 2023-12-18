import React, { useState, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { Text, StyleSheet } from 'react-native';
import Paragraph from '../components/Paragraph';
import { useNavigation } from '@react-navigation/native';

export default function MyPage() {
  const navigation = useNavigation();
  const [mileageInfo, setMileageInfo] = useState({
    mileageCount: 0,  // 마일리지 적립 횟수
    donationCount: 0, // 기부 횟수
    ecoMileage: 0,    // 에코 마일리지
    coupons: []       // 보유 쿠폰 리스트
  });

  useEffect(() => {
    // API 호출을 통해 마일리지 정보 가져오기
    // 예: fetchMileageInfo().then(data => setMileageInfo(data));
    // 임시 데이터로 상태 설정
    setMileageInfo({
      mileageCount: 10,
      donationCount: 5,
      ecoMileage: 150,
      coupons: ['2000원 배달 할인 쿠폰', '1000원 배달 할인 쿠폰']
    });
  }, []);

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>My ECO</Header>
      <Paragraph>
        <Text style={styles.infoText}>마일리지 적립 횟수: {mileageInfo.mileageCount}</Text>
        <Text style={styles.infoText}>기부 횟수: {mileageInfo.donationCount}</Text>
        <Text style={styles.infoText}>에코 마일리지: {mileageInfo.ecoMileage}</Text>
        {mileageInfo.coupons.length > 0 && <Text style={styles.infoText}>보유 쿠폰:</Text>}
        {mileageInfo.coupons.map((coupon, index) => (
          <Text key={index} style={styles.couponText}>{coupon}</Text>
        ))}
      </Paragraph>
      <Button mode="outlined" onPress={() => navigation.navigate('CouponList')}>
        쿠폰 교환
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('MyPage')}>
        마일리지 기부
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  mileageInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  infoText: {
    fontSize: 16,
    color: theme.colors.text, // theme.js의 텍스트 색상 사용
    marginBottom: 4,
  },
  couponText: {
    fontSize: 14,
    color: theme.colors.secondary, // theme.js의 보조 색상 사용
  },
});