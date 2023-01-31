import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Colors } from "constants/colors";
import ImagePicker from "../ImagePicker";
import LocationPicker from "../LocationPicker";
import Button from "../Button";
import { ImagePickerResult } from "expo-image-picker";
import { Place } from "../../models/Places";

type Props = {
  onCreatePlace: (place: Place) => void;
};

type Location = {
  lat: number;
  lon: number;
};

const PlaceForm = ({ onCreatePlace }: Props) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<ImagePickerResult | null>();
  const [location, setLocation] = useState<Location | null>(null);

  const onTitleChange = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const onImageTaken = useCallback((image: ImagePickerResult) => {
    setImage(image);
  }, []);

  const onPickLocation = useCallback((location: Location) => {
    setLocation(location);
  }, []);

  const onSavePlace = useCallback(() => {
    if (title && image && location) {
      const place = new Place(title, image.assets[0].uri, location);

      onCreatePlace(place);
    }
  }, [title, image, location]);

  return (
    <ScrollView style={[styles.form, StyleSheet.absoluteFill]}>
      <View style={{ padding: 24 }}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.titleInput}
          onChangeText={onTitleChange}
          value={title}
        />
        <ImagePicker onImageTaken={onImageTaken} />
        <LocationPicker onPickLocation={onPickLocation} />
        <Button onPress={onSavePlace}>Save</Button>
      </View>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    margin: 4,
    color: Colors.primary700,
  },
  titleInput: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
