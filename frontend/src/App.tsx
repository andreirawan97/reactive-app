import React from 'react';

import MainNavigator from './routes/MainNavigator';
import { ModalProvider } from './core-ui';

export default function App() {
  return (
    <ModalProvider>
      <MainNavigator />
    </ModalProvider>
  );
}
