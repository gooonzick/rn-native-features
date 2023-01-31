import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Place } from "../../models/Places";
import { Colors } from "constants/colors";

type Props = Place & {
  onPress: VoidFunction;
};

const PlaceItem = ({ id, title, img, location, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [styles.item, styles.pressed] : styles.item
      }
    >
      <Image source={{ uri: img }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{location.lat}</Text>
        <Text style={styles.address}>{location.lon}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  address: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
