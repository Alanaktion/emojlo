import * as React from 'react';
import { Button, Text, useColorScheme, View } from 'react-native';
import styles from '../constants/styles';

export default function PostScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeAccent =
    colorScheme === 'light' ? styles.lightThemePrimary.color : styles.darkThemePrimary.color;

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={themeTextStyle}>Post Screen</Text>
      <Button
        title="View User"
        onPress={() => navigation.push('User', { username: '🍕' })}
        color={themeAccent}
      />
    </View>
  );
}
