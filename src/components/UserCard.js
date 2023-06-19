import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";

export default function UserCard({ user }) {
  return (
    <ImageBackground source={{ uri: user.coverImage }} style={styles.userCard}>
      <View style={styles.overlay} />
      {/* {image} */}
      <Image style={styles.userimage} src={user.avatar} resizeMode="cover" />

      {/* name & handle */}

      <View>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 22,
            marginBottom: 5,
          }}
        >
          {user.name}
        </Text>
        <Text style={{ color: "white", fontSize: 16 }}>@{user.handle}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: "grey",
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: 15,
    overflow: "hidden",
    marginVertical: 5,
  },
  userimage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 3,
    marginRight: 20,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    ...StyleSheet.absoluteFillObject,
  },
});
