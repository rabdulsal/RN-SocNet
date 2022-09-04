import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { User } from "../classes/contentItem";
import ContentLayout from "./ContentLayout";

export default function PostDetails({
  firstName,
  lastName,
  picture,
  imageURL,
  content,
  postComments,
  tags,
}) {
  const user = {
    firstName: firstName,
    lastName: lastName,
    picture: picture,
  };

  function renderPostComment(commentData) {
    const comment = commentData.item;
    const commentContent = {
      firstName: comment.user.firstName,
      lastName: comment.user.lastName,
      picture: comment.user.photoURL,
      comment: comment.content,
    };

    return (
      /*
      "id": "60d2252067d0d8992e611a79",
      "message": "Nice pic",
      "owner": {
        "id": "60d0fe4f5311236168a109df",
        "title": "mrs",
        "firstName": "Anaelle",
        "lastName": "Dumas",
        "picture": "https://randomuser.me/api/portraits/med/women/25.jpg"
      },
    */
      <View style={styles.postCard}>
        <ContentLayout {...commentContent} />
      </View>
    );
  }

  let commentInfo = <View></View>;

  if (postComments.length > 0) {
    commentInfo = (
      <View>
        <Text style={styles.commentsTitle}>COMMENTS:</Text>
        <FlatList
          data={postComments}
          keyExtractor={(item) => item.id}
          renderItem={renderPostComment}
        />
      </View>
    );
  }
  // if (user) {
  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          <View style={styles.postCard}>
            <View style={styles.userContent}>
              <Image source={{ uri: picture }} style={styles.userImage} />
            </View>
            <View style={styles.postContent}>
              <Text style={styles.userName}>{`${firstName} ${lastName}`}</Text>
              <Image source={{ uri: imageURL }} style={styles.postImage} />
              <Text>{content}</Text>
              <View style={styles.tagsDetails}>{tags}</View>
            </View>
          </View>
          {commentInfo}
        </>
      }
    />
  );
  // }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  postCard: {
    // flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  postImage: {
    borderRadius: 8,
    width: "100%",
    minHeight: 200,
    marginVertical: 5,
  },
  userContent: {
    flex: 1,
  },
  postContent: {
    flex: 5,
    marginHorizontal: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tagsDetails: {
    flexDirection: "row",
    marginVertical: 5,
  },
  userImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50 / 2,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  commentsTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#aaa",
  },
});
