import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import users from '../assets/data/users';


const user = users[0];

export default function Page() {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: user.coverImage }} style={styles.userCard}>
        <View style={styles.overlay} />
        {/* {image} */}
        <Image
          style={styles.userimage}
          src={user.avatar}
          resizeMode="cover"
        />

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 75,
  },
  userCard: {
    backgroundColor: "grey",
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: 15,
    overflow: "hidden",
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
