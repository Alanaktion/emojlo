import * as React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function PostCard({ item, themeTextStyle, onUserPress, onPostPress }) {
  const dateTime = new Date(item.created_at).toLocaleString();
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row' }}>
      <TouchableOpacity onPress={onUserPress}>
        <Image source={{ uri: item.user.gravatar }} style={{ width: 32, height: 32, borderRadius: 16 }} />
      </TouchableOpacity>
      <View style={{ marginLeft: 10, flexGrow: 1 }}>
        <View style={{ marginBottom: 5, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[themeTextStyle, { marginRight: 5 }]}>{item.user.name}</Text>
          <TouchableOpacity onPress={onPostPress}>
            <Text style={[themeTextStyle, { fontSize: 12, opacity: 0.8 }]}>{dateTime}</Text>
          </TouchableOpacity>
        </View>
        <Text style={themeTextStyle}>{item.body}</Text>
      </View>
    </View>
  );
}
