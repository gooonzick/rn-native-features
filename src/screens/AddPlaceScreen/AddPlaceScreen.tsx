import { Place } from "../../models/Places";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import PlaceForm from "../../components/PlaceForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackRootStackParamList } from "types";
import { insertPlace } from "utils/database";

type Props = NativeStackScreenProps<StackRootStackParamList, "AddPlace">;

const AddPlaceScreen = ({ navigation, route }: Props) => {
  const onCreatePlace = useCallback(async (place: Place) => {
    await insertPlace(place);

    navigation.navigate("AllPlaces");
  }, []);

  return <PlaceForm onCreatePlace={onCreatePlace} />;
};

export default AddPlaceScreen;

const styles = StyleSheet.create({});
