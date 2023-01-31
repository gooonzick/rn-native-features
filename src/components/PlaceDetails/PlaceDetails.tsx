import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import OutlineButton from "../OutlineButton/";
import { Colors } from "constants/colors";

type Props = {};

const PlaceDetails = (props: Props) => {
  const onShowOnMap = useCallback(() => {}, []);
  return (
    <ScrollView>
      <Image style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>Address</Text>
        </View>
        <OutlineButton icon="map" onPress={onShowOnMap}>
          View on Map
        </OutlineButton>
      </View>
      <Text>PlaceDetails</Text>
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
