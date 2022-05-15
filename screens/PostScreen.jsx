import * as React from 'react';
import { ActivityIndicator, useColorScheme, View } from 'react-native';
import styles from '../constants/styles';
import { getPost } from '../api/rest';
import { useRoute } from '@react-navigation/native';
import PostCard from '../components/PostCard';

export default function PostScreen({ navigation }) {
  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  const [post, setPost] = React.useState(null);
  const route = useRoute();
  const fetchPost = async () => {
    setPost(await getPost(route.params.id));
  }
  React.useEffect(() => {
    fetchPost();
  }, []);

  let child;
  if (!post) {
    child = <ActivityIndicator style={{ margin: 20 }} />;
  } else {
    child = <PostCard
      item={post}
      themeTextStyle={themeTextStyle}
      onUserPress={() => navigation.push('User', { username: post.user.name })}
    />;
  }

  return (
    <View style={[styles.container, themeContainerStyle]}>
      {child}
    </View>
  );
}
