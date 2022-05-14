import * as React from 'react';
import { Button, KeyboardAvoidingView, Platform, Text, TextInput, useColorScheme, View } from 'react-native';
import styles from '../constants/styles';
import { AuthContext } from '../api/providers';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const inputStyle =
    colorScheme === 'light' ? styles.lightThemeTextInput : styles.darkThemeTextInput;
  const themeAccent =
    colorScheme === 'light' ? styles.lightThemePrimary.color : styles.darkThemePrimary.color;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, themeContainerStyle, { justifyContent: 'center' }]}>
      <Text style={[themeTextStyle, { fontSize: 24, marginBottom: 16 }]}>
        Emojlo
      </Text>
      <TextInput
        style={[styles.textInput, inputStyle]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        keyboardType="email-address"
        autoFocus={true}
      />
      <TextInput
        style={[styles.textInput, inputStyle]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoComplete="password"
        secureTextEntry
      />
      <Button
        title="Sign in"
        onPress={() => signIn({ email, password })}
        color={themeAccent}
      />
      <Button
        title="Need an account?"
        onPress={() => navigation.push('SignUp')}
        color={themeAccent}
      />
    </KeyboardAvoidingView>
  );
}
