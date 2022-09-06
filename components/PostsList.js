import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Post from "./Post";

export default function PostsList({ posts }) {
  function renderPosts(postData) {
    const post = postData.item;

    return <Post post={post} />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id + Math.random()}
        renderItem={renderPosts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
