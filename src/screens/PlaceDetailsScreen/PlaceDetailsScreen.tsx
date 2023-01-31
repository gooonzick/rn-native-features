import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import OutlineButton from "../../components/OutlineButton";
import { Colors } from "constants/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackRootStackParamList } from "types";
import { getPlaceById } from "utils/database";
import { Place } from "../../models/Places";

type Props = NativeStackScreenProps<StackRootStackParamList, "PlaceDetails">;

const PlaceDetails = ({ navigation, route }: Props) => {
  const [place, setPlace] = useState<Place | null>(null);

  const onShowOnMap = useCallback(() => {
    if (place) {
      navigation.navigate("Map", {
        initialData: {
          lat: place.location.lat,
          lon: place.location.lon,
        },
      });
    }
  }, [place]);

  useEffect(() => {
    if (route?.params?.id) {
      getPlaceById(route.params.id).then((res) => {
        setPlace(res);
        navigation.setOptions({ title: res.title });
      });
    }
  }, []);

  if (!place) {
    return null;
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.img }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>Address</Text>
        </View>
        <OutlineButton icon="map" onPress={onShowOnMap}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
  },
});
