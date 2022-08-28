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
import * as Networking from "./utils/http";

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
