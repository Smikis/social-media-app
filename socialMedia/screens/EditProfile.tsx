import {useContext, useState} from 'react';

import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import AppContext from '../contexts/AppContext';

import ProfilePicture from '../components/ProfilePicture';
import {updateUser} from '../api/updateUser';

import Icon from 'react-native-vector-icons/Ionicons';

import {launchImageLibrary} from 'react-native-image-picker';

import {uploadImage} from '../utils/uploadImage';

const EditProfile = ({navigation}: any) => {
  const ctx = useContext(AppContext);

  if (!ctx) return null;

  const {user} = ctx;

  const [data, setData] = useState({
    username: user.username,
    email: user.email,
    pfp: user.pfp,
  });

  const [loading, setLoading] = useState(false);
  const [changingPfp, setChangingPfp] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await updateUser({
      username: data.username,
      email: data.email,
      imgURL: data.pfp,
      id: user.id,
    });
    setLoading(false);
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#181818',
        alignItems: 'center',
      }}>
      <View>
        <ProfilePicture pfp={data.pfp} height={120} width={120} />
        <ActivityIndicator
          style={{
            position: 'absolute',
            top: 35,
            right: 35,
            opacity: changingPfp ? 1 : 0,
            zIndex: 100,
          }}
          color="#E4E6EB"
          size={50}
        />
      </View>
      <Icon
        style={{
          position: 'absolute',
          top: 90,
          right: 130,
          backgroundColor: '#343536',
          padding: 10,
          borderRadius: 50,
        }}
        name="pencil"
        color={'#FFF'}
        size={15}
        onPress={async () =>
          launchImageLibrary(
            {mediaType: 'photo', includeBase64: false},
            res => {
              if (res.didCancel) return;
              if (res.assets) {
                if (res.assets[0].uri) {
                  setChangingPfp(true);
                  uploadImage(res.assets[0].uri).then(url => {
                    setData({...data, pfp: url});
                    setChangingPfp(false);
                  });
                }
              }
            },
          )
        }
      />

      <View style={{width: '100%', paddingHorizontal: 15}}>
        <Text style={{color: '#E4E6EB'}}>Username</Text>
        <TextInput
          style={{
            color: '#E4E6EB',
            width: '100%',
            backgroundColor: '#242526',
            paddingVertical: 20,
            paddingHorizontal: 25,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 20,
            fontSize: 17,
            position: 'relative',
          }}
          value={data.username}
          onChangeText={text => setData({...data, username: text})}
        />
        <Text style={{color: '#E4E6EB'}}>Email</Text>
        <TextInput
          style={{
            color: '#E4E6EB',
            width: '100%',
            backgroundColor: '#242526',
            paddingVertical: 20,
            paddingHorizontal: 25,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 20,
            fontSize: 17,
            position: 'relative',
          }}
          value={data.email}
          onChangeText={text => setData({...data, email: text})}
        />
      </View>
      <Pressable
        onPress={handleSave}
        style={{
          backgroundColor: '#3A3B3C',
          paddingVertical: 20,
          paddingHorizontal: 25,
          alignItems: 'center',
          borderRadius: 10,
          marginTop: 30,
          flexDirection: 'row',
        }}
        disabled={loading || changingPfp}>
        <Text style={{color: '#E4E6EB'}}>Save Changes</Text>
        {loading && (
          <ActivityIndicator
            style={{marginLeft: 10}}
            color="#E4E6EB"
            size={25}
          />
        )}
      </Pressable>
    </View>
  );
};

export default EditProfile;
