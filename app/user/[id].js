import { Text, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { useSearchParams } from "expo-router";
import UserProfileHeader from "../../src/components/UserProfileHeader";
import { FontAwesome5 } from "@expo/vector-icons";
import Post from "../../src/components/Post";
import colors from "../../assets/colors";
import { DataStore } from "aws-amplify";
import { User, Post as PostModel } from "../../src/models";




const ProfilePage = () => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(true);


    const { id } = useSearchParams();

   useEffect(() => {
     DataStore.query(User, id).then(setUser);
     DataStore.query(PostModel).then(setPosts);
   }, [id]);

  // const user = users.find((user) => user.id === id);

  if (!user) {
    return <Text>User not found</Text>;
  }
console.log(JSON.stringify(user, null, 2));

  if (!isSubscribed) {
    return (
      <View>
        <UserProfileHeader
          user={user}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
        />
        <View style={{
          alignItems: 'center',
          backgroundColor: 'gainsboro',
          padding: 50,
          borderRadius: 150,
        }}>
          <FontAwesome5
            name="lock"
            size={50}
            color={colors.primary}
            style={{ marginRight: 15 }}
          />
          <Text style={{
            backgroundColor: colors.primary,
            padding: 15,
            height: 50,
            borderRadius: 25,
            overflow: 'hidden',
            margin: 20,
          }}>Subscribe to see user's posts</Text>
        </View>
      </View>
    );
  }

  return (
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        ListHeaderComponent={() => (
          <UserProfileHeader
            user={user}
            isSubscribed={isSubscribed}
            setIsSubscribed={setIsSubscribed}
          />
        )}
      />
  );
};

export default ProfilePage;
