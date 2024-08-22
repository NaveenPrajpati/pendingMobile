// In App.js in a new project

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Routes from './src/Routes';
import {CombinedDarkTheme, CombinedDefaultTheme} from './src/utils/styles';
import {PreferencesContext} from './src/contexts/PreferenceContext';

const Stack = createNativeStackNavigator();

function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Provider store={store}>
            <Routes />
            <Toast />
          </Provider>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}

export default App;
