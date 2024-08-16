import {View} from 'react-native';
import React from 'react';
import TextInputTag from '../../../components/elements/TextInputTag';
import {colors} from '../../../utils/styles';
import {Text, TextInput} from 'react-native-paper';
import SocialButtons from '../../../components/SocialButtons';
import ButtonTag from '../../../components/elements/ButtonTag';
import SignupTemplate from './SignupTemplate';
import VectorIcon from '../../../components/VectorIcon';
import {Formik} from 'formik';
import {object, string} from 'yup';
import {useNavigation} from '@react-navigation/native';

let userSchema = object({
  fullName: string().required().min(3, 'minimum length 4'),
  //   email: string().email().required(),
});

export default function Signup() {
  const navigation = useNavigation();
  function onSubmit(values) {
    console.log(values);
    navigation.navigate('FarmInfo');
  }

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confPassword: '',
      }}
      //   validationSchema={userSchema}
      onSubmit={onSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <SignupTemplate
          heading={'Welcome!'}
          stage={1}
          info="or signup with"
          onPress={handleSubmit}>
          <View style={{rowGap: 15, marginTop: 20}}>
            <TextInputTag
              placeholder="Full Name"
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values.fullName}
              left={
                <TextInput.Icon
                  color={colors.primaryText}
                  icon="account-outline"
                />
              }
              error={errors.fullName && touched.fullName ? true : false}
              errorMessage={errors.fullName}
            />
            <TextInputTag
              placeholder="Email Address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              left={<TextInput.Icon color={colors.primaryText} icon="mail" />}
              error={errors.email && touched.email ? true : false}
              errorMessage={errors.email}
            />

            <TextInputTag
              placeholder="Phone Number"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              left={<TextInput.Icon color={colors.primaryText} icon="phone" />}
              error={errors.phone && touched.phone ? true : false}
              errorMessage={errors.phone}
            />
            <TextInputTag
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              left={<TextInput.Icon color={colors.primaryText} icon="lock" />}
              error={errors.password && touched.password ? true : false}
              errorMessage={errors.password}
            />
            <TextInputTag
              placeholder="Re-enter Password"
              onChangeText={handleChange('confPassword')}
              onBlur={handleBlur('confPassword')}
              value={values.confPassword}
              left={<TextInput.Icon color={colors.primaryText} icon="lock" />}
            />
          </View>
        </SignupTemplate>
      )}
    </Formik>
  );
}
