import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { getUserPosts } from "../utils/http";
import Post from "./Post";

export default function UserPostsList({ userId }) {
  const [posts, setPosts] = useState([]);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    async function fetchPosts(userId) {
      setShowIndicator(true);
      const response = await getUserPosts(userId);
      setShowIndicator(false);
      setPosts(response.data); // FIXME: NOTE response.data must be run here?
    }
    fetchPosts(userId);
  }, []); // FIXME: Note that must include '[]' to help ensure runs once

  function renderPost(postData) {
    const post = postData.item;
    return <Post post={post} />;
  }

  if (showIndicator) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id + Math.random()}
        renderItem={renderPost}
      />
    </View>
  );
}
