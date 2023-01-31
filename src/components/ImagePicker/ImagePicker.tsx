import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  ImagePickerResult,
} from "expo-image-picker";
import { Colors } from "constants/colors";
import OutlineButton from "../OutlineButton";

type Props = {
  onImageTaken: (image: ImagePickerResult) => void;
};

const ImagePicker = ({ onImageTaken }: Props) => {
  const [pickedImage, setPickedImage] = useState<ImagePickerResult | null>(
    null
  );
  const [info, requestPermission] = useCameraPermissions();

  const verifyPermission = useCallback(async () => {
    if (info?.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();

      return response.granted;
    }

    if (info?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera permissions"
      );

      return false;
    }

    return true;
  }, [info?.status]);

  const onTakeImage = useCallback(async () => {
    const isAllow = verifyPermission();

    if (!isAllow) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image);
    onImageTaken(image);
  }, [verifyPermission]);

  let content = (
    <View style={styles.image}>
      <Text style={styles.textPreview}>No image taken yet.</Text>
    </View>
  );

  if (pickedImage && !pickedImage?.canceled) {
    const [image] = pickedImage.assets;
    content = <Image source={{ uri: image.uri }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.contentContainer}>{content}</View>
      <OutlineButton icon="camera" onPress={onTakeImage}>
        Take Image
      </OutlineButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textPreview: {
    color: Colors.primary100,
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
