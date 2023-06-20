import { Text, View, FlatList } from "react-native";
import { useState } from "react";
import { useSearchParams } from "expo-router";
import users from "../../assets/data/users";
import UserProfileHeader from "../../src/components/UserProfileHeader";
import posts from "../../assets/data/posts";
import Post from "../../src/components/Post";

const ProfilePage = () => {
  const { id } = useSearchParams();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return <Text>User not found</Text>;
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
