import * as React from 'react';
import { Button, Text, useColorScheme, View } from 'react-native';
import styles from '../constants/styles';

export default function UserScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeAccent =
    colorScheme === 'light' ? styles.lightThemePrimary.color : styles.darkThemePrimary.color;

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={themeTextStyle}>User Screen</Text>
      <Button
        title="View Post"
        onPress={() => navigation.push('Post', { id: Math.floor(Math.random() * 1e6) })}
        color={themeAccent}
      />
    </View>
  );
}
