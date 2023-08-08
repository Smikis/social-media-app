import {useContext} from 'react';
import AppContext from '../contexts/AppContext';

import {View, Text, Pressable} from 'react-native';
import {Post} from '../types/Post';

import type {User} from '../types/User';
import ProfilePicture from './ProfilePicture';

import Icon from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';

const UserInformation = ({user, posts}: {user: User; posts: Post[]}) => {
  const ctx = useContext(AppContext);

  if (!ctx) return null;

  const navigation = useNavigation();

  const {user: currentUser} = ctx;

  return (
    <View
      style={{
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#242526',
        marginBottom: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <ProfilePicture pfp={user.pfp} height={70} width={70} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '60%',
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#E4E6EB', fontSize: 17, fontWeight: 'bold'}}>
              {user.followers.length}
            </Text>
            <Text style={{color: '#E4E6EB', fontSize: 17}}>Followers</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#E4E6EB', fontSize: 17, fontWeight: 'bold'}}>
              {user.following.length}
            </Text>
            <Text style={{color: '#E4E6EB', fontSize: 17}}>Following</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#E4E6EB', fontSize: 17, fontWeight: 'bold'}}>
              {posts.length}
            </Text>
            <Text style={{color: '#E4E6EB', fontSize: 17}}>Posts</Text>
          </View>
        </View>
      </View>
      <View style={{width: '100%', paddingHorizontal: 15}}>
        <Text
          style={{
            color: '#E4E6EB',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 5,
          }}>
          {user.username}
        </Text>
        <Text style={{color: '#E4E6EB', fontSize: 15, fontStyle: 'italic'}}>
          {user.tag}
        </Text>
      </View>
      {currentUser.id === user.id && (
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <Pressable
            style={{
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              backgroundColor: '#3A3B3C',
              borderRadius: 7,
            }}
            onPress={() => navigation.navigate('EditProfile' as never)}>
            <Text
              style={{
                color: '#E4E6EB',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Edit profile
            </Text>
          </Pressable>
          <Icon
            name="add-circle-outline"
            size={25}
            color="#E4E6EB"
            onPress={() => navigation.navigate('NewPost' as never)}
            style={{marginLeft: 10}}
          />
        </View>
      )}
    </View>
  );
};

export default UserInformation;
