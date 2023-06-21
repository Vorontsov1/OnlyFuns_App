import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Image,
} from "react-native";
import { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { DataStore, Storage } from "aws-amplify";
import { Post } from "../src/models";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import * as Crypto from "expo-crypto";



const NewPost = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { user } = useAuthenticator();

  const router = useRouter();

  const onPost = async () => {
    console.warn("Post: ", text);
    const imageKey = await uploadImage();

     await DataStore.save(
       new Post({
         text,
         likes: 0,
         userID: user.attributes.sub,
         image: imageKey,
       })
     );

    setText("");
    setImage("");
  };

 async function uploadImage() {
   try {
     console.log(image);
     const response = await fetch(image);
     const blob = await response.blob();
     const fileKey = `${Crypto.randomUUID()}.png`;
    const result = await Storage.put(fileKey, blob, {
       contentType: "image/png", // contentType is optional
    });
     console.log(result);
     return fileKey;
   } catch (err) {
     console.error("Error uploading file:", err);
   }
 }



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <Ionicons
          onPress={() => router.back()}
          name="arrow-back"
          size={28}
          color="grey"
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>New post</Text>
      </View>

      <TextInput
        placeholder="Write a post..."
        value={text}
        onChangeText={setText}
        multiline={true}
        numberOfLines={3}
      />

      <View style={{ marginVertical: 30 }}>
        <Feather onPress={pickImage} name="image" size={34} color="grey" />
      </View>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", aspectRatio: 1 }}
        />
      )}

      <Button title="Post" onPress={onPost} />
    </SafeAreaView>
  );
};

export default NewPost;
