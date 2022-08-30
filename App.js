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

const Stack = createNativeStackNavigator();

export default function App() {
  const [allDevices, setAllDevices] = useState();

  function pressedScannerButton(navigation) {
    navigation.navigate("Scanner");
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={"UsersList"}
            component={UsersScreen}
            options={{
              title: "Users List",
            }}
          />
          <Stack.Screen
            name={"UserProfile"}
            component={ProfileScreen}
            options={{
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
