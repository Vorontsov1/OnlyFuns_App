import { Text, View, FlatList } from "react-native";
import { useState } from "react";
import { useSearchParams } from "expo-router";
import users from "../../assets/data/users";
import UserProfileHeader from "../../src/components/UserProfileHeader";
import { FontAwesome5 } from "@expo/vector-icons";
import posts from "../../assets/data/posts";
import Post from "../../src/components/Post";
import colors from "../../assets/colors";



const ProfilePage = () => {
  const { id } = useSearchParams();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return <Text>User not found</Text>;
  }
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
