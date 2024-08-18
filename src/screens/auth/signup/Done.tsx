import {Image, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {colors} from '../../../utils/styles';
import ButtonTag from '../../../components/elements/ButtonTag';
import {useNavigation} from '@react-navigation/native';

export default function Done({route}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        padding: 20,
        paddingBottom: 40,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../../assets/images/check.png')}
          style={{width: 120, height: 100}}
          resizeMode="contain"
        />
        <Text
          variant="headlineLarge"
          style={{
            color: colors.primaryText,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: 20,
          }}>
          You're all done!
        </Text>
        <Text
          variant="labelLarge"
          style={{
            color: colors.lightText,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Hang tight! We are currently reviewing your account and will follow up
          with you in 2-3 business days. In the meantime, you can setup your
          inventory.
        </Text>
      </View>
      <ButtonTag
        onPress={() => {
          navigation.navigate('Login');
        }}
        style={{padding: 5, borderRadius: 25}}>
        Got it!
      </ButtonTag>
    </View>
  );
}
