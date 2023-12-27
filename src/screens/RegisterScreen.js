import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Paragraph } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen({ route }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
  const [address, setAddress] = useState({ value: '', error: '' });
  const [showAddressInput, setShowAddressInput] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.selectedAddress) {
      setAddress({ value: route.params.selectedAddress, error: '' });
    }
  }, [route.params]);

  useEffect(() => {
    if (route.params?.selectedAddress) {
      setAddress({ value: route.params.selectedAddress, error: '' });
      setShowAddressInput(false); // 주소가 선택되면 버튼을 숨깁니다.
    }
  }, [route.params]);

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const confirmPasswordError = password.value === confirmPassword.value ? '' : '비밀번호가 일치하지 않습니다.';
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    if (emailError || passwordError || nameError || confirmPasswordError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
      return;
    }
    fetch(apiUrl + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        name: name.value,
        password: password.value,
        address: address.value
      })
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 500) {
        throw new Error('회원가입 실패: 중복된 사용자');
      } else {
        throw new Error('서버 오류');
      }
    })
    .then(data => {
      console.log(data);
      navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>회원가입</Header>
      <TextInput
        label="사용자 이름"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="이메일"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="비밀번호"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="비밀번호 확인"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
      />
      {showAddressInput && (
        <Button mode="outlined" onPress={() => navigation.navigate('AddressScreen')}>
          주소 입력
        </Button>
      )}
      {address.value && (
        <View style={styles.addressContainer}>
          <View style={styles.addressLabelContainer}>
            <Text style={styles.addressLabel}>주소: {address.value}</Text>
          </View>
        </View>
      )}
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        회원가입
      </Button>
      <View style={styles.row}>
        <Paragraph>계정이 이미 있나요?</Paragraph>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Paragraph style={styles.link}>로그인</Paragraph>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: theme.colors.primary,
  },
  addressContainer: {
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  addressLabelContainer: {
    position: 'absolute',
    top: -14, // 이 값은 주소 라벨의 높이에 따라 조정해야 할 수 있습니다.
    backgroundColor: theme.colors.background,
    paddingHorizontal: 8,
    zIndex: 1,
  },
  addressLabel: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  addressBox: {
    paddingTop: 20, // 주소 라벨의 높이에 맞게 패딩 조정
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
  },
})