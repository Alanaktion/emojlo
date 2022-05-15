import * as React from 'react';
import { Button, FlatList, useColorScheme, View } from 'react-native';
import styles from '../constants/styles';
import { AuthContext } from '../api/providers';
import { getPosts } from '../api/rest';
import PostCard from '../components/PostCard';

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
        renderItem={({ item }) => <PostCard
          item={item}
          themeTextStyle={themeTextStyle}
          onUserPress={() => navigation.push('User', { username: item.user.name })}
          onPostPress={() => navigation.push('Post', { id: item.id })}
        />}
        keyExtractor={item => item.id}
        ListFooterComponent={() => (
          <>
            <View style={{ height: 0.5, backgroundColor: '#7774' }} />
            <View style={{ margin: 10 }}>
              <Button
                title="Sign out"
                onPress={() => signOut()}
                color={themeAccent}
              />
            </View>
          </>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: '#7774' }} />}
        onRefresh={fetchPosts}
        refreshing={refreshing}
      />
    </View>
  );
}
