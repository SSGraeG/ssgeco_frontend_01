import React, { useState, useEffect } from 'react';
import { Modal, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import Background from '../../components/Background';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MileageHistory = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    fetchMileageHistory().then(data => {
      setHistory(data);
    });
  }, []);

  const fetchMileageHistory = async () => {
    try {
      const token = await AsyncStorage.getItem('Token');
      const url = apiUrl + '/get_mileage_tracking'; // 백엔드 API 엔드포인트에 맞게 수정해야 합니다.
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-access-token': token,
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      return responseData.result; // 서버에서 받은 데이터를 반환합니다.
    } catch (error) {
      console.error('Error fetching mileage history:', error.message);
      // 에러 핸들링 또는 에러 메시지 표시 등의 로직 추가 가능
      return []; // 에러가 발생하면 빈 배열을 반환합니다.
    }
  };
  
  const sendSelectedDatesToBackend = async (selectedStartDate, selectedEndDate) => {
    try {
      const token = await AsyncStorage.getItem('Token');
      const url = apiUrl + '/get_mileage_tracking'; // Replace with your actual backend API endpoint
      const requestBody = {
        start_date: selectedStartDate,
        end_date: selectedEndDate,
      };
    console.log(selectedStartDate, selectedEndDate)
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
          // Add any necessary headers (e.g., authorization token) here
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Handle the response from the backend if needed
      const responseData = await response.json();
      // setHistory(responseData.result); // responseData.result를 history 상태로 설정

      // const newHistory = await fetchMileageHistory(responseData.result);
      setHistory(responseData.result);
      console.log('Response from backend:', responseData.result);
      // Do something with the response data if required
    } catch (error) {
      console.error('Error sending data to backend:', error.message);
      // Handle errors, show an error message, etc.
    }
  };
  
  const showCalendar = () => {
    setCalendarVisible(true);
  };

  const handleCalendarConfirm = () => {
    setCalendarVisible(false);
    // Add additional logic if needed
    if (selectedStartDate && selectedEndDate) {
      sendSelectedDatesToBackend(selectedStartDate, selectedEndDate);
    }
  };

  const handleCalendarCancel = () => {
    setCalendarVisible(false);
 
  
  };

  // const onDayPress = (day) => {
  //   if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
  //     setSelectedStartDate(day.dateString);
  //     setSelectedEndDate(null);
  //   } else if (day.dateString >= selectedStartDate) {
  //     setSelectedEndDate(day.dateString);
  //   }
  // };
  const formatDate = (date) => {
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  const onDayPress = (day) => {
    console.log(day.dateString)
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate(null);
    } else if (selectedEndDate || day.dateString >= selectedStartDate) {
      setSelectedEndDate(day.dateString);
    }
  };
  

  const filteredHistory = history.filter((item) => {
    const use_date = new Date(item.use_date);
    const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
    const endDate = selectedEndDate ? new Date(selectedEndDate) : null;
    return (!startDate || use_date >= startDate) && (!endDate || use_date <= endDate);
  });

  // const filteredHistory = Array.isArray(history) ? history.filter((item) => {
  //   const use_date = new Date(item.use_date);
  //   const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
  //   const endDate = selectedEndDate ? new Date(selectedEndDate) : null;
  //   return (!startDate || use_date >= startDate) && (!endDate || use_date <= endDate);
  // }) : [];
  


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
{history.map((item, index) => (
  <Card key={index}>
    <Card.Title>사용 내역</Card.Title>
    <Card.Divider />
    <Text>날짜: {formatDate(new Date(item.use_date))}</Text>
    <Text>사용 포인트: {item.mileage_category.usepoint}</Text>
    <Text>사용처: {item.mileage_category.name}</Text>
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
