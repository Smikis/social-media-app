import {Image, View} from 'react-native';

const ProfilePicture = ({
  pfp,
  height,
  width,
}: {
  pfp: string;
  height: number;
  width: number;
}) => {
  return (
    <View
      style={{elevation: 5, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={{uri: pfp}}
        style={{
          height: height,
          width: width,
          borderRadius: 500,
          marginBottom: 10,
          backgroundColor: '#fff',
        }}
      />
    </View>
  );
};

export default ProfilePicture;
