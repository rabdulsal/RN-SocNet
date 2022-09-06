import { useEffect, useState } from "react";
import { View, Button, StyleSheet, FlatList } from "react-native";
import UserCard from "./UserCard";
import * as Networking from "../utils/http";
import { useNavigation } from "@react-navigation/native";

export default function UsersList({ users }) {
  /*
    "id": "60d0fe4f5311236168a109cb",
    "title": "miss",
    "firstName": "Edita",
    "lastName": "Vestering",
    "picture": "https://randomuser.me/api/portraits/med/women/89.jpg"


*/

  const navigation = useNavigation();

  function onPress(userId) {
    navigation.navigate("UserProfile", {
      userId: userId,
    });
  }

  function renderUser(userData) {
    const user = userData.item;
    // NOTE: 'onPress' passes userId from within the UserCard, where the data is binded
    return <UserCard user={user} onPress={onPress} />;
  }

  function getMoreUsers() {
    console.log("Press GET MORE!!");
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
      />
      <Button
        onPress={getMoreUsers}
        style={styles.getMoreButton}
        title="More Users"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  getMoreButton: {
    backgroundColor: "#0000ff",
    padding: 5,
    borderRadius: 6,
    color: "#fff",
    fontWeight: "bold",
  },
});
