import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {object, string} from 'yup';
import {colors} from '../../../utils/styles';
import Template from './Template';
import OTPTextInput from 'react-native-otp-textinput';
import ButtonTag from '../../../components/elements/ButtonTag';
import axios from 'axios';
import {VerifyOtpApi} from '../../../services/endPoints';
import Toast from 'react-native-toast-message';

let userSchema = object({
  otp: string().required().min(5, 'minimum length 5you'),
});

export default function VerifyOtp() {
  let otpInput = useRef(null);
  const [loading, setLoading] = useState(false);

  const setText = () => {
    otpInput.current.setValue('1234');
  };
  const navigation = useNavigation();
  function onSubmit(values) {
    setLoading(true);
    // navigation.navigate('ResetPass');
    axios
      .post(VerifyOtpApi, values, {
        headers: {
          Accept: 'accplication/json',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
        if (res.data.success) {
          Toast.show({type: 'success', text1: res.data.message});
          const token = res.data.token;
          setLoading(false);
          navigation.navigate('ResetPass', {token});
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
      heading="Verify OTP"
      subHeading="Rembember your password?"
      subHeadText="Login"
      onPressHead={() => {
        navigation.goBack();
      }}>
      <Formik
        initialValues={{otp: ''}}
        validationSchema={userSchema}
        onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View style={{marginTop: 50}}>
            <OTPTextInput
              containerStyle={{}}
              textInputStyle={{
                backgroundColor: colors.lightBg,
                height: 58,
                width: 58,
                borderRadius: 8,
              }}
              tintColor={colors.lightBg}
              offTintColor={colors.lightBg}
              inputCount={5}
              handleTextChange={e => {
                console.log(e);
                setFieldValue('otp', e);
              }}
              ref={e => (otpInput = e)}
            />
            {errors.otp && touched.otp ? (
              <Text style={{color: 'red'}}>{errors.otp}</Text>
            ) : null}

            <ButtonTag
              loading={loading}
              style={{padding: 6, marginTop: 30, borderRadius: 25}}
              textColor={colors.white}
              onPress={handleSubmit}>
              Submit
            </ButtonTag>
          </View>
        )}
      </Formik>
      <View>
        <Text
          variant="labelLarge"
          style={{
            textDecorationLine: 'underline',
            color: 'black',
            textAlign: 'center',
            marginTop: 20,
          }}>
          Resend Code
        </Text>
      </View>
    </Template>
  );
}
