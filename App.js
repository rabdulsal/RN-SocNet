import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { DevicesScreen } from "./screens/DevicesScreen";
import { ScannerScreen } from "./screens/ScannerScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
// const navigation = useNavigation();

export default function App() {
  function pressedRightButton(navigation) {
    navigation.navigate("Scanner");
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={"Devices"}
            component={DevicesScreen}
            options={({ navigation }) => ({
              title: "Your Devices",
              headerRight: ({ tintColor }) => (
                <Pressable onPress={pressedRightButton.bind(this, navigation)}>
                  <Ionicons name="camera" size={24} color={tintColor} />
                </Pressable>
              ),
            })}
          />
          <Stack.Screen
            name={"Scanner"}
            component={ScannerScreen}
            options={() => ({ title: "Barcode Scanner" })}
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
