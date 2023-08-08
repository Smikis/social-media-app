import {memo} from 'react';

import {View, Text, Image, Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Post} from '../types/Post';
import {User} from '../types/User';

const width = Dimensions.get('window').width;

type PostCardProps = {
  user: User;
  post_data: Post;
};

const TopPart = ({
  name,
  tag,
  profileImage,
}: {
  name: string;
  tag: string;
  profileImage: string;
}): JSX.Element => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingBottom: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          source={{uri: profileImage}}
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            marginRight: 10,
            backgroundColor: '#FFF',
          }}
        />
        <View>
          <Text style={{color: '#E4E6EB', fontSize: 15, fontWeight: 'bold'}}>
            {name}
          </Text>
          <Text
            style={{
              color: '#E4E6EB',
              fontSize: 10,
              fontStyle: 'italic',
            }}>
            {tag}
          </Text>
        </View>
      </View>
      <Icon name="dots-vertical" color="#E4E6EB" size={25} />
    </View>
  );
};

const BottomPart = ({post_data}: {post_data: Post}): JSX.Element => {
  return (
    <View style={{paddingHorizontal: 10}}>
      <View
        style={{
          paddingVertical: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <PostButton
          name="thumb-up-outline"
          color="#E4E6EB"
          size={20}
          text={post_data.likes}
        />
        <PostButton
          name="comment-outline"
          color="#E4E6EB"
          size={20}
          text={post_data?.comments?.length || 0}
        />
        <PostButton
          name="share-outline"
          color="#E4E6EB"
          size={20}
          text={post_data.shares}
        />
      </View>
      <Text style={{color: '#E4E6EB', fontSize: 15}}>
        {post_data.description}
      </Text>
      <Text style={{color: '#E4E6EB', fontSize: 10, fontStyle: 'italic'}}>
        {new Date(post_data.createdAt).toDateString()}
      </Text>
    </View>
  );
};

const PostButton = ({
  name,
  color,
  size,
  text,
}: {
  name: string;
  color: string;
  size: number;
  text: number;
}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Icon name={name} color={color} size={size} style={{paddingRight: 5}} />
      <Text style={{color: '#E4E6EB', fontSize: 15}}>{text}</Text>
    </View>
  );
};

const PostCard = memo(({user, post_data}: PostCardProps) => {
  return (
    <View
      style={{
        paddingVertical: 10,
        backgroundColor: '#242526',
        marginTop: 10,
        borderRadius: 10,
        width: '100%',
      }}>
      <TopPart name={user.username} tag={user.tag} profileImage={user.pfp} />
      <Image
        source={{uri: post_data.imageLink, scale: 1, cache: 'default'}}
        style={{
          width: width,
          height: width * 1.5,
          resizeMode: 'contain',
        }}
      />
      <BottomPart post_data={post_data} />
    </View>
  );
});

export default PostCard;
