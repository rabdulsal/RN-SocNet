import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { deleteUser } from "../utils/http";

export default function UserCard({ user, onPress, didDeleteCallBack }) {
  const firstName = user.firstName;
  const lastName = user.lastName;
  const id = user.id;
  const [isDeleting, setIsDeleting] = useState(false);

  async function onPressedDelete(id) {
    setIsDeleting(true);
    const response = await deleteUser(id);
    setIsDeleting(false);
    didDeleteCallBack(response.id);
  }

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    let deleteView = (
      <TouchableOpacity onPress={onPressedDelete.bind(this, id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );

    if (isDeleting) {
      deleteView = <ActivityIndicator size="large" color="#fff" />;
    }

    return (
      <View style={styles.swipedRow}>
        <View style={styles.swipedConfirmationContainer}>
          <Text style={styles.deleteConfirmationText}>Are you sure?</Text>
        </View>
        <Animated.View style={[styles.deleteButton, { opacity }]}>
          {deleteView}
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
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
    </Swipeable>
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
  swipedRow: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingLeft: 5,
    backgroundColor: "#818181",
    margin: 20,
    minHeight: 50,
  },
  swipedConfirmationContainer: {
    flex: 1,
  },
  deleteConfirmationText: {
    color: "#fcfcfc",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#b60000",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  deleteButtonText: {
    color: "#fcfcfc",
    fontWeight: "bold",
    padding: 3,
  },
});
