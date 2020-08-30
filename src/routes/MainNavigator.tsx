import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScene, MainScene, LevelScene } from '../scenes';
import { getStorage } from '../helpers/storage';
import { LOCALSTORAGE_KEYS } from '../constants/keys';

export default function MainNavigator() {
  let isLogin = getStorage(LOCALSTORAGE_KEYS.IS_LOGGED_IN) || false;

  const Stack = createStackNavigator();

  const AuthStackNavigator = () => (
    <Stack.Navigator headerMode="none" screenOptions={{ title: 'Reactive' }}>
      <Stack.Screen name="AuthScene" component={AuthScene} />
    </Stack.Navigator>
  );

  const MainStackNavigator = () => (
    <Stack.Navigator headerMode="none" screenOptions={{ title: 'Reactive' }}>
      <Stack.Screen name="MainScene" component={MainScene} />
      <Stack.Screen name="LevelScene" component={LevelScene} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      {isLogin ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
