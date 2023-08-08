import {useContext, useEffect, useState} from 'react';

import {SafeAreaView, StatusBar, View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {getPostsByUser} from '../api/getPostsByUser';
import {PostCard} from '../components';

import Loading from '../components/Loading';
import UserInformation from '../components/UserInformation';

import AppContext from '../contexts/AppContext';
import {Post} from '../types/Post';

import {User} from '../types/User';

const Profile = ({user}: {user: User}) => {
  const ctx = useContext(AppContext);

  if (!ctx) return null;

  const {logout} = ctx;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const userPosts = await getPostsByUser(user.id);
      setPosts(userPosts);
    })();

    setLoading(false);
  }, [posts]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#181818" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#181818',
        }}>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            style={{
              width: '100%',
              backgroundColor: '#181818',
              height: '100%',
            }}
            data={posts}
            renderItem={({item}) => <PostCard post_data={item} user={user} />}
            contentContainerStyle={{flexGrow: 1}}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text style={{color: '#E4E6EB', fontSize: 17}}>
                  No posts to display
                </Text>
              </View>
            }
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={<UserInformation user={user} posts={posts} />}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default Profile;
