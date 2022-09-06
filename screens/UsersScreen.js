import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import UsersList from "../components/UsersList";
import * as Networking from "../utils/http";
import { useState, useEffect, useLayoutEffect } from "react";
import UsersSearchBar from "../components/UsersSearchBar";
import PostsList from "../components/PostsList";

export default function UsersScreen({ navigation }) {
  const [users, setUsers] = useState();
  const [currFilter, setCurrFilter] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filters = ["Users", "Posts"];
  const filterButtons = [];

  useLayoutEffect(() => {
    // makeFilters();
  });

  useEffect(() => {
    setIsLoading(true);
    fetchDataBasedOnFilter();
  }, [currFilter]);

  useEffect(() => {
    // setFilteredView();
    setIsLoading(false);
  }, [users, posts]);

  function pressedFilter(idx) {
    setCurrFilter(filters[idx]);
    // Alert.alert(`${currFilter} ${idx}`);
  }

  function setFilterAndUpdateView(idx) {
    setCurrFilter(filters[idx]);
    fetchDataBasedOnFilter();
    setFilteredView();
  }

  function makeFilters() {
    if (filterButtons.length === 0) {
      for (var i = 0; i < filters.length; i++) {
        const filter = filters[i];
        filterButtons.push(
          <Pressable
            style={styles.filterButton}
            onPress={pressedFilter.bind(this, i)}
          >
            <Text style={styles.filterButtonsText}>{filter}</Text>
          </Pressable>
        );
      }
      return filterButtons;
    }
    return filterButtons;
  }

  async function fetchUsers() {
    const usersResp = await Networking.getUsers();
    setUsers(usersResp.data);
  }

  async function fetchPosts() {
    const posts = await Networking.getPosts();
    setPosts(posts);
  }

  function fetchDataBasedOnFilter() {
    if (currFilter.toLowerCase === "users") {
      fetchUsers();
    } else {
      fetchPosts();
    }
  }

  if (isLoading) {
    return (
      <View style={styles.filterButtons}>
        {makeFilters()}
        <ActivityIndicator size="large" />;
      </View>
    );
  }
  if (currFilter === "users") {
    return (
      <View style={styles.container}>
        <View style={styles.filterButtons}>{makeFilters()}</View>
        <UsersList users={users} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.filterButtons}>{makeFilters()}</View>
        <PostsList posts={posts} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 8,
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: "#0000ff",
    padding: 10,
    borderRadius: 6,
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
  },
  filterButtonsText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
