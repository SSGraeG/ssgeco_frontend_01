import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Background from '../../components/Background';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';

const MileageHistory = ({ navigation }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // API 호출을 통해 마일리지 사용 내역을 가져오는 로직
    // 예시: fetchMileageHistory().then(data => setHistory(data));
  }, []);

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>마일리지 사용 내역</Header>
      <ScrollView style={styles.container}>
        {history.length === 0 ? (
          <Card>
            <Card.Title>사용 내역이 없습니다</Card.Title>
          </Card>
        ) : (
          history.map((item, index) => (
            <Card key={index}>
              <Card.Title>사용 내역</Card.Title>
              <Card.Divider />
              <Card.FeaturedSubtitle>날짜: {item.date}</Card.FeaturedSubtitle>
              <Card.FeaturedSubtitle>사용 포인트: {item.points}</Card.FeaturedSubtitle>
              <Card.FeaturedSubtitle>사용처: {item.usedAt}</Card.FeaturedSubtitle>
            </Card>
          ))
        )}
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  }
});

export default MileageHistory;
