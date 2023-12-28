import React, { useState, useEffect } from 'react';
import { Modal, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import Background from '../../components/Background';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import { Calendar } from 'react-native-calendars';

const MileageHistory = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  useEffect(() => {
    fetchMileageHistory().then(data => {
      setHistory(data);
    });
  }, []);

  const fetchMileageHistory = () => {
    // Fetch data from backend
    return Promise.resolve([
      /* Sample data */
      {
        use_date: '2023-12-05',
        mileage: 1000,
        mileage_category_id: '4'
      },
      {
        use_date: '2023-12-10',
        mileage: 200,
        mileage_category_id: '5'
      },
      {
        use_date: '2023-12-15',
        mileage: 150,
        mileage_category_id: '4'
      }
    ]);
  };

  const showCalendar = () => {
    setCalendarVisible(true);
  };

  const handleCalendarConfirm = () => {
    setCalendarVisible(false);
    // Add additional logic if needed
  };

  const handleCalendarCancel = () => {
    setCalendarVisible(false);
    // Add additional logic if needed
  };

  const onDayPress = (day) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
    } else if (day.dateString >= selectedStartDate) {
      setSelectedEndDate(day.dateString);
    }
  };

  const filteredHistory = history.filter((item) => {
    const use_date = new Date(item.use_date);
    const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
    const endDate = selectedEndDate ? new Date(selectedEndDate) : null;
    return (!startDate || use_date >= startDate) && (!endDate || use_date <= endDate);
  });

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('Dashboard')} />
      <Header>마일리지 사용 내역</Header>
      <TouchableOpacity onPress={showCalendar} style={styles.button}>
        <Text>날짜 범위 선택</Text>
      </TouchableOpacity>
      {selectedStartDate && (
        <View style={styles.dateRangeBox}>
          <Text style={styles.dateRangeText}>
            {selectedStartDate} ~ {selectedEndDate ? selectedEndDate : '...'}
          </Text>
        </View>
      )}
      <Modal
        visible={isCalendarVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={{
                [selectedStartDate]: { startingDay: true, color: 'green', textColor: 'white' },
                [selectedEndDate]: { endingDay: true, color: 'green', textColor: 'white' },
              }}
              markingType={'period'}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={handleCalendarConfirm} style={styles.modalButton}>
                <Text>확인</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCalendarCancel} style={styles.modalButton}>
                <Text>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.container}>
        {filteredHistory.map((item, index) => (
          <Card key={index}>
            <Card.Title>사용 내역</Card.Title>
            <Card.Divider />
            <Card.FeaturedSubtitle>날짜: {item.use_date}</Card.FeaturedSubtitle>
            <Card.FeaturedSubtitle>사용 포인트: {item.mileage}</Card.FeaturedSubtitle>
            <Card.FeaturedSubtitle>사용처: {item.mileage_category_id}</Card.FeaturedSubtitle>
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
    margin: 10,
  },
  dateRangeBox: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
  },
  dateRangeText: {
    fontSize: 16,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
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
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  modalButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10
  },
});

export default MileageHistory;
