import {View} from 'react-native';
import React, {useState} from 'react';
import TextInputTag from '../../../components/elements/TextInputTag';
import {colors} from '../../../utils/styles';
import {List, Text, TextInput} from 'react-native-paper';
import SocialButtons from '../../../components/SocialButtons';
import ButtonTag from '../../../components/elements/ButtonTag';
import SignupTemplate from './SignupTemplate';
import VectorIcon from '../../../components/VectorIcon';
import {Formik} from 'formik';
import {number, object, string} from 'yup';
import {useNavigation} from '@react-navigation/native';

let userSchema = object({
  business_name: string().required().min(3, 'minimum length 4'),
  informal_name: string().required('email required'),
  address: string().required('phone required'),
  city: string().required('password required'),
  state: string().required('password required'),
  zip_code: number().required('password required'),
});

export default function FarmInfo({route}) {
  const {data} = route.params;
  // const [state, setState] = useState('');
  const navigation = useNavigation();
  function onSubmit(values) {
    const newData = {...data, ...values};
    navigation.navigate('Verificaton', {data: newData});
  }

  const states = ['Delhi', 'Bihar', 'Gujrat'];

  return (
    <Formik
      initialValues={{
        business_name: '',
        informal_name: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
      }}
      validationSchema={userSchema}
      onSubmit={onSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <SignupTemplate heading={'Farm Info'} stage={2} onPress={handleSubmit}>
          <View style={{rowGap: 15, marginTop: 40}}>
            <TextInputTag
              placeholder="Business Name"
              onChangeText={handleChange('business_name')}
              onBlur={handleBlur('business_name')}
              value={values.business_name}
              left={
                <TextInput.Icon color={colors.primaryText} icon="tag-outline" />
              }
              error={
                errors.business_name && touched.business_name ? true : false
              }
              errorMessage={errors.business_name}
            />
            <TextInputTag
              placeholder="Informal Name"
              onChangeText={handleChange('informal_name')}
              onBlur={handleBlur('informal_name')}
              value={values.informal_name}
              left={
                <TextInput.Icon
                  color={'black'}
                  icon={() => (
                    <VectorIcon iconName="smile-o" size={20} color="black" />
                  )}
                />
              }
              error={
                errors.informal_name && touched.informal_name ? true : false
              }
              errorMessage={errors.informal_name}
            />

            <TextInputTag
              placeholder="Street Address"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              left={
                <TextInput.Icon
                  color={colors.primaryText}
                  icon="home-outline"
                />
              }
              error={errors.address && touched.address ? true : false}
              errorMessage={errors.address}
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
              <View
                style={{
                  borderRadius: 8,
                  backgroundColor: colors.lightBg,
                  padding: 2,
                }}>
                <List.Accordion
                  title={values.state ? values.state : 'State'}
                  titleStyle={{color: colors.lightText}}
                  right={() => (
                    <View
                      style={{
                        height: 20,
                        width: 20,
                      }}>
                      <VectorIcon
                        iconName="caretdown"
                        iconPack="AntDesign"
                        color="black"
                        size={15}
                      />
                    </View>
                  )}
                  style={{
                    backgroundColor: colors.lightBg,
                    width: 140,
                    height: 46,
                  }}>
                  {states.map((item, index) => (
                    <List.Item
                      key={index}
                      style={{}}
                      onPress={e => {
                        setFieldValue('state', item);
                      }}
                      titleStyle={{color: colors.black}}
                      title={item}
                    />
                  ))}
                </List.Accordion>
              </View>

              <TextInputTag
                keyboardType="number-pad"
                placeholder="Enter Zipcode"
                onChangeText={handleChange('zip_code')}
                onBlur={handleBlur('zip_code')}
                value={values.zip_code}
              />
            </View>
          </View>
        </SignupTemplate>
      )}
    </Formik>
  );
}
