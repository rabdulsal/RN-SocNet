import { TextInput, StyleSheet, View } from "react-native";

export default function UsersSearchBar({ onChangeText }) {
  return (
    <View>
      <TextInput
        placeholder="Search Users"
        style={styles.input}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#fdfdfd",
    padding: 8,
    marginVertical: 5,
  },
});
