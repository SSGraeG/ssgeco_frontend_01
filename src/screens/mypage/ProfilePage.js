import React from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import Paragraph from '../../components/Paragraph';
import { useNavigation } from '@react-navigation/native';

export default function ProfilePage() {
    const navigation = useNavigation();

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Dashboard')} />
      <Logo />
      <Header>회원 정보</Header>
      <Paragraph >이름: </Paragraph>
      <Paragraph >이메일:</Paragraph>
      <Paragraph>주소:</Paragraph>
    </Background>
  );
}
