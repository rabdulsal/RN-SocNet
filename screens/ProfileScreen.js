import { Ionicons } from "@expo/vector-icons";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { getUserProfile } from "../utils/http";

export default function UserProfile({ navigation, route }) {
  const userId = route.params.userId;

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile(userId) {
      setLoading(true);
      const response = await getUserProfile(userId);
      setLoading(false);
      setProfile(response);
    }
    fetchProfile(userId);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: userId,
      headerLeft: () => {
        <Ionicons name="close" size={24} color="red" />;
      },
    });
  });

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // FIXME: Note that b/c location data is a nested object, to avoid crash on null location, must create placeholder JSX to be populated at later point
  let location = (
    <View>
      <Text>Loading Location...</Text>
    </View>
  );

  if (profile.location) {
    location = (
      <View>
        <Text>{profile.location.street}</Text>
        <View style={styles.address}>
          <Text>{profile.location.city}</Text>
          <Text>{profile.location.state}</Text>
          <Text>{profile.location.countr}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: profile.picture }} style={styles.userImage} />
      <View>
        <Text
          style={styles.userName}
        >{`${profile.firstName} ${profile.lastName}`}</Text>
        <Text>{profile.email}</Text>
        {location}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  address: {
    flexDirection: "row",
  },
});
