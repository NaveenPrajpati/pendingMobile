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
import {useNavigation} from '@react-navigation/native';

let userSchema = object({
  registration_proof: string().required('minimum length 4'),
});

export default function Verificaton({route}) {
  const {data} = route.params;
  const [pickedFile, setPickedFile] = useState({});
  const navigation = useNavigation();

  async function pickFile() {
    const [file] = await pick({mode: 'open'});
    setPickedFile(file);
  }
  console.log('prev-verification', data);

  function onSubmit(values) {
    console.log(values);
    data.registration_proof = pickedFile.uri;
    navigation.navigate('BusinessHrs', {data});
  }

  return (
    <Formik
      initialValues={{
        registration_proof: '',
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

            {pickedFile?.name && (
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
                  style={{
                    color: colors.black,
                    textDecorationLine: 'underline',
                  }}>
                  {pickedFile.name}
                </Text>
                <VectorIcon
                  onPress={() => setPickedFile({})}
                  iconPack="AntDesign"
                  iconName="close"
                  color="black"
                  size={18}
                />
              </View>
            )}
          </View>
        </SignupTemplate>
      )}
    </Formik>
  );
}
