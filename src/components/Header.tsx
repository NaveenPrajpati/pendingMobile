import {View, Text} from 'react-native';
import React from 'react';
import {Appbar, Avatar, Switch, useTheme} from 'react-native-paper';
import {PreferencesContext} from '../contexts/PreferenceContext';

export default function Header() {
  const theme = useTheme();
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);
  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: theme?.colors.surface,
        },
      }}>
      {/* <Appbar.BackAction onPress={() => {}} /> */}
      <Appbar.Content
        title="Project management"
        color={theme?.colors.primary}
      />
      {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
      {/* <Avatar.Icon size={24} icon="folder" /> */}

      <Switch color={'red'} value={isThemeDark} onValueChange={toggleTheme} />
      <Appbar.Action icon="folder" iconColor="black" onPress={() => {}} />
    </Appbar.Header>
  );
}
