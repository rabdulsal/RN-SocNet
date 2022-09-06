import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function Post({ post }) {
  const navigation = useNavigation();

  function selectedPost(postId) {
    navigation.navigate("PostDetails", {
      post: post,
    });
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

  const tags = [];

  if (post.tags) {
    for (var idx = 0; idx < post.tags.length; idx++) {
      tags.push(<Text style={styles.tag}>{post.tags[idx]}</Text>);
    }
  }

  if (post.owner) {
    const owner = post.owner;
    ownerInfo = (
      <>
        <Image style={styles.userImage} source={{ uri: owner.picture }} />
      </>
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
    <Pressable style={styles.container} onPress={selectedPost}>
      {/* FIXME: Use PostLayout */}
      <View style={styles.postCard}>
        <View style={styles.userContent}>{ownerInfo}</View>
        <View style={styles.postContent}>
          {ownerContent}
          <Image source={{ uri: post.image }} style={styles.postImage} />
          <Text>{post.text}</Text>
          <View style={styles.tagsDetails}>{tags}</View>
        </View>
      </View>
      {/* End PostLayout */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  postCard: {
    // FIXME: Erase refactor
    flex: 1,
    flexDirection: "row",
    // marginHorizontal: 20,
    marginVertical: 5,
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  userContent: {
    // FIXME: Erase refactor
    flex: 1,
  },
  postContent: {
    // FIXME: Erase refactor
    flex: 5,
    marginHorizontal: 5,
  },
  userImage: {
    // FIXME: Erase refactor
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    borderWidth: 1,
    borderColor: "#aaa",
    marginRight: 10,
  },
  userName: {
    // FIXME: Erase refactor
    fontWeight: "bold",
  },
  postImage: {
    // FIXME: Erase refactor
    borderRadius: 8,
    width: "100%",
    minHeight: 200,
    marginVertical: 5,
  },
  tagsDetails: {
    // FIXME: Erase-refactor
    flexDirection: "row",
    marginVertical: 5,
  },
  tag: {
    backgroundColor: "#0000ff",
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    padding: 5,
    marginRight: 8,
    borderRadius: 20,
  },
});
