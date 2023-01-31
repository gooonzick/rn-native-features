import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Place } from "../../models/Places";
import PlaceItem from "../../components/PlaceItem";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackRootStackParamList } from "types";

type Props = {
  places: Place[];
};

type Navigation = NativeStackScreenProps<
  StackRootStackParamList,
  "PlaceDetails"
>["navigation"];

const PlaceList = ({ places }: Props) => {
  const navigate = useNavigation<Navigation>();

  if (places?.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <PlaceItem
          {...item}
          onPress={() => {
            navigate.navigate("PlaceDetails", {
              id: item.id,
            });
          }}
        />
      )}
    />
  );
};

export default PlaceList;

const styles = StyleSheet.create({
  list: {
    padding: 6,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
});
