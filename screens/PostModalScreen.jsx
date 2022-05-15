import * as React from 'react';
import { Button, TextInput, useColorScheme, View } from 'react-native';
import { storePost } from '../api/rest';
import styles from '../constants/styles';

export default function PostModalScreen({ navigation }) {
  const [body, setBody] = React.useState('');

  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const inputStyle =
    colorScheme === 'light' ? styles.lightThemeTextInput : styles.darkThemeTextInput;
  const themePrimary =
    colorScheme === 'light' ? styles.lightThemePrimary.color : styles.darkThemePrimary.color;

  const submit = async () => {
    try {
      // body is always null here because React is trash.
      const post = await storePost(body);
      if (post.id) {
        navigation.pop();
      } else if (post.message) {
        alert(post.message);
      } else {
        alert('Error submitting post');
      }
    } catch {
      alert('Error submitting post');
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.pop()} color={themePrimary} title="Cancel" />
      ),
      headerRight: () => (
        <Button onPress={submit} color={themePrimary} title="Post" />
      ),
    });
  }, [navigation]);

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <TextInput
        style={[styles.textInput, inputStyle, { marginVertical: 15, flex: 1, maxHeight: 200 }]}
        placeholder="What's up?"
        value={body}
        onChangeText={setBody}
        autoCorrect={false}
        autoFocus={true}
        multiline={true}
        textAlignVertical="top"
        placeholderTextColor='#6b7280'
      />
    </View>
  );
}
