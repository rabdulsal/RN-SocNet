import { View, Text, StyleSheet, Image } from "react-native";

export default function ContentLayout(comment) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={{ uri: comment.picture }} style={styles.userImage} />
      </View>
      <View style={styles.commentInfo}>
        <Text style={styles.userName}>
          {`${comment.firstName} ${comment.lastName}`}
        </Text>
        <Text>{comment.comment}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // marginHorizontal: 20,
  },
  userInfo: {
    flex: 1,
    marginRight: 10,
  },
  commentInfo: {
    flex: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 1,
    borderColor: "#aaa",
  },
});
