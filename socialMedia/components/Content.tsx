import {SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import PostCard from './PostCard';

const testContent = [
  {
    id: '1',
    description: "It's a beautiful day in this neighborhood",
    imageLink: 'https://picsum.photos/200/300',
    authorId: '1',
    likes: 2,
    shares: 1,
    comments: [
      {
        id: '1',
        authorId: '1',
        postId: '1',
        content: 'This is a comment',
        createdAt: new Date(),
      },
    ],
    createdAt: new Date(),
  },
];

const Content = () => {
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <ScrollView>
        {/*testContent.map(item => (
          <PostCard key={item.id} user={user} post_data={item.post_data} />
        ))*/}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Content;
