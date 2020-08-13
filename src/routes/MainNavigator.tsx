import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScene } from '../scenes';

export default function MainNavigator() {
  const Stack = createStackNavigator();

  const AuthStackNavigator = () => (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AuthScene" component={AuthScene} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
}
