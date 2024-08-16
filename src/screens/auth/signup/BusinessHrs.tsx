import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
  business_hours: string().required(),
});

export default function BusinessHrs({route}) {
  const {data} = route.params;
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = useState('wed'); // Default selected day
  const [businessHours, setBusinessHours] = useState({
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  });

  const days = [
    {label: 'M', value: 'mon'},
    {label: 'T', value: 'tue'},
    {label: 'W', value: 'wed'},
    {label: 'Th', value: 'thu'},
    {label: 'F', value: 'fri'},
    {label: 'S', value: 'sat'},
    {label: 'Su', value: 'sun'},
  ];

  const slots = [
    '8:00am - 10:00am',
    '10:00am - 1:00pm',
    '1:00pm - 4:00pm',
    '4:00pm - 7:00pm',
    '7:00pm - 10:00pm',
  ];

  const toggleSlotSelection = slot => {
    setBusinessHours(prev => {
      const currentDaySlots = prev[selectedDay];
      return {
        ...prev,
        [selectedDay]: currentDaySlots.includes(slot)
          ? currentDaySlots.filter(s => s !== slot)
          : [...currentDaySlots, slot],
      };
    });
  };

  function onSubmit(values) {
    const nd = {...data, ...values};

    nd.device_token = '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx';
    nd.type = 'email/facebook/google/apple';
    nd.social_id = '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx';

    console.log(nd);
    navigation.navigate('Done');
  }

  return (
    <Formik
      initialValues={{business_hours: {}}}
      //   validationSchema={userSchema}
      onSubmit={onSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <SignupTemplate
          heading={'Business Hours'}
          stage={4}
          onPress={handleSubmit}
          info="Choose the hours your farm is open for pickups. This will allow customers to order deliveries.">
          <View style={{rowGap: 15, marginTop: 40}}>
            <View style={styles.daysContainer}>
              {days.map((day, index) => (
                <TouchableOpacity
                  key={day.value}
                  style={[
                    styles.dayButton,
                    selectedDay === day.value && styles.selectedDayButton,
                    index < days.findIndex(it => it.value == selectedDay) && {
                      backgroundColor: colors.lightBg,
                    },
                  ]}
                  onPress={() => setSelectedDay(day.value)}>
                  <Text
                    style={[
                      styles.dayText,
                      selectedDay === day.value && styles.selectedDayText,
                    ]}>
                    {day.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <ScrollView contentContainerStyle={styles.slotsContainer}>
              {slots.map(slot => (
                <TouchableOpacity
                  key={slot}
                  style={[
                    styles.slotButton,
                    businessHours[selectedDay].includes(slot) &&
                      styles.selectedSlotButton,
                  ]}
                  onPress={() => toggleSlotSelection(slot)}>
                  <Text style={styles.slotText}>{slot}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </SignupTemplate>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#7D7D7D',
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.lightBg,
    borderWidth: 2,
  },
  selectedDayButton: {
    backgroundColor: colors.primary,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryText,
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slotButton: {
    backgroundColor: colors.lightBg,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  selectedSlotButton: {
    backgroundColor: colors.secondary,
  },
  slotText: {
    fontSize: 14,
    color: '#4F4F4F',
  },
  signupButton: {
    backgroundColor: '#F28B82',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
