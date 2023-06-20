import { View, Text, SafeAreaView, TextInput, Button, Image } from "react-native";
import {useState} from 'react';
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; 
import { useRouter } from 'expo-router';


const NewPost = () => {
  const [text, setText] = useState('');
    const [image, setImage] = useState(null);
const router = useRouter();


  const onPost = () => {
    console.log('Post', text);
    setText('');
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
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <Ionicons
          onPress={() => router.back()}
          name="arrow-back"
          size={28}
          color="grey"
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>New post</Text>
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
          style={{ width: "100%",  aspectRatio: 1 }}
        />
      )}

      <Button title="Post" onPress={onPost} />
    </SafeAreaView>
  );
};

export default NewPost;
