import {useEffect, useState, useContext} from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Ionicons';

import {ScrollView} from 'react-native-gesture-handler';
import {addNewPost} from '../posts/addNewPost';

import AppContext from '../contexts/AppContext';

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

const NewPost = ({navigation}: {navigation: any}) => {
  const [images, setImages] = useState<PhotoIdentifier[]>([]);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    description: '',
    imageURI: '',
  });
  const [loading, setLoading] = useState(false);

  const ctx = useContext(AppContext);

  if (!ctx) return null;

  const {user} = ctx;

  if (Platform.OS === 'android' && !hasAndroidPermission()) {
    return <Text>Storage permission not granted</Text>;
  }

  const handleSelectFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        if (response.assets) {
          setSelected(response.assets[0].uri);
        }
      },
    );
  };

  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        if (response.assets) {
          setSelected(response.assets[0].uri);
        }
      },
    );
  };

  const handleSubmit = async () => {
    if (loading) return;
    if (step === 0) {
      if (!selected) return;
      setFormData(prev => ({
        ...prev,
        imageURI: selected,
      }));
      setStep(1);
    } else if (step === 1) {
      setLoading(true);
      const resp = await addNewPost(user, formData);
      setLoading(false);

      if (resp === 201) {
        navigation.navigate('Profile', {user});
      }
    }
  };

  const handleBack = () => {
    if (!loading) setStep(0);
  };

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 50,
      mimeTypes: ['image/jpeg', 'image/png', 'video/mp4'],
    }).then(r => {
      if (r.edges) setImages(r.edges);
      setSelected(r?.edges[0]?.node?.image?.uri);
    });
  }, []);

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll={true}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: '#181818',
      }}>
      <View
        style={{
          backgroundColor: '#181818',
        }}>
        {images.length > 0 ? (
          <View style={{backgroundColor: '#181818'}}>
            <Image
              source={{uri: selected || images[0].node.image.uri}}
              style={{resizeMode: 'contain', aspectRatio: 1 / 1}}
            />
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#212121',
              aspectRatio: 1,
            }}>
            <Text
              style={{
                color: '#E4E6EB',
                fontSize: 15,
                fontStyle: 'italic',
              }}>
              Choose a photo to post
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
            borderTopColor: '#212121',
            borderTopWidth: 1,
            borderBottomColor: '#212121',
            borderBottomWidth: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {step === 0 ? (
              <>
                <Pressable
                  style={{
                    backgroundColor: '#212121',
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}
                  onPress={handleSelectFromGallery}>
                  <Icon name="albums-outline" color="#E4E6EB" size={20} />
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: '#212121',
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={handleTakePhoto}>
                  <Icon name="aperture" color="#E4E6EB" size={20} />
                </Pressable>
              </>
            ) : (
              <Pressable
                style={{
                  backgroundColor: '#212121',
                  padding: 10,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={handleBack}>
                <Icon name="chevron-back-sharp" color="#E4E6EB" size={20} />
                <Text
                  style={{
                    color: '#E4E6EB',
                    fontSize: 15,
                  }}>
                  Back
                </Text>
              </Pressable>
            )}
          </View>
          <Pressable
            style={{
              backgroundColor: '#212121',
              padding: 10,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={handleSubmit}>
            <Text
              style={{
                color: '#E4E6EB',
                fontSize: 15,
              }}>
              {step === 0 ? 'Next' : loading ? 'Posting...' : 'Post'}
            </Text>
            {loading ? (
              <ActivityIndicator
                style={{marginLeft: 10}}
                color="#E4E6EB"
                size="small"
              />
            ) : (
              <Icon name="chevron-forward-sharp" color="#E4E6EB" size={20} />
            )}
          </Pressable>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {step === 0 ? (
          images.length > 0 ? (
            images.map((image, index) => (
              <Pressable
                key={index}
                onPress={() => setSelected(image.node.image.uri)}>
                <Image
                  source={{uri: image.node.image.uri}}
                  style={{width: 96, height: 96}}
                />
              </Pressable>
            ))
          ) : (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
              }}>
              <Text
                style={{
                  color: '#E4E6EB',
                  fontSize: 15,
                  fontStyle: 'italic',
                }}>
                {`${'No photos found :('}`}
              </Text>
            </View>
          )
        ) : (
          <View
            style={{
              width: '100%',
              padding: 15,
            }}>
            <Text
              style={{
                color: '#E4E6EB',
                fontSize: 15,
                marginLeft: 10,
              }}>
              Describe your photo (optional)
            </Text>
            <TextInput
              style={{
                backgroundColor: '#212121',
                color: '#E4E6EB',
                padding: 10,
                borderRadius: 10,
                margin: 10,
                width: '90%',
              }}
              value={formData.description}
              onChangeText={text =>
                setFormData(prev => ({...prev, description: text}))
              }
            />
            <Text
              style={{
                color: '#E4E6EB',
                fontSize: 15,
                marginLeft: 10,
              }}>
              {formData.description.length}/100
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default NewPost;
