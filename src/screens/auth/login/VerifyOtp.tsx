import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useRef} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {object, string} from 'yup';
import {colors} from '../../../utils/styles';
import Template from './Template';
import OTPTextInput from 'react-native-otp-textinput';

let userSchema = object({
  phone: string().required().min(1, 'minimum length 4'),
});

export default function VerifyOtp() {
  let otpInput = useRef(null);
  const setText = () => {
    otpInput.current.setValue('1234');
  };
  const navigation = useNavigation();
  function onSubmit() {
    navigation.navigate('VerifyOtp');
  }

  return (
    <Template
      heading="Verify OTP"
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
            {/* <OTPTextInput ref={e => (otpInput = e)} > */}
            {errors.phone && touched.phone ? (
              <Text style={{color: 'red'}}>{errors.phone}</Text>
            ) : null}

            <Button
              mode="contained"
              buttonColor={colors.primary}
              style={{padding: 2, marginTop: 30}}
              textColor={colors.white}
              onPress={handleSubmit}>
              submit
            </Button>
          </View>
        )}
      </Formik>
      <View>
        <Text
          variant="labelLarge"
          style={{textDecorationLine: 'underline', color: 'black'}}>
          Resend Code
        </Text>
      </View>
    </Template>
  );
}
