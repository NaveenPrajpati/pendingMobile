import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import React from 'react';
import TextInputTag from '../../../components/elements/TextInputTag';
import {colors} from '../../../utils/styles';
import {Text, TextInput} from 'react-native-paper';
import SocialButtons from '../../../components/SocialButtons';
import ButtonTag from '../../../components/elements/ButtonTag';
import SignupTemplate from './SignupTemplate';
import VectorIcon from '../../../components/VectorIcon';
import {Formik} from 'formik';
import {object, ref, string} from 'yup';
import {useNavigation} from '@react-navigation/native';

let userSchema = object({
  full_name: string().required().min(3, 'minimum length 4'),
  email: string().email().required('email required'),
  phone: string().required('phone required'),
  password: string().required('password required'),
  confPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function Signup() {
  const navigation = useNavigation();
  function onSubmit(values) {
    delete values.confPassword;
    // console.log(values);

    navigation.navigate('FarmInfo', {data: values});
  }

  return (
    <Formik
      initialValues={{
        full_name: '',
        email: '',
        phone: '',
        password: '',
        confPassword: '',
      }}
      validationSchema={userSchema}
      onSubmit={onSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <SignupTemplate
          heading={'Welcome!'}
          stage={1}
          info="or signup with"
          onPress={handleSubmit}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={{rowGap: 15, marginTop: 20, flex: 1}}>
                <TextInputTag
                  placeholder="Full Name"
                  onChangeText={handleChange('full_name')}
                  onBlur={handleBlur('full_name')}
                  value={values.full_name}
                  left={
                    <TextInput.Icon
                      color={colors.black}
                      icon="account-outline"
                    />
                  }
                  error={errors.full_name && touched.full_name ? true : false}
                  errorMessage={errors.full_name}
                />
                <TextInputTag
                  placeholder="Email Address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  left={
                    <TextInput.Icon color={colors.primaryText} icon="mail" />
                  }
                  error={errors.email && touched.email ? true : false}
                  errorMessage={errors.email}
                />

                <TextInputTag
                  placeholder="Phone Number"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  left={
                    <TextInput.Icon
                      color={colors.primaryText}
                      icon="phone-outline"
                    />
                  }
                  error={errors.phone && touched.phone ? true : false}
                  errorMessage={errors.phone}
                />
                <TextInputTag
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  left={
                    <TextInput.Icon
                      color={colors.primaryText}
                      icon="lock-outline"
                    />
                  }
                  error={errors.password && touched.password ? true : false}
                  errorMessage={errors.password}
                />
                <TextInputTag
                  placeholder="Re-enter Password"
                  onChangeText={handleChange('confPassword')}
                  onBlur={handleBlur('confPassword')}
                  value={values.confPassword}
                  left={
                    <TextInput.Icon color={colors.black} icon="lock-outline" />
                  }
                  error={
                    errors.confPassword && touched.confPassword ? true : false
                  }
                  errorMessage={errors.confPassword}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SignupTemplate>
      )}
    </Formik>
  );
}
