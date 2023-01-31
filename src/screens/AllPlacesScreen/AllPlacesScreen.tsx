import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackRootStackParamList } from "types";
import { useIsFocused } from "@react-navigation/native";
import { Place } from "../../models/Places";
import PlaceList from "../../components/PlaceList";
import { getPlaces } from "utils/database";

type Props = NativeStackScreenProps<StackRootStackParamList, "AllPlaces">;

const AllPlacesScreen = ({ navigation, route }: Props) => {
  const isFocused = useIsFocused();

  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (isFocused) {
      getPlaces().then((res) => setLoadedPlaces(res));
    }
  }, [isFocused]);

  return (
    <View>
      <PlaceList places={loadedPlaces} />
    </View>
  );
};

export default AllPlacesScreen;

const styles = StyleSheet.create({});
