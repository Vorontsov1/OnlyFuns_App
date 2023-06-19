import { View, Text } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';
import users from '../../assets/data/users';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = useSearchParams();

  const user = users.find(user => user.id === id);

  if (!user) { 
    return (
      <View style={{marginTop: 100}}>
        <Text>User not found</Text>
      </View>
    ); 
  
  }

  return (
    <View style={{marginTop: 100}}>
          <Text>Profile Page: {user.name}</Text>
          <Text onPress={() => router.back()}>Go back</Text>
    </View>
  );
}

export default ProfilePage;
