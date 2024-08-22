import {View, Text} from 'react-native';
import React from 'react';
import {SegmentedButtons} from 'react-native-paper';
import Header from '../components/Header';

export default function Home() {
  const [value, setValue] = React.useState('');
  return (
    <View style={{flex: 1}}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'walk',
            label: 'Walking',
          },
          {
            value: 'train',
            label: 'Transit',
          },
          {value: 'drive', label: 'Driving'},
        ]}
      />
      <View style={{flex: 1}}></View>
    </View>
  );
}
