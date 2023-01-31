import { Alert, StyleSheet, View } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import MapView, { MapPressEvent, Marker, Region } from "react-native-maps";
import { StackRootStackParamList } from "types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import IconButton from "../../components/IconButton";

type Props = NativeStackScreenProps<StackRootStackParamList, "Map">;

const MapScreen = ({ navigation, route }: Props) => {
  const [loc, setLoc] = useState<{ lon: number; lat: number } | null>(
    route?.params?.initialData
  );

  const onSelectLocation = useCallback((event: MapPressEvent) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lon = event.nativeEvent.coordinate.longitude;

    setLoc({ lat, lon });
  }, []);

  const onSaveLoc = useCallback(() => {
    if (!loc) {
      Alert.alert("No location picked!", "Please select a location first!");

      return;
    }

    navigation.navigate("AddPlace", loc);
  }, [loc]);

  useLayoutEffect(() => {
    if (!route?.params?.initialData) {
      navigation.setOptions({
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="save"
            color={tintColor}
            size={24}
            onPress={onSaveLoc}
          />
        ),
      });
    }
  }, [onSaveLoc, navigation]);

  const initialReagin: Region = {
    latitude: route?.params?.initialData?.lat ?? 37.77,
    longitude: route?.params?.initialData?.lon ?? -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.screenContainer}>
      <MapView
        provider="google"
        style={styles.map}
        initialRegion={initialReagin}
        onPress={onSelectLocation}
      >
        {loc && (
          <Marker coordinate={{ latitude: loc.lat, longitude: loc.lon }} />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
