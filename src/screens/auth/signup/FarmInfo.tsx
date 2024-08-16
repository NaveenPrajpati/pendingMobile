import {View} from 'react-native';
import React from 'react';
import TextInputTag from '../../../components/elements/TextInputTag';
import {colors} from '../../../utils/styles';
import {List, Text, TextInput} from 'react-native-paper';
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

export default function FarmInfo() {
  const navigation = useNavigation();
  function onSubmit(values) {
    console.log(values);
    navigation.navigate('Verificaton');
  }

  return (
    <Formik
      initialValues={{
        businessName: '',
        informalName: '',
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
      }}
      //   validationSchema={userSchema}
      onSubmit={onSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <SignupTemplate heading={'Farm Info'} stage={2} onPress={handleSubmit}>
          <View style={{rowGap: 15, marginTop: 40}}>
            <TextInputTag
              placeholder="Business Name"
              onChangeText={handleChange('businessName')}
              onBlur={handleBlur('businessName')}
              value={values.businessName}
              left={
                <TextInput.Icon color={colors.primaryText} icon="tag-outline" />
              }
              error={errors.businessName && touched.businessName ? true : false}
              errorMessage={errors.businessName}
            />
            <TextInputTag
              placeholder="Informal Name"
              onChangeText={handleChange('informalName')}
              onBlur={handleBlur('informalName')}
              value={values.informalName}
              left={<TextInput.Icon color={colors.primaryText} icon="mail" />}
              error={errors.informalName && touched.informalName ? true : false}
              errorMessage={errors.informalName}
            />

            <TextInputTag
              placeholder="Street Address"
              onChangeText={handleChange('streetAddress')}
              onBlur={handleBlur('streetAddress')}
              value={values.streetAddress}
              left={
                <TextInput.Icon
                  color={colors.primaryText}
                  icon="home-outline"
                />
              }
              error={
                errors.streetAddress && touched.streetAddress ? true : false
              }
              errorMessage={errors.streetAddress}
            />
            <TextInputTag
              placeholder="City"
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              value={values.city}
              left={<TextInput.Icon color={colors.primaryText} icon="pin" />}
              error={errors.city && touched.city ? true : false}
              errorMessage={errors.city}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <List.Section style={{borderRadius: 8}}>
                <List.Accordion
                  title="State"
                  titleStyle={{color: colors.gray}}
                  style={{
                    backgroundColor: colors.lightText,
                    width: 150,
                  }}>
                  <List.Item
                    style={{}}
                    onPress={e => {}}
                    titleStyle={{color: colors.black}}
                    title="First item"
                  />
                  <List.Item
                    style={{}}
                    titleStyle={{color: colors.black}}
                    title="Second item"
                  />
                </List.Accordion>
              </List.Section>

              <TextInputTag
                keyboardType="number-pad"
                placeholder="Enter Zipcode"
                onChangeText={handleChange('zipcode')}
                onBlur={handleBlur('zipcode')}
                value={values.zipcode}
              />
            </View>
          </View>
        </SignupTemplate>
      )}
    </Formik>
  );
}
