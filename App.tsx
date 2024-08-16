// In App.js in a new project

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Routes from './src/Routes';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <Routes />
          <Toast />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
