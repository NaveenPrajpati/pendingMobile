import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {object, ref, string} from 'yup';
import VectorIcon from '../../../components/VectorIcon';
import TextInputTag from '../../../components/elements/TextInputTag';
import {colors} from '../../../utils/styles';
import SignupTemplate from './SignupTemplate';
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

  GoogleSignin.configure({
    webClientId: `381680410065-v2jmvm7u7vc6tj0151lcnt6kumdcb6cm.apps.googleusercontent.com`,
    // androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    // iosClientId: GOOGLE_IOS_CLIENT_ID,
    offlineAccess: true,
    scopes: ['profile', 'email'],
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log(userInfo);
      const {idToken, user} = userInfo;

      const data = {
        full_name: user.name,
        email: user.email,
        type: 'google',
        social_id: user.id,
      };

      if (idToken) {
        navigation.navigate('FarmInfo', {data});
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
            // Android and Apple only. No saved credential found, try calling `createAccount`
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            // sign in was cancelled
            break;
          case statusCodes.ONE_TAP_START_FAILED:
            // Android-only, you probably have hit rate limiting.
            // On Android, you can still call `presentExplicitSignIn` in this case.
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android-only: play services not available or outdated
            // Web: when calling an unimplemented api (requestAuthorization)
            break;
          default:
          // something else happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const handleCustomLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled Conclusion');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data);

            Profile.getCurrentProfile().then(user => {
              const data = {
                full_name: user?.name,
                email: user?.email,
                type: 'facebook',
                social_id: user?.userID,
              };

              navigation.navigate('FarmInfo', {data});
            });
            // getUserInfo(data.accessToken.toString());
          });
        }
      },
      error => {
        console.error(error);
      },
    );
  };

  function handleSocialPress(e: string): void {
    if (e == 'google') {
      signIn();
    } else if (e == 'facebook') {
      handleCustomLogin();
    }
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
          onPress={handleSubmit}
          onSocialPress={handleSocialPress}>
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
                    <TextInput.Icon
                      color={'black'}
                      icon={() => (
                        <VectorIcon
                          iconName="email"
                          iconPack="Entypo"
                          size={20}
                          color="black"
                        />
                      )}
                    />
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
