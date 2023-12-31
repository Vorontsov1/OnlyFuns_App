import { View, Text, Image } from 'react-native';
import { Entypo, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import colors from '../../assets/colors';
import { useState, useEffect } from 'react';
import { DataStore, Storage } from 'aws-amplify';
import { User } from '../models';



const Post = ({ post }) => {
  const [user, setUser] = useState();
  const [imageUri, setImageUri] = useState();

  useEffect(() => { 
    DataStore.query(User, post.userID).then(setUser);
  }, [])

  useEffect(() => {
    if (post.image) {
      Storage.get(post.image).then(setImageUri);
    }
  }, [post.image]);


  return (
    <View style={{ marginVertical: 15 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Image
          source={{ uri: user?.avatar }}
          style={{
            width: 50,
            aspectRatio: 1,
            borderRadius: 50,
            marginRight: 10,
          }}
        />
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 3 }}>
            {user?.name}
          </Text>
          <Text style={{ color: "gray", fontSize: 14 }}>@{user?.handle}</Text>
        </View>

        <View
          style={{
            marginLeft: "auto",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ marginRight: 5, color: "gray", fontSize: 14 }}>
            3 hours ago
          </Text>
          <Entypo name="dots-three-horizontal" size={18} color="black" />
        </View>
      </View>

      <Text style={{ margin: 10, lineHeight: 18 }}>{post.text}</Text>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: "100%", aspectRatio: 1}} />
      )}

      <View style={{ margin: 10, flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          name="hearto"
          size={24}
          color={colors.primary}
          style={{ marginRight: 15 }}
        />
        <FontAwesome5
          name="dollar-sign"
          size={22}
          color={colors.primary}
          style={{ marginRight: 15 }}
        />
      </View>

      <Text style={{ fontWeight: "500", marginHorizontal: 10 }}>
        {post.likes} Likes
      </Text>
    </View>
  );
}

export default Post;
