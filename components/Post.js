import { View, Text, StyleSheet, Image } from "react-native";

export default function Post({ post }) {
  let ownerInfo = (
    <View>
      <Text>Loading Poster Info...</Text>
    </View>
  );
  let ownerContent = (
    <View>
      <Text>Loader Poster Info...</Text>
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
    <View style={styles.container}>
      <View style={styles.postCard}>
        <View style={styles.userContent}>{ownerInfo}</View>
        <View style={styles.postContent}>
          {ownerContent}
          <Image source={{ uri: post.image }} style={styles.postImage} />
          <Text>{post.text}</Text>
          <View style={styles.tagsDetails}>{tags}</View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  postCard: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  userContent: {
    flex: 1,
  },
  postContent: {
    flex: 5,
  },
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
  postImage: {
    borderRadius: 8,
    width: "100%",
    minHeight: 200,
    marginVertical: 5,
  },
  tagsDetails: {
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
