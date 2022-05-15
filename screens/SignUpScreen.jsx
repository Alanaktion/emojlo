import * as React from 'react';
import { Button, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import styles from '../constants/styles';
import { AuthContext } from '../api/providers';

export default function SignInScreen({ navigation }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signUp } = React.useContext(AuthContext);

  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const inputStyle =
    colorScheme === 'light' ? styles.lightThemeTextInput : styles.darkThemeTextInput;
  const themePrimary =
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
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
      />
      <TextInput
        style={[styles.textInput, inputStyle]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        keyboardType="email-address"
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
        title="Create account"
        onPress={() => signUp({ name, email, password })}
        color={themePrimary}
      />
      <View style={{ height: 5 }} />
      <TouchableOpacity
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={themeTextStyle}>Sign in instead</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
