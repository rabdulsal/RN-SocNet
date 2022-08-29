import { View, Text, StyleSheet } from "react-native";
import UsersList from "../components/UsersList";
import * as Networking from "../utils/http";
import { useState, useEffect } from "react";

export default function UsersScreen({ navigation }) {
  const [users, setUsers] = useState();

  useEffect(() => {
    async function fetchUsers() {
      const usersResp = await Networking.getUsers();
      setUsers(usersResp.data);
    }
    fetchUsers();
  }, []);

  return <UsersList users={users} />;
}
