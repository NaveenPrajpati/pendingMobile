import {Image, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {colors} from '../../../utils/styles';
import ButtonTag from '../../../components/elements/ButtonTag';

export default function Done({route}) {
  const {data} = route.params;
  console.log('prev-done', data);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        padding: 20,
        paddingBottom: 40,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
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
      <ButtonTag style={{padding: 5, borderRadius: 25}}>Got it!</ButtonTag>
    </View>
  );
}
