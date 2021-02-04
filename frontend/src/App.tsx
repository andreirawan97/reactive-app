import React from 'react';

import MainNavigator from './routes/MainNavigator';
import { ModalProvider, ScreenProvider } from './core-ui';

export default function App() {
  return (
    <ScreenProvider>
      <ModalProvider>
        <MainNavigator />
      </ModalProvider>
    </ScreenProvider>
  );
}
