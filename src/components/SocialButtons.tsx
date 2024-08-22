import {View, Text, GestureResponderEvent} from 'react-native';
import React, {useState} from 'react';
import {Avatar, Button} from 'react-native-paper';
import {colors} from '../utils/styles';

import axios from 'axios';
import {LoginApi} from '../services/endPoints';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

export default function SocialButtons({
  onPress,
}: {
  onPress: (e: string) => void;
}) {
  const data = [
    {
      name: 'google',
      image: require('../assets/images/google.png'),
    },
    {
      name: 'apple',
      image: require('../assets/images/apple.png'),
    },
    {
      name: 'facebook',
      image: require('../assets/images/facebook.png'),
    },
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
          onPress={() => onPress(item.name)}>
          <Avatar.Image
            size={24}
            style={{backgroundColor: 'white'}}
            source={item.image}
          />
        </Button>
      ))}
    </View>
  );
}
