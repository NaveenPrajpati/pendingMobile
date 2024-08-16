import {View, Text} from 'react-native';
import React from 'react';
import {Avatar, Button} from 'react-native-paper';
import {colors} from '../utils/styles';

export default function SocialButtons() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <Button
        mode="outlined"
        style={{
          borderColor: colors.lightText,
          paddingHorizontal: 8,
          paddingVertical: 2,
        }}
        onPress={() => console.log('Pressed')}>
        <Avatar.Image
          size={24}
          style={{backgroundColor: 'white'}}
          source={require('../assets/images/google.png')}
        />
      </Button>
      <Button
        mode="outlined"
        style={{
          borderColor: colors.lightText,
          paddingHorizontal: 8,
          paddingVertical: 2,
        }}
        onPress={() => console.log('Pressed')}>
        <Avatar.Image
          size={24}
          style={{backgroundColor: 'white'}}
          source={require('../assets/images/apple.png')}
        />
      </Button>

      <Button
        mode="outlined"
        style={{
          borderColor: colors.lightText,
          paddingHorizontal: 8,
          paddingVertical: 2,
        }}
        onPress={() => console.log('Pressed')}>
        <Avatar.Image
          size={24}
          style={{backgroundColor: 'white'}}
          source={require('../assets/images/facebook.png')}
        />
      </Button>
    </View>
  );
}
