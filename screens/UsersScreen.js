import { View, Text, StyleSheet, Pressable } from "react-native";
import UsersList from "../components/UsersList";
import * as Networking from "../utils/http";
import { useState, useEffect, useLayoutEffect } from "react";
import UsersSearchBar from "../components/UsersSearchBar";
import PostsList from "../components/PostsList";
import Spinner from "../components/Spinner";

export default function UsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [currFilter, setCurrFilter] = useState("users");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState(0);
  const [loadingMoreUsers, setLoadingMoreUsers] = useState(false);

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

  async function fetchMoreUsers() {
    const nextPage = currPage + 1;
    setCurrPage(nextPage);
    setLoadingMoreUsers(true);
    const usersResp = await Networking.getUsers(nextPage);
    for (var i = 0; i < usersResp.length; i++) {
      const user = usersResp[i];
      setUsers((arr) => [...arr, user]);
    }
    setLoadingMoreUsers(false);
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

  async function fetchUsers(page = 0) {
    const usersResp = await Networking.getUsers(page);
    setUsers(usersResp);
  }

  async function fetchPosts() {
    const posts = await Networking.getPosts();
    setPosts(posts);
  }

  function fetchDataBasedOnFilter() {
    if (currFilter.toLowerCase() === "users") {
      fetchUsers();
    } else {
      fetchPosts();
    }
  }

  if (isLoading) {
    return (
      <>
        <View style={styles.filterButtons}>{makeFilters()}</View>
        <Spinner />
      </>
    );
  }

  let moreUsersButtonView = (
    <Pressable style={styles.getMoreButton} onPress={fetchMoreUsers}>
      <Text style={styles.moreButtonText}>Get More Users</Text>
    </Pressable>
  );

  if (loadingMoreUsers) {
    moreUsersButtonView = <Spinner />;
  }

  if (currFilter.toLowerCase() === "users") {
    return (
      <View style={styles.container}>
        <View style={styles.filterButtons}>{makeFilters()}</View>
        <UsersList users={users} />
        {moreUsersButtonView}
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
    marginHorizontal: 20,
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
  getMoreButton: {
    // backgroundColor: "#0000ff",
    padding: 10,
    borderRadius: 6,
  },
  moreButtonText: {
    textAlign: "center",
    color: "#0000ff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
