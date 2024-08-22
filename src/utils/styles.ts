import {Dimensions} from 'react-native';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

export const colors = {
  primary: '#D5715B',
  secondary: '#F8C569',
  tertiary: '#5EA25F',
  primaryText: '#261C12',
  white: 'white',
  lightText: 'rgba(0, 0, 0, 0.3)',
  lightBg: '#EEEDEC',
  lightBlue: '#0047FF',
  lightGreen: '#00CB14',
  teja: '',
  black: 'black',
  gray: 'gray',
  grey: 'grey',
};

export const screenW = Dimensions.get('window').width;
export const screenH = Dimensions.get('window').height;

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
export const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
