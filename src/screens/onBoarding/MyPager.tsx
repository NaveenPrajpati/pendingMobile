import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';

import {Button, Text} from 'react-native-paper';
import ButtonTag from '../../components/elements/ButtonTag';
import {colors, screenH, screenW} from '../../utils/styles';

const MyPager = ({navigation}) => {
  const data = [
    {
      key: 1,
      image: require('../../assets/images/first.png'),
      text: 'Sell your farm fresh products directly to consumers, cutting out the middleman and reducing emissions of the global supply chain.',
      heading: 'Quality',
      bgColor: colors.tertiary,
    },
    {
      key: 2,
      image: require('../../assets/images/second.png'),
      text: 'Our team of delivery drivers will make sure your orders are picked up on time and promptly delivered to your customers.',
      heading: 'Convenient',
      bgColor: colors.primary,
    },
    {
      key: 3,
      image: require('../../assets/images/third.png'),
      text: 'We love the earth and know you do too! Join us in reducing our local carbon footprint one order at a time. ',
      heading: 'Local',
      bgColor: colors.secondary,
    },
  ];

  return (
    <PagerView style={styles.viewPager} initialPage={0} useNext={false}>
      {data.map(item => (
        <View
          key={item.key.toString()}
          style={{
            flex: 1,
            backgroundColor: item.bgColor,
            justifyContent: 'space-between',
          }}>
          <View style={{width: screenW, height: screenH * 0.5}}>
            <Image
              source={item.image}
              width={screenW}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              backgroundColor: colors.white,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              rowGap: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 30,
              paddingHorizontal: 40,
              height: screenH * 0.5,
            }}>
            <Text
              variant="headlineSmall"
              style={{
                color: colors.primaryText,
                fontWeight: '700',
              }}>
              {item.heading}
            </Text>
            <Text
              variant="labelLarge"
              style={{color: colors.primaryText, textAlign: 'center'}}>
              {item.text}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 5,
                marginVertical: 20,
              }}>
              {Array.from({length: 3}).map((_, index) => (
                <View
                  key={index}
                  style={{
                    height: 6,
                    width: index + 1 == item.key ? 16 : 6,
                    borderRadius: 3,
                    backgroundColor: colors.primaryText,
                  }}></View>
              ))}
            </View>

            <Button
              onPress={() => {
                navigation.navigate('LoginNavigator');
              }}
              buttonColor={item.bgColor}
              textColor="white"
              style={{
                padding: 6,
                borderRadius: 25,
              }}>
              Join the movement
            </Button>

            <Text
              onPress={() => {
                navigation.navigate('LoginNavigator');
              }}
              variant="labelLarge"
              style={{
                textDecorationLine: 'underline',
                color: colors.primaryText,
              }}>
              Login
            </Text>
          </View>
        </View>
      ))}
    </PagerView>
  );
};

export default MyPager;

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
});
