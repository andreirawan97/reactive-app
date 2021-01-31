import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import md5 from 'md5';

import Switcher from '../../core-ui/Switcher';
import { TextInput, Button, Loading } from '../../core-ui';
import { FONT_SIZE, COLORS } from '../../constants/styles';
import { LoginImage } from '../../../assets';
import { setToStorage } from '../../helpers/storage';
import { LOCALSTORAGE_KEYS } from '../../constants/keys';
import { FIREBASE_URL, ENDPOINT } from '../../constants/network';
import homebrewFetch from '../../helpers/homebrewFetch';

export default function AuthScene() {
  const [isRequesting, setRequesting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessageLogin, setErrorMessageLogin] = useState('');
  const [errorMessageSignup, setErrorMessageSignup] = useState('');

  let isFieldEmpty = (field: 'login' | 'signup') => {
    if (field === 'login') {
      return !!(username === '' || password === '');
    } else {
      return !!(username === '' || password === '' || name === '');
    }
  };

  let onLoginPressed = async () => {
    if (isFieldEmpty('login')) {
      setErrorMessageLogin('Please fill all the fields!');
    } else {
      setErrorMessageLogin('');
      setRequesting(true);

      const URL = `${FIREBASE_URL}${ENDPOINT.LOGIN}`;
      const response = await homebrewFetch('POST', URL, {
        username,
        password: md5(password),
      });
      const data = await response.json();

      let { success, message, token } = data;
      if (success) {
        onLoginSuccess(token);
      } else {
        setErrorMessageLogin(message);
      }
      setRequesting(false);
    }
  };

  let onSignupPressed = async () => {
    if (isFieldEmpty('signup')) {
      setErrorMessageSignup('Please fill all the fields');
    } else {
      setErrorMessageSignup('');
      setRequesting(true);

      const URL = `${FIREBASE_URL}${ENDPOINT.SIGNUP}`;
      const response = await homebrewFetch('POST', URL, {
        username,
        password: md5(password),
        name,
      });
      const data = await response.json();

      let { success, message, token } = data;
      if (success) {
        onSignupSuccess(token);
      } else {
        setErrorMessageSignup(message);
        setRequesting(false);
      }
    }
  };

  let onLoginSuccess = (token: string) => {
    setToStorage(LOCALSTORAGE_KEYS.TOKEN, token);
    window.location.reload();
    setRequesting(false);
  };

  let onSignupSuccess = (token: string) => {
    setToStorage(LOCALSTORAGE_KEYS.TOKEN, token);
    window.location.reload();
    setRequesting(false);
  };

  const LoginForm = () => (
    <View>
      <TextInput
        label="Username"
        containerStyle={{ marginBottom: 20 }}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        label="Password"
        secureTextEntry={true}
        containerStyle={{ marginBottom: 38 }}
        value={password}
        onChangeText={setPassword}
      />

      {isRequesting ? (
        <Loading />
      ) : (
        <Button title="Login" onPress={onLoginPressed} />
      )}

      <Text style={styles.errorMessageText}>{errorMessageLogin}</Text>
    </View>
  );

  const SignupForm = () => (
    <View>
      <TextInput
        label="Full Name"
        containerStyle={{ marginBottom: 20 }}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        label="Username"
        containerStyle={{ marginBottom: 20 }}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        label="Password"
        secureTextEntry={true}
        containerStyle={{ marginBottom: 38 }}
        value={password}
        onChangeText={setPassword}
      />

      {isRequesting ? (
        <Loading />
      ) : (
        <Button title="Signup" onPress={onSignupPressed} />
      )}

      <Text style={styles.errorMessageText}>{errorMessageSignup}</Text>
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
  errorMessageText: {
    color: COLORS.PASTEL_SALMON,
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});
