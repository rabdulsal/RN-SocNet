import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { getPostComments } from "../utils/http";
import { User, ContentItem } from "../classes/contentItem";
import Post from "../components/Post";
import PostDetails from "../components/PostDetails";
import { Ionicons } from "@expo/vector-icons";

export default function PostDetailsScreen({ navigation, route }) {
  const post = route.params.post;

  const [comments, setComments] = useState([]);
  let op = post.owner;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${post.owner.firstName} ${post.owner.lastName}`,
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#0000ff" />
        </Pressable>
      ),
    });
  });

  useEffect(() => {
    async function fetchComments(postId) {
      const response = await getPostComments(postId);
      const data = response.data;
      const commentObjs = makeUsersAndPosts(data);
      setComments(commentObjs);
    }
    fetchComments(post.id);
  }, [comments, op]);

  function makeUsersAndPosts(data) {
    let comments = [];
    for (var i = 0; i < data.length; i++) {
      const commentObj = data[i];
      const commenter = new User(commentObj.owner);
      const comment = new ContentItem(commenter, commentObj.message);
      comments.push(comment);
    }
    return comments;
  }

  let ownerInfo = (
    <View>
      <Text>Loading Poster Info...</Text>
    </View>
  );
  let ownerContent = (
    <View>
      <Text>Loading Poster Info...</Text>
    </View>
  );

  if (post.owner) {
    const owner = post.owner;
    ownerInfo = (
      <Image style={styles.userImage} source={{ uri: owner.picture }} />
    );

    ownerContent = (
      <View>
        <Text
          style={styles.userName}
        >{`${owner.firstName} ${owner.lastName}`}</Text>
      </View>
    );
  }

  return (
    // <View>
    <PostDetails
      {...op}
      imageURL={post.image}
      content={post.text}
      postComments={comments}
      tags={[]}
    />
    // </View>
  );
}

const styles = StyleSheet.create({
  userImage: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    borderWidth: 1,
    borderColor: "#aaa",
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
  },
});
