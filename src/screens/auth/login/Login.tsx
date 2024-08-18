import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import {
  Avatar,
  Button,
  Icon,
  MD3Colors,
  Text,
  TextInput,
} from 'react-native-paper';
import {object, string} from 'yup';
import {colors} from '../../../utils/styles';
import Template from './Template';
import SocialButtons from '../../../components/SocialButtons';
import {LoginApi} from '../../../services/endPoints';
import Toast from 'react-native-toast-message';
import {getDeviceId, getDeviceToken} from 'react-native-device-info';
import TextInputTag from '../../../components/elements/TextInputTag';
import VectorIcon from '../../../components/VectorIcon';

let userSchema = object({
  password: string().required().min(3, 'minimum length 4'),
  email: string().email().required(),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    if (Platform.OS == 'ios') {
      getDeviceToken()
        .then(res => {
          setDeviceId(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setDeviceId(getDeviceId());
    }
  }, []);

  function onSubmit(values) {
    setLoading(true);
    values.role = 'farmer';
    values.device_token = deviceId;
    values.type = 'email/facebook/google/apple';
    values.social_id = '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx';
    axios
      .post(LoginApi, values, {
        headers: {
          Accept: 'accplication/json',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
        if (res.data.success) {
          Toast.show({type: 'success', text1: res.data.message});
          setLoading(false);
          navigation.navigate('SignupNavigator', {screen: 'Done'});
        } else {
          Toast.show({type: 'error', text1: res.data.message});
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);

        Toast.show({type: 'error', text1: err});
        setLoading(false);
      });
  }

  return (
    <Template
      heading="Welcome back!"
      subHeading="New here?"
      subHeadText="Create account"
      onPressHead={() => {
        navigation.navigate('SignupNavigator', {screen: 'Signup'});
      }}>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={userSchema}
        onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{marginTop: 50, rowGap: 20}}>
            <TextInputTag
              placeholder="Email Address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              mode="flat"
              left={
                <TextInput.Icon
                  color={'black'}
                  icon={() => (
                    <VectorIcon
                      iconName="email"
                      iconPack="Entypo"
                      size={20}
                      color="black"
                    />
                  )}
                />
              }
              error={errors.email && touched.email ? true : false}
              errorMessage={errors.email}
            />

            <TextInputTag
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              left={<TextInput.Icon color={'black'} icon={'lock-outline'} />}
              right={
                <TextInput.Affix
                  text="Forgot?"
                  onPress={() => {
                    navigation.navigate('ForgetPass');
                  }}
                  textStyle={{color: colors.primary}}
                />
              }
              error={errors.password && touched.password ? true : false}
              errorMessage={errors.password}
            />

            <Button
              mode="contained"
              loading={loading}
              buttonColor={colors.primary}
              style={{padding: 2, marginTop: 30}}
              textColor={colors.white}
              onPress={handleSubmit}>
              Login
            </Button>
          </View>
        )}
      </Formik>
      <View style={{rowGap: 40, marginTop: 20}}>
        <Text
          variant="labelLarge"
          style={{color: colors.lightText, textAlign: 'center'}}>
          or login with
        </Text>
        <SocialButtons />
      </View>
    </Template>
  );
}
