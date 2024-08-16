import {Pressable, View} from 'react-native';
import React, {useState} from 'react';
import TextInputTag from '../../../components/elements/TextInputTag';
import {colors} from '../../../utils/styles';
import {Avatar, List, Text, TextInput} from 'react-native-paper';
import SocialButtons from '../../../components/SocialButtons';
import ButtonTag from '../../../components/elements/ButtonTag';
import SignupTemplate from './SignupTemplate';
import VectorIcon from '../../../components/VectorIcon';
import {Formik} from 'formik';
import {object, string} from 'yup';
import {pick} from 'react-native-document-picker';

let userSchema = object({
  fullName: string().required().min(3, 'minimum length 4'),
  //   email: string().email().required(),
});

export default function Verificaton() {
  const [pickedFile, setPickedFile] = useState({name: 'safdsadfsda'});

  async function pickFile(params: type) {
    const [file] = await pick({mode: 'open'});
    console.log(file);
  }

  function onSubmit(values) {
    console.log(values);
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
        <SignupTemplate
          heading={'Verification'}
          stage={3}
          onPress={handleSubmit}
          info="Attached proof of Department of Agriculture registrations i.e. Florida Fresh, USDA Approved, USDA Organic">
          <View style={{rowGap: 15, marginTop: 40}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: colors.black}}>
                Attach proof of registration
              </Text>
              <Pressable onPress={pickFile}>
                <Avatar.Icon
                  icon={'camera'}
                  size={40}
                  color="white"
                  style={{backgroundColor: colors.primary}}
                />
              </Pressable>
            </View>

            <View
              style={{
                backgroundColor: colors.lightText,
                flexDirection: 'row',
                padding: 10,
                borderRadius: 8,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{color: colors.black, textDecorationLine: 'underline'}}>
                {pickedFile.name}
              </Text>
              <VectorIcon iconName="close" color="black" />
            </View>
          </View>
        </SignupTemplate>
      )}
    </Formik>
  );
}
