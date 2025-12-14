import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { store } from './src/shared/store/store';
import { AppNavigator } from './src/navigation/AppNavigator';
import { fetchCurrentUser } from './src/features/auth/store/authThunks';
import './src/shared/i18n/config';
import './global.css';

export default function App() {
  React.useEffect(() => {
    store.dispatch(fetchCurrentUser() as any);
  }, []);
  return (
    <Provider store={store}>
      <AppNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}
