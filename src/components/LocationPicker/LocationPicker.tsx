import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import OutlineButton from "../OutlineButton";
import { Colors } from "constants/colors";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { getStaticMap } from "utils/location";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackRootStackParamList } from "types";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

type NavProps = NativeStackScreenProps<StackRootStackParamList, "AddPlace">;
type Location = {
  lat: number;
  lon: number;
};

type Props = {
  onPickLocation: (location: Location) => void;
};

const LocationPicker = ({ onPickLocation }: Props) => {
  const route = useRoute<NavProps["route"]>();
  const navigation = useNavigation<NavProps["navigation"]>();
  const isFocused = useIsFocused();

  const [loc, setLoc] = useState(route.params);

  const [locPermission, requestPermission] = useForegroundPermissions();

  const verifyPermission = useCallback(async () => {
    console.log(Date.now().toLocaleString());

    if (locPermission?.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();

      return response.granted;
    }

    if (locPermission?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera permissions"
      );

      return false;
    }

    return true;
  }, [locPermission?.status]);

  const onLocateUser = useCallback(async () => {
    const isAllowed = await verifyPermission();

    if (!isAllowed) {
      return;
    }

    const location = await getCurrentPositionAsync();

    console.log({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });
    console.log(Date.now().toLocaleString());
    setLoc({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });
  }, [verifyPermission]);

  const onPickOnMap = useCallback(() => {
    navigation.navigate("Map");
  }, []);

  useEffect(() => {
    if (isFocused && route.params) {
      setLoc(route.params);
    }
  }, [isFocused]);

  useEffect(() => {
    if (loc?.lat && loc?.lon) {
      const { lat, lon } = loc;
      onPickLocation({ lat, lon });
    }
  }, [loc]);

  const isVisible = loc?.lat && loc?.lon;

  return (
    <View>
      <View style={styles.mapPreview}>
        {isVisible && (
          <Image
            source={{ uri: getStaticMap(loc) }}
            style={{ height: 200, width: "100%" }}
          />
        )}
      </View>
      <View style={styles.action}>
        <OutlineButton icon="location" onPress={onLocateUser}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="location" onPress={onPickOnMap}>
          Pick on map
        </OutlineButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
