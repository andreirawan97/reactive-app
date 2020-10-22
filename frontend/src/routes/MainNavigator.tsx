import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScene, MainScene, LevelScene, EditProfileScene } from '../scenes';
import { getFromStorage } from '../helpers/storage';
import { LOCALSTORAGE_KEYS } from '../constants/keys';
import { decodeToken } from '../helpers/token';

export default function MainNavigator() {
  const token = getFromStorage(LOCALSTORAGE_KEYS.TOKEN) || '';
  const decodedToken = decodeToken(token);

  const Stack = createStackNavigator();

  const AuthStackNavigator = () => (
    <Stack.Navigator headerMode="none" screenOptions={{ title: 'Reactive' }}>
      <Stack.Screen
        name="AuthScene"
        component={AuthScene}
        options={{ animationEnabled: true }}
      />
    </Stack.Navigator>
  );

  const MainStackNavigator = () => (
    <Stack.Navigator headerMode="none" screenOptions={{ title: 'Reactive' }}>
      <Stack.Screen
        name="MainScene"
        component={MainScene}
        options={{ animationEnabled: true }}
      />
      <Stack.Screen
        name="LevelScene"
        component={LevelScene}
        options={{ animationEnabled: true }}
      />
      <Stack.Screen
        name="EditProfileScene"
        component={EditProfileScene}
        options={{ animationEnabled: true }}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      {decodedToken ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
