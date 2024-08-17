import {View, Text} from 'react-native';
import React from 'react';
import {Button, ButtonProps, Icon} from 'react-native-paper';
import {colors} from '../../utils/styles';

interface propType extends ButtonProps {
  isLoading?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  children?: string;
  icon?: string;
}

export default function ButtonTag({
  isLoading,
  onPress,
  disabled,
  children,
  icon,
  ...rest
}: propType) {
  return (
    <Button
      {...rest}
      loading={isLoading}
      icon={icon}
      mode="contained"
      buttonColor={colors.primary}
      textColor={colors.white}
      onPress={onPress}>
      {children}
    </Button>
  );
}
