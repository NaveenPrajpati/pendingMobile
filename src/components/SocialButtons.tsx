import {View, Text} from 'react-native';
import React from 'react';
import {Avatar, Button} from 'react-native-paper';
import {colors} from '../utils/styles';

export default function SocialButtons() {
  const data = [
    require('../assets/images/google.png'),
    require('../assets/images/apple.png'),
    require('../assets/images/facebook.png'),
  ];
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      {data.map((item, index) => (
        <Button
          key={index}
          mode="outlined"
          style={{
            borderColor: colors.lightBg,
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 25,
          }}
          onPress={() => console.log('Pressed')}>
          <Avatar.Image
            size={24}
            style={{backgroundColor: 'white'}}
            source={item}
          />
        </Button>
      ))}
    </View>
  );
}
