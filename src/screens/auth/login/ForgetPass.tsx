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

let userSchema = object({
  phone: string().required().min(1, 'minimum length 4'),
});

export default function ForgetPass() {
  const navigation = useNavigation();
  function onSubmit() {
    navigation.navigate('VerifyOtp');
  }

  return (
    <Template
      heading="Forget Password?"
      subHeading="Rembember your password?"
      subHeadText="Login"
      onPressHead={() => {
        navigation.goBack();
      }}>
      <Formik
        initialValues={{phone: ''}}
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
              placeholder="Phone Number"
              style={{
                backgroundColor: colors.lightText,
                borderRadius: 8,
                borderTopEndRadius: 8,
                borderTopStartRadius: 8,
              }}
              textColor="black"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              placeholderTextColor={'grey'}
              underlineStyle={{width: 0}}
              mode="flat"
              left={<TextInput.Icon color={'black'} icon={'email'} />}
            />
            {errors.phone && touched.phone ? (
              <Text style={{color: 'red'}}>{errors.phone}</Text>
            ) : null}

            <Button
              mode="contained"
              buttonColor={colors.primary}
              style={{padding: 2, marginTop: 30}}
              textColor={colors.white}
              onPress={handleSubmit}>
              Send Code
            </Button>
          </View>
        )}
      </Formik>
    </Template>
  );
}
