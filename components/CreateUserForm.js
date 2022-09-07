import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Animated,
} from "react-native";
import * as Networking from "../utils/http";
import Spinner from "./Spinner";
import UserCard from "./UserCard";

export default function CreateUserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // Sam Samster -> 6317c50a4373f579c42c1141
  const navigation = useNavigation();

  useEffect(() => {}, [isLoading]);

  function onFNameChange(text) {
    setFirstName(text);
  }

  function onLNameChange(text) {
    setLastName(text);
  }

  function onEmailChange(text) {
    setEmail(text);
  }

  function pressedCancelButton() {
    navigation.goBack();
  }

  async function pressedSubmitButton() {
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    setIsLoading(true);
    const userResp = await Networking.createUser(userData);
    setIsLoading(false);
    console.log(userResp.id);
    setUsers([...users, userResp]);
  }

  function didDeleteCallBack(userId) {
    /*
    Typically would just re-fetch the Users list from server, which would have the intended USer removed
    */
    const index = users.findIndex((user) => user.id === userId);
    setUsers([
      ...users.slice(0, index),
      ...users.slice(index + 1, users.length),
    ]);
  }
  function renderNewUser(userData) {
    const user = userData.item;
    return (
      <UserCard
        user={user}
        onPress={pressedUserCard}
        didDeleteCallBack={didDeleteCallBack}
      />
    );
  }

  function pressedUserCard(userId) {
    navigation.navigate("UserProfile", {
      userId: userId,
    });
  }

  async function onPressedDelete() {
    setIsDeleting(true);
    const response = await deleteUser(id);
  }

  let submitView = (
    <Pressable style={styles.actionButton} onPress={pressedSubmitButton}>
      <Text style={styles.actionText}>Submit</Text>
    </Pressable>
  );
  if (isLoading) {
    submitView = <Spinner />;
  }

  let newUsersView = <View></View>;

  if (users.length > 0) {
    newUsersView = (
      <View style={styles.usersContainer}>
        <Text style={[styles.titleLabel, styles.usersTitle]}>NEW USERS</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderNewUser}
        />
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.container}>
          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.nameFields}>
              <View style={styles.nameField}>
                <Text style={styles.titleLabel}>First Name</Text>
                <TextInput
                  placeholder="First Name"
                  onChangeText={onFNameChange}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.nameField}>
                <Text style={styles.titleLabel}>Last Name</Text>
                <TextInput
                  placeholder="Last Name"
                  onChangeText={onLNameChange}
                  style={styles.textInput}
                />
              </View>
            </View>
            <Text style={styles.titleLabel}>Email</Text>
            <TextInput
              placeholder="Email Address"
              onChangeText={onEmailChange}
              style={styles.textInput}
            />
          </View>
          {/* Buttons */}
          <View style={styles.actionButtons}>
            <Pressable
              style={styles.actionButton}
              onPress={pressedCancelButton}
            >
              <Text style={styles.actionText}>Cancel</Text>
            </Pressable>
            {submitView}
          </View>
          {/* New Users */}
          {newUsersView}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  formContainer: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  titleLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#aaa",
    marginVertical: 10,
  },
  usersTitle: {
    fontSize: 15,
  },
  textInput: {
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
  },
  nameFields: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameField: {
    // flex: 1,
    width: "47%",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    padding: 10,
    backgroundColor: "#0000ff",
    borderRadius: 8,
    width: "30%",
  },
  actionText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  usersContainer: {
    marginVertical: 5,
  },
});
