import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';

import {Text} from 'react-native-paper';
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
              height={300}
              style={{width: '100%'}}
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
              padding: 20,
              height: screenH * 0.42,
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
            <ButtonTag buttonColor={item.bgColor}>Join the movement</ButtonTag>

            <Text
              variant="labelLarge"
              style={{
                textDecorationLine: 'underline',
                color: colors.primaryText,
              }}>
              {item.text}
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
