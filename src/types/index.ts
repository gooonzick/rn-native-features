import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Place } from "../models/Places";

export type StackRootStackParamList = {
  AllPlaces: {
    place?: Place;
  };
  AddPlace: {
    lat?: number;
    lon?: number;
  };
  Map: {
    initialData?: {
      lat: number;
      lon: number;
    };
  };
  PlaceDetails: {
    id?: number | string;
  };
};

export type AddPlaceScreenProps = NativeStackNavigationProp<
  StackRootStackParamList,
  "AddPlace"
>;
