import {View, Text, FlatList} from 'react-native';

import {User} from '../types/User';
import PostCard from './PostCard';

import {Post} from '../types/Post';

const Posts = ({user, posts}: {user: User; posts: Post[]}) => {
  return posts ? (
    <Text>lol</Text>
  ) : (
    
  );
};

export default Posts;
