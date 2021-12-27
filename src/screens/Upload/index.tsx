import React, { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";

import { Container, Content, Progress, Transferred } from "./styles";

export function Upload() {
  const [image, setImage] = useState("");
  const [bytesTransfered, setBytesTransfered] = useState("");
  const [progress, setProgress] = useState("0");

  async function handlePickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  const handleUpload = async () => {
    const fileName = new Date().getTime();
    const reference = storage().ref(`/images/${fileName}.png`);

    const uploadTask = reference.putFile(image);

    uploadTask.on("state_changed", (taskSnapshot) => {
      const percent = (
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(percent);

      setBytesTransfered(
        `${taskSnapshot.bytesTransferred} transferidos de ${taskSnapshot.totalBytes}`
      );
    });

    uploadTask.then(async () => {
      const imageUrl = await reference.getDownloadURL();
      console.log(imageUrl);
      Alert.alert("Upload concluído com sucesso!");
    });
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  return (
    <Container>
      <Header title="Upload de Fotos" />

      <Content>
        <Photo uri={image} onPress={handlePickImage} />

        <Button title="Fazer upload" onPress={handleUpload} />

        <Progress>{progress}%</Progress>

        <Transferred>{bytesTransfered}</Transferred>
      </Content>
    </Container>
  );
}
