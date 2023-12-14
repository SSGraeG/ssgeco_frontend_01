import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { View, StyleSheet, TouchableHighlight, Alert } from 'react-native';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      // 카메라 화면 종료
      console.log(photo)
      navigation.goBack();
      // 사진을 서버로 전송하는 로직을 여기에 구현하세요.
      // 예: uploadPhoto(photo.uri);
      Alert.alert('사진 전송', '사진을 서버로 전송했습니다.');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <View><Text>카메라 접근 권한이 없습니다.</Text></View>;
  }

  return (
    <View style={styles.container}>
    <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back}>
      <View style={styles.buttonContainer}>
        <TouchableHighlight style={styles.captureButton} onPress={takePicture}>
          <View />
        </TouchableHighlight>
      </View>
    </Camera>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  captureButton: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: '#ffffff',
      padding: 10,
    margin: 20,
  },
});
