import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function UserCard({ user, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress.bind(this, user.id)}>
      <View style={styles.userImage}>
        <Image style={styles.userImage} source={{ uri: user.picture }} />
      </View>
      <View>
        <Text
          style={styles.userName}
        >{`${user.firstName} ${user.lastName}`}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 8,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    borderWidth: 1,
    borderColor: "#aaa",
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
  },
  names: {
    flexDirection: "row",
  },
});
