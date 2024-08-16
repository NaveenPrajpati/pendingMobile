import {View, ViewProps} from 'react-native';
import React, {Children, ReactNode} from 'react';
import TextInputTag from '../../../components/elements/TextInputTag';
import {colors} from '../../../utils/styles';
import {Text} from 'react-native-paper';
import SocialButtons from '../../../components/SocialButtons';
import ButtonTag from '../../../components/elements/ButtonTag';
import VectorIcon from '../../../components/VectorIcon';
import {useNavigation} from '@react-navigation/native';

interface propType extends ViewProps {
  heading: string;
  info?: string;
  stage: Number;
  onPress: () => void;
  children: ReactNode;
}

export default function SignupTemplate(props: propType) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        padding: 20,
      }}>
      <View>
        <Text variant="bodyLarge" style={{color: colors.primaryText}}>
          FarmerEats
        </Text>
        <Text
          variant="labelLarge"
          style={{color: colors.lightText, marginTop: 20}}>
          Signup {props.stage} of 4
        </Text>
        <Text
          variant="headlineLarge"
          style={{color: colors.primaryText, fontWeight: '700'}}>
          {props.heading}
        </Text>

        {props.stage == 1 && (
          <View style={{marginTop: 20}}>
            <SocialButtons />
          </View>
        )}

        {props.info && (
          <Text
            variant="labelLarge"
            style={{
              color: colors.lightText,
              marginTop: 20,
              textAlign: 'center',
            }}>
            {props.info}
          </Text>
        )}

        {props.children}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {props.stage == 1 ? (
          <Text
            variant="labelLarge"
            style={{color: colors.black, textDecorationLine: 'underline'}}>
            Login
          </Text>
        ) : (
          <VectorIcon
            onPress={() => {
              navigation.goBack();
            }}
            iconName="arrowleft"
            iconPack="AntDesign"
            size={20}
            style={{fontWeight: '700'}}
            color="black"
          />
        )}
        <ButtonTag onPress={props.onPress}>Continue</ButtonTag>
      </View>
    </View>
  );
}
