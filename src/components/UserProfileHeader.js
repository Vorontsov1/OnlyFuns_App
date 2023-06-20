import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Ionicons,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import colors from "../../assets/colors";
import { useState } from "react";

const UserProfileHeader = ({ user, isSubscribed, setIsSubscribed }) => {
  const router = useRouter();

  return (
    <View style={{}}>
      <ImageBackground source={{ uri: user.coverImage }} style={styles.cover}>
        <View style={styles.overlay} />
        <SafeAreaView
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            onPress={() => router.back()}
            name="arrow-back"
            size={28}
            color="white"
            style={{ marginRight: 10 }}
          />
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "500",
                marginBottom: 5,
              }}
            >
              {user.name}
            </Text>
            <Text style={{ color: "white" }}>
              1.4K Posts · 64.3K Likes · 15.3 Fans
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-around",
            marginTop: -50,
          }}
        >
          <Image src={user.avatar} style={styles.userimage} />
          <MaterialCommunityIcons
            name="message-text-outline"
            size={24}
            color={colors.primary}
          />
          <FontAwesome5 name="star" size={24} color={colors.primary} />
          <FontAwesome name="share-square-o" size={24} color={colors.primary} />
        </View>
        <Text style={{ fontWeight: "600", fontSize: 20, marginVertical: 5 }}>
          {user.name}
        </Text>
        <Text style={{ color: colors.grey, marginBottom: 10 }}>
          @{user.handle}
        </Text>
        <Text style={{ lineHeight: 20 }}>{user.bio}</Text>
        <Text style={{ color: colors.grey, fontWeight: "bold", marginTop: 20 }}>
          SUBSCRIPTION
        </Text>

        <Pressable
          onPress={() => setIsSubscribed(!isSubscribed)}
          style={[
            styles.button,
            { backgroundColor: isSubscribed ? "white" : colors.primary },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isSubscribed ? colors.primary : "white" },
            ]}
          >
            {!isSubscribed ? "SUBSCRIBE" : "SUBSCRIBED"}
          </Text>
          <Text
            style={[
              styles.buttonText,
              { color: isSubscribed ? colors.primary : "white" },
            ]}
          >
            {user.subscriptionPrice === 0
              ? "FOR FREE"
              : `$${user.subscriptionPrice} / month`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    height: 200,
    width: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    ...StyleSheet.absoluteFillObject,
  },
  userimage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 3,
    marginRight: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 15,
    borderRadius: 50,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  buttonText: {
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default UserProfileHeader;
