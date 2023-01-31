import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlacesScreen from "./src/screens/AllPlacesScreen";
import AddPlaceScreen from "./src/screens/AddPlaceScreen";
import MapScreen from "./src/screens/MapScreen";

import { AddPlaceScreenProps, StackRootStackParamList } from "./src/types";
import IconButton from "./src/components/IconButton";
import { Colors } from "constants/colors";
import { useEffect, useState } from "react";
import { initDb } from "./src/utils/database";
import AppLoading from "expo-app-loading";
import PlaceDetailsScreen from "screens/PlaceDetailsScreen";

const Stack = createNativeStackNavigator<StackRootStackParamList>();

export default function App() {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    initDb()
      .then(() => {
        setIsDbReady(true);
      })
      .catch((reason) => console.log(reason));
  }, []);

  if (!isDbReady) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlacesScreen}
            options={({ navigation }: { navigation: AddPlaceScreenProps }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlaceScreen}
            options={{
              title: "Add a new Place",
            }}
          />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
