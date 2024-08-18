import React, {PropsWithChildren, ReactNode} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {colors} from '../../../utils/styles';

type propType = {
  heading: string;
  subHeading: string;
  subHeadText: string;
  onPressHead: () => void;
  children: ReactNode;
};

export default function Template({
  heading,
  subHeading,
  onPressHead,
  subHeadText,
  children,
}: propType) {
  return (
    <View style={{flex: 1, backgroundColor: colors.white, padding: 20}}>
      <Text variant="bodyLarge" style={{color: colors.primaryText}}>
        FarmerEats
      </Text>

      <Text
        variant="headlineLarge"
        style={{
          color: colors.primaryText,
          fontWeight: '700',
          marginTop: 70,
        }}>
        {heading}
      </Text>
      <Text
        variant="labelLarge"
        style={{color: colors.lightText, fontWeight: '700', marginTop: 20}}>
        {subHeading}{' '}
        <Text style={{color: colors.primary}} onPress={onPressHead}>
          {subHeadText}
        </Text>
      </Text>

      {children}
    </View>
  );
}
