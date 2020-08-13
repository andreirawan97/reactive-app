import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScene } from '../scenes/';

export default function MainNavigator() {
  const Stack = createStackNavigator();

  const AuthStackNavigator = () => (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={LoginScene} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
}
