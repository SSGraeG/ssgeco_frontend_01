import React, { useState, useEffect } from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import { Text } from 'react-native';
import Paragraph from '../../components/Paragraph';
import { useNavigation } from '@react-navigation/native';

export default function MyECO() {
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
      ecoMileage: 5000,
      coupons: ['2000원 배달 할인 쿠폰', '1000원 배달 할인 쿠폰']
    });
  }, []);

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Dashboard')} />
      <Logo />
      <Header>My ECO</Header>
        <Paragraph >마일리지 적립 횟수: <Text style={{ color: '#50ceca' }}>{mileageInfo.mileageCount}</Text></Paragraph>
        <Paragraph>기부 횟수: <Text style={{ color: '#50ceca' }}>{mileageInfo.donationCount}</Text></Paragraph>
        <Paragraph>에코 마일리지: <Text style={{ color: '#50ceca' }}>{mileageInfo.ecoMileage}</Text></Paragraph>
        {mileageInfo.coupons.length > 0 && <Paragraph>보유 쿠폰</Paragraph>}
        {mileageInfo.coupons.map((coupon, index) => (
          <Paragraph key={index}>
            <Text style={{ color: '#50ceca' }}>{coupon}</Text>
          </Paragraph>
        ))}
    </Background>
  );
}