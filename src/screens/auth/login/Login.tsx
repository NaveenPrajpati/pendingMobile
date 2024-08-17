import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {Avatar, Button, Text, TextInput} from 'react-native-paper';
import {object, string} from 'yup';
import {colors} from '../../../utils/styles';
import Template from './Template';
import SocialButtons from '../../../components/SocialButtons';
import {LoginApi} from '../../../services/endPoints';
import Toast from 'react-native-toast-message';

let userSchema = object({
  password: string().required().min(3, 'minimum length 4'),
  email: string().email().required(),
});

export default function Login() {
  const navigation = useNavigation();
  function onSubmit(values) {
    values.role = 'farmer';
    values.device_token = '';
    values.type = 'email';
    values.social_id = 'dsafads';
    axios
      .post(LoginApi, values, {
        headers: {
          Accept: 'accplication/json',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
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
          <View style={{marginTop: 50}}>
            <TextInput
              placeholder="Email Address"
              style={{
                backgroundColor: colors.lightBg,
                borderRadius: 8,
                borderTopEndRadius: 8,
                borderTopStartRadius: 8,
              }}
              textColor="black"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholderTextColor={'grey'}
              underlineStyle={{width: 0}}
              mode="flat"
              left={<TextInput.Icon color={'black'} icon={'email'} />}
            />
            {errors.email && touched.email ? (
              <Text style={{color: 'red'}}>{errors.email}</Text>
            ) : null}
            <TextInput
              placeholder="Password"
              style={{
                backgroundColor: colors.lightBg,
                borderRadius: 8,
                borderTopEndRadius: 8,
                borderTopStartRadius: 8,
                marginTop: 20,
              }}
              textColor="black"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              underlineStyle={{width: 0}}
              placeholderTextColor={'grey'}
              mode="flat"
              secureTextEntry
              left={<TextInput.Icon color={'black'} icon={'lock'} />}
              right={
                <TextInput.Affix
                  text="Forgot?"
                  onPress={() => {
                    navigation.navigate('ForgetPass');
                  }}
                  textStyle={{color: colors.primary}}
                />
              }
            />
            {errors.password && touched.password ? (
              <Text style={{color: 'red'}}>{errors.password}</Text>
            ) : null}

            <Button
              mode="contained"
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
