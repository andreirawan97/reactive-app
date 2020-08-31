import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Alert, Modal } from 'react-native';

import Switcher from '../../core-ui/Switcher';
import { TextInput, Button } from '../../core-ui';
import { FONT_SIZE } from '../../constants/styles';
import { LoginImage } from '../../../assets';
import { setStorage } from '../../helpers/storage';
import { LOCALSTORAGE_KEYS } from '../../constants/keys';

export default function AuthScene() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  let onLoginSuccess = () => {
    setStorage(LOCALSTORAGE_KEYS.IS_LOGGED_IN, true);
    window.location.reload();
  };

  const LoginForm = () => (
    <View>
      <TextInput
        label="Email"
        containerStyle={{ marginBottom: 20 }}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label="Password"
        secureTextEntry={true}
        containerStyle={{ marginBottom: 38 }}
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Login"
        onPress={() => {
          onLoginSuccess();
        }}
      />
    </View>
  );

  const SignupForm = () => (
    <View>
      <TextInput
        label="Full Name"
        containerStyle={{ marginBottom: 20 }}
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        label="Email"
        containerStyle={{ marginBottom: 20 }}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label="Password"
        secureTextEntry={true}
        containerStyle={{ marginBottom: 38 }}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Signup"
        onPress={() => {
          Alert.alert('Tes', `${email} ${password}`);
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={LoginImage} style={styles.image} />

        <Text style={styles.joinNowText}>
          Start your journey now! <br /> Over 1,000,000 already join
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.reactiveText}>Reactive</Text>
        </View>
        <View style={styles.authFormContainer}>
          <Switcher
            contents={[
              { headerText: 'Login', component: LoginForm },
              { headerText: 'Signup', component: SignupForm },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 3,
  },
  rightContainer: {
    flex: 2,
    backgroundColor: 'white',
  },
  authFormContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 38,
  },
  reactiveText: {
    fontSize: FONT_SIZE.HEADER1,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    padding: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  joinNowText: {
    zIndex: 1,
    position: 'absolute',
    fontSize: FONT_SIZE.HEADER2,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    bottom: 60,
  },
});
