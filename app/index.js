import { Link} from "expo-router";
import { StyleSheet, View, FlatList, Text } from "react-native"; 
import UserCard from "../src/components/UserCard";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import {User} from '../src/models';



export default function Page() {
  const [users, setUsers] = useState([]);

const {signOut} = useAuthenticator();

  useEffect(() => { 
    // fetch users
    DataStore.query(User).then(setUsers);
  },[])
  
  return (
    <View style={styles.container}>
      <Link href={'/newPost'}>New post</Link>
      <Text onPress={() => signOut()}>Sign Out</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 75,
  },
});
