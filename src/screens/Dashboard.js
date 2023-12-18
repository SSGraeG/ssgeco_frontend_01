import React from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

export default function Dashboard({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>마일리지 적립하기</Header>
      <Paragraph>
        Your amazing app starts here. Open your favorite code editor and start
        editing this project.
      </Paragraph>
      <Button mode="outlined" onPress={() => navigation.navigate('CameraScreen')}>
        사진 찍기
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('MyPage')}>
        마이페이지
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        로그아웃
      </Button>
    </Background>
  );
}