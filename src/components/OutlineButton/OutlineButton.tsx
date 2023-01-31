import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "constants/colors";

type Props = {
  onPress: VoidFunction;
  icon: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode;
};

const OutlineButton = ({ children, icon, onPress }: Props) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.button, styles.pressed] : styles.button
      }
      onPress={onPress}
    >
      <Ionicons name={icon} color={Colors.primary500} style={styles.icon} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  },
});
