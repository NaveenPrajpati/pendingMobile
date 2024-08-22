import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import {
  Avatar,
  Button,
  Icon,
  MD3Colors,
  Text,
  TextInput,
} from 'react-native-paper';
import {object, string} from 'yup';
import {colors} from '../../../utils/styles';
import Template from './Template';
import SocialButtons from '../../../components/SocialButtons';
import {LoginApi} from '../../../services/endPoints';
import Toast from 'react-native-toast-message';
import {getDeviceId, getDeviceToken} from 'react-native-device-info';
import TextInputTag from '../../../components/elements/TextInputTag';
import VectorIcon from '../../../components/VectorIcon';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';

let userSchema = object({
  password: string().required().min(3, 'minimum length 4'),
  email: string().email().required(),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    if (Platform.OS == 'ios') {
      getDeviceToken()
        .then(res => {
          setDeviceId(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setDeviceId(getDeviceId());
    }
  }, []);

  function loginOperation(values) {
    console.log('payload-', values);
    axios
      .post(LoginApi, values, {
        headers: {
          Accept: 'accplication/json',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
        if (res.data.success) {
          Toast.show({type: 'success', text1: res.data.message});
          setLoading(false);
          navigation.navigate('SignupNavigator', {screen: 'Done'});
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

  function onSubmit(values) {
    setLoading(true);
    values.role = 'farmer';
    values.device_token = deviceId;
    values.type = 'email';
    values.social_id = '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx';
    loginOperation(values);
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      const {idToken, user} = userInfo;

      const data = {
        full_name: user.name,
        email: user.email,
        type: 'google',
        social_id: user.id,
        role: 'farmer',
        device_token: deviceId,
      };

      if (idToken) {
        loginOperation(data);
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
          Toast.show({type: 'error', text1: 'Login cancelled'});
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            Profile.getCurrentProfile().then(user => {
              console.log(user);
              const data = {
                full_name: user?.name,
                email: user?.email,
                type: 'facebook',
                social_id: user?.userID,
                role: 'farmer',
                device_token: deviceId,
              };

              loginOperation(data);
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
    <Template
      heading="Welcome back!"
      subHeading="New here?"
      subHeadText="Create account"
      onPressHead={() => {
        navigation.navigate('SignupNavigator', {screen: 'Signup'});
      }}>
      <Formik
        initialValues={{email: '', password: ''}}
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
          <View style={{marginTop: 50, rowGap: 20}}>
            <TextInputTag
              placeholder="Email Address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              mode="flat"
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
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              left={<TextInput.Icon color={'black'} icon={'lock-outline'} />}
              right={
                <TextInput.Affix
                  text="Forgot?"
                  onPress={() => {
                    navigation.navigate('ForgetPass');
                  }}
                  textStyle={{color: colors.primary}}
                />
              }
              error={errors.password && touched.password ? true : false}
              errorMessage={errors.password}
            />

            <Button
              mode="contained"
              loading={loading}
              buttonColor={colors.primary}
              style={{padding: 2, marginTop: 30}}
              textColor={colors.white}
              onPress={handleSubmit}>
              Login
            </Button>
          </View>
        )}
      </Formik>
      <View style={{rowGap: 40, marginTop: 20}}>
        <Text
          variant="labelLarge"
          style={{color: colors.lightText, textAlign: 'center'}}>
          or login with
        </Text>
        <SocialButtons onPress={handleSocialPress} />
      </View>
    </Template>
  );
}
