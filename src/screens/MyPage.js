import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../core/theme';
import Button from '../components/Button';
import Background from '../components/Background';
import Logo from '../components/Logo';

export default function MyPage() {
  const handleButtonPress = () => {
    // Handle button press action here
    // For example: navigation.navigate('AnotherScreen');
  };

  return (
    <Background>
      <View style={styles.logoContainer}>
        <Logo style={styles.logo} />
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>My ECO</Text>
          {/* Placeholder for other components */}
          <Text>마일리지 적립 횟수 : </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleButtonPress} style={styles.customButton}>
            사용하기
          </Button>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 30, // Adjust this value to move the Logo component down
  },
  logo: {
    // Add styles for the Logo component if needed
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20, // Adjust the paddingTop as needed
    paddingBottom: 20,
    paddingHorizontal: 20, // Add horizontal padding for content
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.primary,
  },
  buttonContainer: {
    width: '80%', // Adjust width or other styles as needed
    alignSelf: 'center',
  },
  customButton: {
    width: '100%', // Adjust width or other styles as needed
  },
});