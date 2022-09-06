import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { DevicesScreen } from "./screens/DevicesScreen";
import ScannerScreen from "./screens/ScannerScreen";
import { Ionicons } from "@expo/vector-icons";
import DashboardScreen from "./screens/DashboardScreen";
import DeviceDetailScreen from "./screens/DeviceDetailScreen";
import UsersScreen from "./screens/UsersScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PostDetailsScreen from "./screens/PostDetailsScreen";
import CreateUserScreen from "./screens/CreateUserScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [allDevices, setAllDevices] = useState();

  function pressedScannerButton(navigation) {
    navigation.navigate("Scanner");
  }

  function pressedAddUserButton(navigation) {
    navigation.navigate("AddUser");
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={"UsersList"}
            component={UsersScreen}
            options={({ navigation }) => ({
              title: "Users List",
              headerLeft: () => (
                <Pressable
                  onPress={pressedAddUserButton.bind(this, navigation)}
                >
                  <Ionicons name="md-person-add" size={24} color="#0000ff" />
                </Pressable>
              ),
            })}
          />
          <Stack.Screen
            name={"UserProfile"}
            component={ProfileScreen}
            // options={{
            //   presentation: "modal",
            // }}
          />
          <Stack.Screen
            name={"AddUser"}
            component={CreateUserScreen}
            options={{
              title: "Create User",
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="PostDetails"
            component={PostDetailsScreen}
            options={{
              title: "Post Details",
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={({ navigation }) => ({
              title: "Dashboard",
              headerRight: () => (
                <Pressable
                  onPress={pressedScannerButton.bind(this, navigation)}
                >
                  <Ionicons name="camera" size={24} color="#0000ff" />
                </Pressable>
              ),
            })}
          />
          <Stack.Screen name="Scanner" component={ScannerScreen} />
          <Stack.Screen
            name="DeviceDetail"
            component={DeviceDetailScreen}
            options={{
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
  },
});
