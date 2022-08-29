import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
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
    return <UserCard user={user} onPress={onPress} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
});
