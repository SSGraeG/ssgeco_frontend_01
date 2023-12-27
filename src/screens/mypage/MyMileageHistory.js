import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Button, Modal, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import Background from '../../components/Background';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import { Calendar } from 'react-native-calendars';

const MileageHistory = ({ navigation }) => {
  const [history, setHistory] = useState([]); // 마일리지 내역 상태
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);
  const [isEndDatePicked, setIsEndDatePicked] = useState(false);

  useEffect(() => {
    // API 호출 로직
    fetchMileageHistory().then(data => {
      setHistory(data);
    });
  }, []);

  const fetchMileageHistory = () => {
    // 백엔드에서 데이터 가져오는 로직 구현
    return Promise.resolve([
      /* 데이터 예시 */
    ]);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const onDayPress = (day) => {
    if (!isStartDatePicked || (isStartDatePicked && isEndDatePicked)) {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
      setIsStartDatePicked(true);
      setIsEndDatePicked(false);
    } else {
      setSelectedEndDate(day.dateString);
      setIsEndDatePicked(true);
    }
  };

  const onConfirm = () => {
    hideDatePicker();
  };

  const filteredHistory = history.filter((item) => {
    const date = new Date(item.date);
    const startDate = new Date(selectedStartDate);
    const endDate = new Date(selectedEndDate || selectedStartDate); // 종료 날짜가 없으면 시작 날짜를 사용
    return date >= startDate && date <= endDate;
  });

  const renderSelectedDates = () => {
    if (!selectedStartDate) {
      return <Text style={styles.dateText}>날짜를 선택해주세요.</Text>;
    } else if (selectedStartDate && !selectedEndDate) {
      return <Text style={styles.dateText}>시작 날짜: {selectedStartDate}</Text>;
    } else {
      return (
        <Text style={styles.dateText}>
          시작 날짜: {selectedStartDate} - 종료 날짜: {selectedEndDate}
        </Text>
      );
    }
  };


  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>마일리지 사용 내역</Header>
      <TouchableOpacity onPress={showDatePicker} style={styles.button}>
        <Text>날짜 선택</Text>
      </TouchableOpacity>
      {renderSelectedDates()}
      <Modal visible={isDatePickerVisible} animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Calendar
              onDayPress={onDayPress}
              // 기타 Calendar 속성
            />
            <Button title="확인" onPress={onConfirm} />
            <Button title="취소" onPress={hideDatePicker} />
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.container}>
        {filteredHistory.map((item, index) => (
          <Card key={index}>
            <Card.Title>사용 내역</Card.Title>
            <Card.Divider />
            <Card.FeaturedSubtitle>날짜: {item.date}</Card.FeaturedSubtitle>
            <Card.FeaturedSubtitle>사용 포인트: {item.points}</Card.FeaturedSubtitle>
            <Card.FeaturedSubtitle>사용처: {item.usedAt}</Card.FeaturedSubtitle>
          </Card>
        ))}
      </ScrollView>
    </Background>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

export default MileageHistory;
