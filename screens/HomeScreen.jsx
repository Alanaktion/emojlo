import * as React from 'react';
import { Button, FlatList, Text, useColorScheme, View } from 'react-native';
import styles from '../constants/styles';
import { AuthContext } from '../api/providers';
import { getPosts } from '../api/rest';

export default function HomeScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeAccent =
    colorScheme === 'light' ? styles.lightThemePrimary.color : styles.darkThemePrimary.color;

  const { signOut } = React.useContext(AuthContext);

  const [refreshing, setRefreshing] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const fetchPosts = async () => {
    setRefreshing(true);
    const result = await getPosts();
    setPosts(result.data);
    setRefreshing(false);
  }
  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={[themeContainerStyle, { flex: 1 }]}>
      <FlatList
        style={{ flex: 1, alignSelf: 'stretch' }}
        data={posts}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
            <Text style={themeTextStyle}>{item.user.name}</Text>
            <Text style={themeTextStyle}>{item.body}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <>
            <Button
              title="View User"
              onPress={() => navigation.push('User', { username: '🙃' })}
              color={themeAccent}
            />
            <Button
              title="View Post"
              onPress={() => navigation.push('Post', { id: Math.floor(Math.random() * 1e6) })}
              color={themeAccent}
            />
          </>
        )}
        ListFooterComponent={() => (
          <>
            <Button
              title="Sign out"
              onPress={() => signOut()}
              color={themeAccent}
            />
          </>
        )}
        onRefresh={fetchPosts}
        refreshing={refreshing}
      />
    </View>
  );
}
