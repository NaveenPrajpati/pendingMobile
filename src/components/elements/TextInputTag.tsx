import {View, Text} from 'react-native';
import React, {ReactNode} from 'react';
import {HelperText, TextInput, TextInputProps} from 'react-native-paper';
import {colors} from '../../utils/styles';

interface propType extends TextInputProps {
  mode?: 'flat' | 'outlined';
  left?: ReactNode;
  right?: ReactNode;
  errorMessage?: string;
}

export default function TextInputTag(props: propType) {
  return (
    <View>
      <TextInput
        style={{
          backgroundColor: colors.lightText,
          borderRadius: 8,
          borderTopEndRadius: 8,
          borderTopStartRadius: 8,
        }}
        textColor={colors.black}
        mode={'flat'}
        underlineStyle={{width: 0}}
        {...props}
      />
      {props.error && (
        <HelperText type="error" variant="labelMedium" visible={props.error}>
          {props.errorMessage}
        </HelperText>
      )}
    </View>
  );
}
