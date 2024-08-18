import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Avatar, Button, Text, TextInput} from 'react-native-paper';
import {object, ref, string} from 'yup';
import {colors} from '../../../utils/styles';
import Template from './Template';
import SocialButtons from '../../../components/SocialButtons';
import {ResetPassApi} from '../../../services/endPoints';
import Toast from 'react-native-toast-message';

let userSchema = object({
  password: string().required().min(3, 'minimum length 4'),
  cpassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function ResetPass({route}) {
  const [loading, setLoading] = useState(false);
  const token = route.params;
  const navigation = useNavigation();
  function onSubmit(values) {
    setLoading(true);
    values.token = token;
    axios
      .post(ResetPassApi, values, {
        headers: {
          Accept: 'accplication/json',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
        if (res.data.success) {
          setLoading(false);
          Toast.show({type: 'success', text1: res.data.message});
          navigation.navigate('SignupNavigator', {screen: 'Done'});
        } else {
          setLoading(false);

          Toast.show({type: 'error', text1: res.data.message});
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);

        Toast.show({type: 'error', text1: err});
      });
  }

  return (
    <Template
      heading="Reset Password"
      subHeading="Remember your password?"
      subHeadText="Login"
      onPressHead={() => {
        navigation.navigate('Login');
      }}>
      <Formik
        initialValues={{cpassword: '', password: ''}}
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
              placeholder="Password"
              style={{
                backgroundColor: colors.lightBg,
                borderRadius: 8,
                borderTopEndRadius: 8,
                borderTopStartRadius: 8,
              }}
              textColor="black"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholderTextColor={'grey'}
              underlineStyle={{width: 0}}
              mode="flat"
              left={<TextInput.Icon color={'black'} icon={'lock-outline'} />}
            />
            {errors.password && touched.password ? (
              <Text style={{color: 'red'}}>{errors.password}</Text>
            ) : null}
            <TextInput
              placeholder="Confirm New Password"
              style={{
                backgroundColor: colors.lightBg,
                borderRadius: 8,
                borderTopEndRadius: 8,
                borderTopStartRadius: 8,
                marginTop: 20,
              }}
              textColor="black"
              onChangeText={handleChange('cpassword')}
              onBlur={handleBlur('cpassword')}
              value={values.password}
              underlineStyle={{width: 0}}
              placeholderTextColor={'grey'}
              mode="flat"
              secureTextEntry
              left={<TextInput.Icon color={'black'} icon={'lock-outline'} />}
            />
            {errors.cpassword && touched.cpassword ? (
              <Text style={{color: 'red'}}>{errors.cpassword}</Text>
            ) : null}

            <Button
              mode="contained"
              loading={loading}
              disabled={loading}
              buttonColor={colors.primary}
              style={{padding: 6, marginTop: 30, borderRadius: 25}}
              textColor={colors.white}
              onPress={handleSubmit}>
              Submit
            </Button>
          </View>
        )}
      </Formik>
    </Template>
  );
}
