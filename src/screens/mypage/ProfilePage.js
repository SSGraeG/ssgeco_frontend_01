import React from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import Paragraph from '../../components/Paragraph';
import { useNavigation } from '@react-navigation/native';

export default function ProfilePage() {
    const navigation = useNavigation();

    // 임시 데이터
    const userInfo = {
        name: '홍길동',
        email: 'gildong@example.com',
        address: '서울특별시 강남구'
    };

    return (
        <Background>
            <BackButton goBack={() => navigation.navigate('Dashboard')} />
            <Logo />
            <Header>회원 정보</Header>
            <Paragraph>이름: {userInfo.name}</Paragraph>
            <Paragraph>이메일: {userInfo.email}</Paragraph>
            <Paragraph>주소: {userInfo.address}</Paragraph>
        </Background>
    );
}
