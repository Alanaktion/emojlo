import * as React from 'react';
import { FlatList, useColorScheme, View } from 'react-native';
import styles from '../constants/styles';
import { getUserPosts } from '../api/rest';
import { useRoute } from '@react-navigation/native';
import PostCard from '../components/PostCard';

export default function UserScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  const [refreshing, setRefreshing] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const route = useRoute();
  const fetchPosts = async () => {
    setRefreshing(true);
    const result = await getUserPosts(route.params.username);
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
          onPostPress={() => navigation.push('Post', { id: item.id })}
        />}
        keyExtractor={item => item.id}
        onRefresh={fetchPosts}
        refreshing={refreshing}
      />
    </View>
  );
}
